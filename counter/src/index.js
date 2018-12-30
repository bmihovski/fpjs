import h from 'hyperscript';
import hh from 'hyperscript-helpers';

const { div, button } = hh(h);

const initModel = 0;

function view(dispatch, model) {
  return div([
    div({ className: 'mv2' }, `Count ${model}`),
    button({ className: 'pv1 ph2 mr2',
      onclick: () => dispatch('plus') }, '+'),
    button({ className: 'pv1 ph2',
      onclick: () => dispatch('minus') }, '-'),
  ]);
};

function update(msg, model) {
  switch (msg) {
    case 'plus':
      return model + 1;
      //break;
    case 'minus':
      return model - 1;
      //break;
    default:
      return model;
  };
};

// impure code
function app(model, view, update, node) {
  let currentState = model;
  let currentView = view(dispatch, currentState);
  node.appendChild(currentView);
  function dispatch(msg) {
    currentState = update(msg, currentState);
    const updatedView = view(dispatch, currentState);
    node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
};

const node = document.getElementById('app');

app(initModel, view, update, node);
