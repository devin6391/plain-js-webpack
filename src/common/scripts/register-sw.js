module.exports = () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/vanilla-sw-precache.js');
  }
}
