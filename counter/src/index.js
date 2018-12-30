import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element'

const { div, button } = hh(h);

const initModel = 0;

function view(dispatch, model) {
  return div([
    div({ className: 'mv2' }, `Count ${model}`),
    button({ className: 'pv1 ph2 mr2',
      onclick: () => dispatch(MSGS.ADD) }, '+'),
    button({ className: 'pv1 ph2',
      onclick: () => dispatch(MSGS.SUBTRACT) }, '-'),
  ]);
};

const MSGS = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
};

function update(msg, model) {
  switch (msg) {
    case MGGS.ADD:
      return model + 1;
      break;
    case MSGS.SUBTRACT:
      return model - 1;
      break;
    default:
      return model;
  };
};

// impure code
function app(model, view, update, node) {
  let currentState = model;
  let currentView = view(dispatch, currentState);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    currentState = update(msg, currentState);
    const updatedView = view(dispatch, currentState);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
};

const node = document.getElementById('app');

app(initModel, view, update, node);
