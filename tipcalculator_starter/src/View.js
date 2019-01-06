import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billInputMsg, tipPercentageMsg } from './Update';

const {
  div,
  h1,
  pre,
  label,
  input
} = hh(h);

function inputSet(inputTitle, inputValue, oninput) {
	return div([
			label({ className: 'db mb1' }, inputTitle),
			input({ 
				className: ' pa2 input-reset ba w-50 mb2', 
				type: 'text',
				value: inputValue,
				oninput
				})
		]);
};

function outputSet(outValue) {
	return div([
		h1({ className: 'f2 pv2 bb w-50' }, outValue),
	]);
};

function view(dispatch, model) {
	const { billAmount, tipPercentage, tipAmount, totalAmount } = model;
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', billAmount || '', 
    		e => dispatch(billInputMsg(e.target.value))),
    inputSet('Tip %', tipPercentage || '',
    		e => dispatch(tipPercentageMsg(e.target.value))),
    outputSet('Tip: $' + tipAmount || ''),
    outputSet('Total: $' + totalAmount || ''),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
