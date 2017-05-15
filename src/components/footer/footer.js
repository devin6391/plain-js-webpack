// require("materialize-css/js/modal.js");
import { urls, fetchReq } from "../../common/scripts/http/http-service"

let footerPopup;

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

window.footerClick = function(e, li) {
  if(typeof document !== "undefined") {
    footerPopup = document.querySelector('.footer-popup');
  }
  // footerPopup.classList.remove('hidden');
  fetchReq(li.dataset.url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fillFooterPopup(parseHttpData(data, li.dataset.url));
      $('#ajax-modal').modal('open');
    })
}

window.closeFooterPopup = function() {
  footerPopup.classList.add('hidden');
  cleanFooterPopup();
}

let cleanFooterPopup = function() {
  footerPopup.querySelector('h3').innerText = "";
  footerPopup.querySelector('.content').innerHTML = "";
}

let fillFooterPopup = function(data) {
  footerPopup.querySelector('h4').innerText = data.heading;
  footerPopup.querySelector('p').innerText = data.node.innerText;
}

let parseHttpData = function(data, forUrl) {
  var containerNode = document.createElement('div');
  switch (forUrl) {
    case urls.authInfo:
      containerNode.classList.add('author');
      return parseAuthorInfo(data, containerNode);
      break;

    case urls.technologies:
      containerNode.classList.add('tech');
      return parseTech(data, containerNode);
      break;

    case urls.restrictions:
      containerNode.classList.add('restrict');
      return parseRestrictions(data, containerNode);
      break;

    case urls.extLinks:
      containerNode.classList.add('ext-links');
      return parseExtlinks(data, containerNode);
      break;

    default:
      containerNode.classList.add('error');
      return {
        heading: "Error",
        node: containerNode
      }
  }
}

let parseAuthorInfo = function(data, containerNode) {
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

let parseTech = function(data, containerNode) {
  let htmlTable = document.createElement('table');
  let html = `<tr><td>Sr. No.</td><td>Technology</td></tr>`;
  data.forEach((techObj) => {
    html += `<tr class='tech-row'>
        <td>${techObj.id}</td>
        <td>${techObj.name}</td>
      </tr>`;
  });
  htmlTable.innerHTML = html;
  containerNode.appendChild(htmlTable);
  return {
    heading: "Technologies used",
    node: containerNode
  }
}

let parseRestrictions = function(data, containerNode) {
  let htmlTable = document.createElement('table');
  let html = `<tr><td>Sr. No.</td><td>Restriction</td></tr>`;
  data.forEach((restrictionObj) => {
    html += `<tr class='tech-row'>
        <td>${restrictionObj.id}</td>
        <td>${restrictionObj.text}</td>
      </tr>`;
  });
  htmlTable.innerHTML = html;
  containerNode.appendChild(htmlTable);
  return {
    heading: "Restrictions",
    node: containerNode
  }
}

let parseExtlinks = function(data, containerNode) {
  let htmlTable = document.createElement('table');
  let html = `<tr><td>Sr. No.</td><td>Restriction</td></tr>`;
  data.forEach((extlinkObj) => {
    html += `<tr class='tech-row'>
        <td>${extlinkObj.id}</td>
        <td><a href="${extlinkObj.link}" target="_blank">${extlinkObj.text}</a></td>
      </tr>`;
  });
  htmlTable.innerHTML = html;
  containerNode.appendChild(htmlTable);
  return {
    heading: "External Links",
    node: containerNode
  }
}
