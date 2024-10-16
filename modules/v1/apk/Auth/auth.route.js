const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const authModel = require('./auth.model');
const auth_rules = require('./rules/auth.rules.json');
const { CheckMobile, CheckEmail } = require('../../../../utils/uniqueMiddleware');

//////////////////////////////////////////////////////////////////////
//                              Auth                                //
//////////////////////////////////////////////////////////////////////

router.post("/user/signup", checkApiKey, decryption, checkBodyInline(auth_rules["signup"]),CheckMobile,CheckEmail, authModel?.Auth?.signUp);

router.post("/user/signin", checkApiKey, decryption, checkBodyInline(auth_rules["signin"]), authModel?.Auth?.signIn);

router.post("/user/logout", checkApiKey, checkToken, decryption, authModel?.Auth?.logout);



module.exports = router;