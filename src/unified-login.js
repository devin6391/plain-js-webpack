import './common/styles/common.css';
import {otpMsg} from "./otp/otp.js";
import {pwdMsg} from "./password/password.js";
import {signinMsg} from "./signin/signin.js";
import {signupMsg} from "./signup/signup.js";

if(process.env.NODE_ENV == 'development') {
  require("./m-only-sp/m-only-dev-mock.js").bindContext(window);
}

console.log(signupMsg, signinMsg, otpMsg, pwdMsg);
