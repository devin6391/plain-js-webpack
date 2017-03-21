/**
 * This is app shell which will contain the most basic logic of this app and it will be lazyloaded
 */
 import { appHeader } from "./components/header/header.js";
 import "./components/header/header.scss";
 let headerHtml = require('ejs-loader!./components/header/header.html')(appHeader);

import { footerData } from "./components/footer/footer.js";
import "./components/footer/footer.scss";
let footerHtml = require('ejs-loader!./components/footer/footer.html')(footerData);

import { tabsObject } from "./components/tab-body/tab-body.js";
import "./components/tab-body/tab-body.scss";
let tabBodyHtml = require('ejs-loader!./components/tab-body/tab-body.html')({tabsObject});

let headerElem = null;
let footerElem = null;
let mainBody = null;
let readyEvent = null;

if(typeof CustomEvent !== "undefined") {
  readyEvent = new CustomEvent("appReady", {
    msg: "plain js webpack app ready"
  })
}

if(typeof document != "undefined") {
  headerElem = document.querySelector('.header');
  footerElem = document.querySelector('.footer');
  mainBody = document.querySelector('.main-body');
  populateHtml()
    .then(() => {
      setTimeout(() => document.dispatchEvent(readyEvent), 0);
    })
}

function populateHtml() {
  return new Promise((res, rej) => {
    footerElem.innerHTML = footerHtml;
    headerElem.innerHTML = headerHtml;
    var tabBodyDom = document.createElement('div');
    tabBodyDom.innerHTML = tabBodyHtml;
    mainBody.appendChild(tabBodyDom.querySelector('.tab-body'));
    res(true);
  });
}
