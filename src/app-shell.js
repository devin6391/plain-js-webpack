/**
 * This is app shell which will contain the most basic logic of this app and it will be lazyloaded
 */
var readyEvent = null;
if(typeof CustomEvent !== "undefined") {
  var readyEvent = new CustomEvent("appReady", {
    msg: "plain js webpack app ready"
  })
}

if(typeof document != "undefined") {
  setTimeout(() => document.dispatchEvent(readyEvent), 0);
}
