import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element'

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

export default app;
