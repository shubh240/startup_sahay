const { decryption, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const startUpModel = require('./startup.model');
const startup_rules = require('./rules/auth.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Auth                                //
//////////////////////////////////////////////////////////////////////

router.post("/add-startup", checkApiKey, decryption, checkBodyInline(startup_rules["signup"]), startUpModel?.Social?.addStartUp);

router.post("/startup-details", checkApiKey, decryption, startUpModel?.Social?.startupListing);

router.post("/edit-startup-details/:id", checkApiKey, checkToken, decryption, startUpModel?.Social?.editStartUp);

router.post("/delete-startup-details", checkApiKey, checkToken, decryption, startUpModel?.Social?.deleteStartUp);

module.exports = router;