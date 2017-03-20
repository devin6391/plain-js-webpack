module.exports = () => {
  let parentElem = null;
  let loaderElem = null;
  window.showLoader = function(containerClass) {
    console.log("inside showloader fn");
    if(typeof document !== "undefined") {
      console.log(`trying to show loader for container: ${containerClass}`);
      loaderElem = document.querySelector('.ui-loader');
      parentElem = document.querySelector(containerClass);
      parentElem.classList.add('hide-children');
      loaderElem.classList.remove('hidden');
    }
  }

  window.hideLoader = function() {
    parentElem.classList.remove('hide-children');
    loaderElem.classList.add('hidden');
  }
}
