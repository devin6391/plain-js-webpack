module.exports = () => {
  let parentElem = null;
  let loaderElem = null;
  window.showLoader = function(containerClass) {
    if(typeof document !== "undefined") {
      loaderElem = document.querySelector('.loader-container');
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
