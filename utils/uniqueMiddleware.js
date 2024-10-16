const con = require('../config/database');
const { sendResponse } = require('../middleware/headerValidator');
const { SELECT_Q } = require('./SQLWorker');

const uniqueCheck = {

    CheckMobile: async (req, res, next) => {
        let { body } = req;
        try {
            let mobileCheck = await SELECT_Q(`Select mobile_number from tbl_user where is_deleted=false and mobile_number='${body?.mobile_number}' `,false);
          
            if (mobileCheck.length > 0) {
                sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: (body?.mobile_number) } });
            }
            else{
                next();
            }
        } catch (error) {
            console.log(error.message);
                sendResponse(req, res, 500, '0', { keyword: 'internal_server_error' });
        }
    },

    CheckEmail: async (req, res, next) => {
        let { body } = req;
        try {
            let emailCheck = await SELECT_Q(`Select email from tbl_user where is_deleted=false and email='${body?.email}'`,false);
            if (emailCheck.length > 0) {
                sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: (body?.email) } });
            } else {
                next();
            }
        } catch (error) {
                sendResponse(req, res, 500, '0', { keyword: 'internal_server_error' });
        }
    },

}

module.exports = uniqueCheck;