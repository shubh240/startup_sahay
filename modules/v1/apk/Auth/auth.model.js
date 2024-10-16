const { SELECT_Q, INSERT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse, translateMsg } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const moment = require('moment');
const con = require('../../../../config/database');
const common = require('../../../../utils/common');
//////////////////////////////////////////////////////////////////////
//                            Auth API                              //
//////////////////////////////////////////////////////////////////////

let Auth = {

    updateUser: async (setData, submitData, user_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_user SET ${setData} WHERE id = '${user_id}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    signUp: async (req, res) => {
        try {
            let { body } = req;

            let password = CryptoJS.AES.encrypt(JSON.stringify(body?.password), SECRET, { iv: IV }).toString()

            let sql = `INSERT INTO tbl_user (user_name,email, mobile_number, password) VALUES ($1, $2, $3,$4) RETURNING id`;

            let values = [body?.username, body?.email, body?.mobile_number, password];

            let user_id = await INSERT_Q(sql,values);

            let result = await SELECT_Q(`select u.id as user_id ,u.mobile_number ,u.user_name,u.email
             from tbl_user u 
            where u.id = ${user_id} and u.is_deleted = false`, false)

            return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_signup_success", components: {} }, result[0]);

        } catch (e) {
            console.log(e?.message);
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_signup_failed", components: {} }, e?.message);
        }
    },

    signIn: async (req, res) => {
        try {
            let { body } = req;

            body.password = CryptoJS.AES.encrypt(JSON.stringify(body?.password), SECRET, { iv: IV }).toString()
            let sql;
            let values;
            let keyword;
            if (body?.email) {
                sql = `SELECT * FROM tbl_user WHERE email = $1 AND password = $2`;
                values = [body?.email, body.password];
                keyword = "rest_keywords_user_invalid_credantioal"
            }
            else {
                sql = `SELECT * FROM tbl_user WHERE mobile_number = $1 AND password = $2`;
                values = [body.mobile_number, body?.password];
                keyword = "rest_keywords_user_invalid_credantioal_mobile"
            }

            let { rows } = await con.query(sql, values);
            if (rows[0]) {

                let user_id = rows[0]?.id;

                let token = await jwt_sign(user_id);
                let params = {
                    token: token,
                    device_token: body?.device_token || null,
                    device_name: body?.device_name || '',
                    os_version: body?.os_version || '',
                    app_version: body?.app_version || ''
                }

                await checkUpdateDeviceInfo(user_id, params);

                let result = await SELECT_Q(`SELECT u.id AS user_id, u.mobile_number,u.user_name, u.email, ud.token FROM tbl_user u 
                    JOIN tbl_user_device ud ON ud.user_id = u.id
                    WHERE u.id = ${user_id} AND u.is_deleted = false`, false);

                return sendResponse(req, res, 200, 1, { keyword: "rest_keywords_user_login_success", components: {} }, result[0]);

            } else {
                return sendResponse(req, res, 200, 0, { keyword: keyword, components: {} });
            }

        } catch (error) {
            console.log('error?.message :', error?.message);
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_login_failed", components: {} }, error?.message);
        }
    },

    logout: async (req, res) => {
        try {
            let user_id = req.loginUser;
            await con.query(`update tbl_user_device set token='' where user_id='${user_id}'`);
            return sendResponse(req, res, 200, '1', { keyword: "logout_success", components: {} });

        } catch (e) {
            console.log(e.message)
            return sendResponse(req, res, 200, '0', { keyword: "logout_failed", components: {} }, e?.message);
        }
    }
}


module.exports = {
    Auth
};