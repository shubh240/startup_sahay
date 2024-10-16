export const AWS_BASE_URL = process.env.REACT_APP_AWS_BASE_URL;

export const API_KEY = `3bpIGqffI/bQtRoCKOVKYg==`

export const BASE_URL = `http://localhost:7890/api/v1`

export const ALPHABETS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

export const APP_NAME = 'Home';

export const STATUS_CLASS = {
  pending: "warning",
  ongoing: "primary",
  room_started: "primary",
  winnings_calculating: "info",
  auto_cancel: "danger",
  auto_rejected: "danger",
  cancel: "danger",
  completed: "success",
  approved: "success",
  rejected: "danger",
  stop: "danger",
  Escalate: "danger",
  escalate: "danger",
  delivered: "success",
  dispatch: "info",
  resolved: "success",
  success: "success",
  failed: "failed",
  verified: "success",
  verify: "primary",
  request: "warning",
  accept: "success",
  blocked: "danger",
  accepted: "success",
};

// MODAL TYPES
export const SIGN_UP_MODAL = "SIGN_UP_MODAL";
export const SIGN_IN_MODAL = "SIGN_IN_MODAL";
export const OTP_VERIFICATION_MODAL = "OTP_VERIFICATION_MODAL";
export const COMPLETE_PROFILE_MODAL = "COMPLETE_PROFILE_MODAL";
export const SUCCESS_MODAL = "SUCCESS_MODAL";
export const FORGOT_PASS_MODAL = "FORGOT_PASS_MODAL";
export const FORGOT_OTP_MODAL = "FORGOT_OTP_MODAL";
export const RESET_PASSWORD_MODAL = "RESET_PASSWORD_MODAL";
export const EDIT_PROFILE_MODAL = "EDIT_PROFILE_MODAL";
export const CHANGE_PASS_MODAL = "CHANGE_PASS_MODAL";
export const EDIT_PROFILE_BY_OTP_MODAL = "EDIT_PROFILE_BY_OTP_MODAL";
export const PROPERTIES_ATTRIBUTE_MODAL = "PROPERTIES_ATTRIBUTE_MODAL";
export const PROPERTIES_AMENITES_MODAL = "PROPERTIES_AMENITES_MODAL";
export const AGENT_MODAL = "AGENT_MODAL";
export const LENDER_MODAL = "LENDER_MODAL";
export const Resources_Modal = "Resources_Modal";
export const SUB_MODAL = "SUB_MODAL";
export const LENDER_SUB_MODAL = "LENDER_SUB_MODAL";

// HTTPS requests
export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const PATCH = "patch";
export const DELETE = "delete";
export const OPTION = "options";

//constants
export const USER = "user";
export const Property = "property";
export const ADMIN = "admin";
export const COMMON = "common";
export const ADVERTISE = "advertisement";
export const DATE_FORMAT = "YYYY-MM-DD";
export const ABBREVIATED_DATE_FORMAT = "D MMM";
export const ABBREVIATED_FULL_DATE_FORMAT = "D MMM YYYY";
export const DATE_TIME_FORMAT = "DD MMM YYYY, hh:mm A";
export const DATE_TIME_MONTHE_WISE_FORMAT = "MMM DD YYYY, hh:mm A";
export const DATE_DASH_TIME_FORMAT = "DD-MM-YYYY h:mm A";
export const DATE_YEAR_WISE_DASH_TIME_FORMAT = "YYYY-MM-DD h:mm A";
export const DATE_LOCAL_DASH_TIME_FORMAT = "YYYY-MM-DDTHH:mm";
export const DATE_DOT_TIME_FORMAT = "DD.MM.YYYY H:mm";
export const DATE_SLASH_FORMAT = "DD/MM/YYYY";
export const TIME_FORMAT = "hh:mm A";
export const TIME_FORMAT_24 = "HH:mm";
export const SEARCH_DELAY = 1000;
// export const ITEM_PER_PAGE = 12;
export const COUNT_PER_PAGE = 12;
// export const FCFA_CURRENCY = `&#x20A3;`
export const FCFA_CURRENCY = `XAF`


