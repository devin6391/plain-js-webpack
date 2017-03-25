import { urls, fetchReq } from "../../common/scripts/http/http-service"

export const footerData = {
  listItems: [
    {
      text: "Author Info",
      url: urls.authInfo
    },
    {
      text: "Technologies Used",
      url: urls.technologies
    },
    {
      text: "Restrictions",
      url: urls.restrictions
    },
    {
      text: "Links",
      url: urls.extLinks
    }
  ],
  appDesc: "This is an app with no copyright so copy as many times you want for free"
}
let footerPopup;
window.footerClick = function(e, li) {
  if(typeof document !== "undefined") {
    footerPopup = document.querySelector('.footer-popup');
  }
  footerPopup.classList.remove('hidden');
  fetchReq(li.dataset.url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fillFooterPopup(parseFooter(data));
    })
}

window.closeFooterPopup = function() {
  footerPopup.classList.add('hidden');
  cleanFooterPopup();
}

let cleanFooterPopup = function() {
  if(typeof document !== "undefined") {
    footerPopup = document.querySelector('.footer-popup');
  }
  footerPopup.querySelector('h3').innerText = "";
  footerPopup.querySelector('.content').innerHTML = "";
}

let fillFooterPopup = function(data) {
  footerPopup.querySelector('h3').innerText = data.heading;
  footerPopup.querySelector('.content').appendChild(data.node);
}

let parseFooter = function(data) {
  var containerNode = document.createElement('div');
  containerNode.classList.add('author');
  let html = `<div class='author-name'>
      <span>${data.name}</span>
    </div>
    <div class='author-expertise'>
      <span>expert in ${data.expertise}</span>
    </div>
    <div class='author-experience'>
      <span>${data.experience} of Experience</span>
    </div>`;
  containerNode.innerHTML = html;
  return {
    heading: "Author Description",
    node: containerNode
  }
}
