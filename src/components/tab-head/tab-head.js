let tabBody = document.querySelector('.tab-body');

let onClickFn = function(context) {
  return new Promise((res, rej) => {
    let elem = document.querySelector(`#${context.id}`);
    tabBody.appendChild(elem);
  });
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
