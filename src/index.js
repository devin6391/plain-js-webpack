module.exports = () => {
  console.log('running main js file');
  if(typeof window.showLoader !== "undefined")
    window.showLoader('.main-body');

  if(typeof window.hideLoader !== "undefined" && typeof document !== "undefined") {
    document.addEventListener("appReady", (e) => {
      console.log(e.msg);
      window.hideLoader();
    });
  }
}
