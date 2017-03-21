let tabBody = document.querySelector('.tab-body');

function hideTabs() {
  let tabs = document.querySelectorAll('.single-tab');
  tabs.forEach((tabDom) => {
    tabDom.classList.add('hidden');
  });
}

window.tabClick = function(e, tabId) {
  e.preventDefault();
  hideTabs();
  let elem = document.querySelector(`#${tabId}`);
  elem.classList.remove('hidden');
}

export let tabsObject = [
  {
    text: "Tab 1",
    id: 'tab-1',
    onClick: (e) => {
      e.preventDefault();
      return onClickFn(this);
    }
  },
  {
    text: "Tab 2",
    id: 'tab-2',
    onClick: (e) => {
      e.preventDefault();
      return onClickFn(this);
    }
  },
  {
    text: "Tab 3",
    id: 'tab-3',
    onClick: (e) => {
      e.preventDefault();
      return onClickFn(this);
    }
  }
]
