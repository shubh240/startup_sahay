const { SELECT_Q } = require('../utils/SQLWorker');
const { ENCRYPTION_BYPASS } = require('../config/constants.js');
const en = require('../languages/en.js');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.IV);
const { default: localizify } = require('localizify');
const { t } = require('localizify');
const jwt = require('jsonwebtoken');

const checkApiKey = function (req, res, next) {
    if (req.headers['api-key']) {
        let apiKey = CryptoJS.AES.decrypt(req.headers['api-key'], SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8)
        apiKey = apiKey.replace(/"/g, '');
        if (apiKey && apiKey == process.env.API_KEY) {
            next();
        } else {
            sendResponse(req, res, 401, '-1', { keyword: 'invalid_api_key', components: {} });
        }
    } else {
        sendResponse(req, res, 401, '-1', { keyword: 'invalid_api_key', components: {} });
    }

}

const checkToken = async function (req, res, next) {
    let encrypt_token = encryption(req.headers['token']);
    try {
        req.loginUser = {};
        let token = ''
        
        token = CryptoJS.AES.decrypt(encrypt_token, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8)
        token = token.replace(/^"|"$/g, '');

        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.loginUser = data.user_id;

        const authorizedUSer = await SELECT_Q(`select * from tbl_user_device where token = '${token}' `, false);
        
        if (authorizedUSer.length > 0) {
            next();
        }
        else {
            sendResponse(req, res, 401, '-1', { keyword: "unauthorized_user", components: {} }, {});
        }

    } catch (e) {
        sendResponse(req, res, 401, '-1', { keyword: 'token_invalid', components: {} }, {});
    }
}

// Function to check validation rules for all api's 
const checkBodyInline = (rules, messages = {}, keywords = {}) => {
    return (req, res, next) => {
        let v = require('Validator').make(req.body, rules, messages, keywords);
        if (v.fails()) {
            let Validator_errors = v.getErrors();

            for (let key in Validator_errors) {
                error = Validator_errors[key][0];
                break;
            }

            res.status(200);
            res.json(encryption({ code: '0', message: error }, req));
        } else {
            next();
        }
    };
};

const checkValidationRules = function (req, res, rules) {
    let v = require('Validator').make(req.body, rules, {}, {});
    if (v.fails()) {
        let Validator_errors = v.getErrors();

        for (let key in Validator_errors) {
            error = Validator_errors[key][0];
            break;
        }

        res.status(200);
        res.json(encryption({ code: '0', message: error }, req));
        return false;
    } else {
        return true;
    }
}

// Function to return response for any api
const sendResponse = function (req, res, statuscode, responsecode, { keyword, components }, responsedata) {
    const language = req.headers['accept-language'] || 'en';
    let formatmsg = getMessage(language, keyword, components);
    let encrypted_data = ''
    if (req?.headers['app'] == 'content') {
        encrypted_data = { code: responsecode, message: formatmsg, data: responsedata };
    } else {
        encrypted_data = encryption({ code: responsecode, message: formatmsg, data: responsedata }, req);
    }

    res.status(statuscode);
    res.send(encrypted_data);
}

const decryption = function (req, res, next) {
    if (!ENCRYPTION_BYPASS) {
        try {            
            if (req.body != undefined && Object.keys(req.body).length !== 0) {
                req.body = JSON.parse(CryptoJS.AES.decrypt(req.body, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8));
                next();
            } else {
                next();
            }
        } catch (error) {
            res.status(200);
            res.json({ code: 0, message: "badEncrypt" });
        }
    } else {
        next();
    }
}

// Function to encrypt the response body before sending response
const encryption = function (response_data) {
    if (!ENCRYPTION_BYPASS) {
        return CryptoJS.AES.encrypt(JSON.stringify(response_data), SECRET, { iv: IV }).toString();
    } else {
        return response_data;
    }
}

// Function to send users language from any place
const getMessage = function (requestLanguage, key, value) {
    // req.language = requestLanguage
    try {
        localizify
            .add('en', en)
            .setLocale(requestLanguage);

        let message = t(key, value);

        return message;
    } catch (e) {
        return "Something went wrong";
    }
}

const translateMsg = function (language, message) {
    
    localizify
    .add("en", en)
    .setLocale(language);
    
    return t(message.keyword, message.content)
}

module.exports = {
    checkApiKey,
    checkToken,
    sendResponse,
    checkValidationRules,
    decryption,
    encryption,
    checkBodyInline,
    translateMsg
};
