import {ApiBase} from "./config.js";
const BasePath = ApiBase[process.env.NODE_ENV].api;

function formQueryParam(obj) {
  if(obj) {
    return "?" + encodeURIComponent(JSON.stringify(obj));
  } else {
    return "";
  }
}

var formatToJson = function(string) {
  return JSON.parse(string)
}

export var httpGet = function(url, queryObject, formatResponse) {
  if(!queryObject || typeof queryObject != "string") {
    queryObject = formQueryParam(queryObject)
  }
  if(!formatResponse) {
    formatResponse = formatToJson;
  }
  var promise = new Promise((resolve, reject) => {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', `${BasePath}some.file${queryObject}` , true);
    httpRequest.onreadystatechange = () = {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolve(formatResponse(httpRequest.responseText));
        } else {
          reject('There was a problem with the request.');
        }
      }
    }
    httpRequest.send(null);
  });
  return promise;
}

export var httpPost = function(url, queryObject, postObj, formatResponse) {
  if(typeof queryObject != "string") {
    queryObject = formQueryParam(queryObject)
  }
  if(!formatResponse) {
    formatResponse = formatToJson;
  }
  var promise = new Promise((resolve, reject) => {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', `${BasePath}some.file${queryObject}` , true);
    httpRequest.onreadystatechange = () = {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolve(formatResponse(httpRequest.responseText));
        } else {
          reject('There was a problem with the request.');
        }
      }
    }
    httpRequest.send(postObj);
  });
  return promise;
}
