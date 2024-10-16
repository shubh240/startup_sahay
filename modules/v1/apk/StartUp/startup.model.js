const { SELECT_Q, INSERT_Q, UPDATE_Q } = require('../../../../utils/SQLWorker');
const { sendResponse, translateMsg } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const moment = require('moment');
const con = require('../../../../config/database');
const common = require('../../../../utils/common');
const { PER_PAGE_TEN } = require('../../../../config/constants');
//////////////////////////////////////////////////////////////////////
//                            Auth API                              //
//////////////////////////////////////////////////////////////////////

let Social = {

    addStartUp: async (req, res) => {
        try {
            const { body } = req;

            let sql = `INSERT INTO tbl_startup 
                (startup_name, startup_address, city, state, email_address, phone_number, founder_name, industry, sector, business_idea) 
                VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
                RETURNING id`;

            let values = [
                body?.startup_name,
                body?.startup_address,
                body?.city,
                body?.state,
                body?.email_address,
                body?.phone_number,
                body?.founder_name,
                body?.industry,
                body?.sector,
                body?.business_idea
            ];

            await INSERT_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_startup_success", components: {} });
        } catch (e) {
            return sendResponse(req, res, 500, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    startupListing: async (req, res) => {
        try {
            let { body } = req;
            let searching = ""

            if (body?.search !== undefined) {
                searching = ` and (startup_name ILIKE '%${body?.search}%' or startup_address ILIKE '%${body?.search}%' or city ILIKE '%${body?.search}%'
                or state ILIKE '%${body?.search}%' or email_address ILIKE '%${body?.search}%' or founder_name ILIKE '%${body?.search}%'
                or industry ILIKE '%${body?.search}%' or sector ILIKE '%${body?.search}%'
                )`;
            }

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TEN;
            let limit = ((body.page - 1) * PER_PAGE_TEN);

            let startUpDetails = await SELECT_Q(`select * ,${PER_PAGE_TEN} as per_page,
            (select count(*) from  tbl_startup where is_deleted = false) as startup_count   
            from tbl_startup where is_deleted=false ${searching} limit ${per_page} OFFSET ${limit} `, false);

            if (startUpDetails?.[0]) {
                startUpDetails = startUpDetails.map(startup => {
                    return {
                        ...startup,
                        created_at: new Date(startup.created_at).toLocaleDateString('en-GB'),
                        updated_at: new Date(startup.updated_at).toLocaleDateString('en-GB')
                    };
                });

                return sendResponse(req, res, 200, '1', { keyword: "startup_list_found", components: {} }, startUpDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            console.log('error.message :', error.message);
            return sendResponse(req, res, 200, '0', { keyword: "startup_list_failed", components: {} }, error.message);
        }
    },

    editStartUp: async (req, res) => {
        try {
            const { body } = req;
            let startup_id = req.params.id;

            let sql = `UPDATE tbl_startup SET startup_name = $1, startup_address = $2, city = $3, 
                state = $4, email_address = $5, phone_number = $6, founder_name = $7, industry = $8, 
                sector = $9, business_idea = $10 WHERE id = $11 RETURNING id`;

            let values = [
                body?.startup_name,
                body?.startup_address,
                body?.city,
                body?.state,
                body?.email_address,
                body?.phone_number,
                body?.founder_name,
                body?.industry,
                body?.sector,
                body?.business_idea,
                startup_id
            ];

            await UPDATE_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "edit_startup_success", components: {} });
        } catch (e) {
            return sendResponse(req, res, 500, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    deleteStartUp: async (req, res) => {
        try {
            let { body } = req;
            let startup_id = body?.id;

            let sql = `UPDATE tbl_startup SET is_deleted = true WHERE id = $1 RETURNING *`
            let values = [startup_id]
            await UPDATE_Q(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "delete_startup", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_delete_startup", components: {} }, e?.message);
        }
    },
}


module.exports = {
    Social
};