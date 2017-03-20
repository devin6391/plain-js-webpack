/**
 * This is app shell which will contain the most basic logic of this app and it will be lazyloaded
 */
import { footerData } from "./components/footer/footer.js";
import "./components/footer/footer.scss";
let footerHtml = require('ejs-loader!./components/footer/footer.html')(footerData);

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
    res(true);
  });
}
