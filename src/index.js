module.exports = () => {
  console.log('running main js file');
  if(typeof window.showLoader !== "undefined")
    window.showLoader('.main-body');
}
