import fetchFn from "fetch-ponyfill"
import { commonReqOptions } from "./common-req-opts"
import ApiBase from "./config.js";

const { fetch } = fetchFn();
const BasePath = ApiBase[process.env.NODE_ENV];

export const urls = {
  authInfo: `${BasePath}/authorInfo`,
  restrictions: `${BasePath}/restrictions`,
  technologies: `${BasePath}/technologies`,
  extLinks: `${BasePath}/extLinks`
}

export let fetchReq = (url, reqOptions, overwrite) => {
  let newReqOptions = reqOptions || {};
  let options = Object.assign({}, commonReqOptions, newReqOptions);
  if(overwrite) {
    options = newReqOptions;
  }
  console.log("sending req for url: ", url);
  return fetch(url, options);
}
