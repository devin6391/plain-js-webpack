import './assets/styles/common.css';
import './m-only-1/m-only-1.css';
import './m-only-sp/m-only-sp.css';
import {mOnly1} from "./m-only-1/m-only-1.js";
import {mOnly2} from "./m-only-2/m-only-2.js";
import {mOnlySp} from "./m-only-sp/m-only-sp.js";

if(process.env.NODE_ENV == 'development') {
  require("./m-only-sp/m-only-dev-mock.js").bindContext(window);
}

console.log("initiated m-only-login script", mOnly1, mOnly2, mOnlySp);
