import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { billInputMsg, tipPercentageMsg } from './Update';

const {
  div,
  h1,
  label,
  input
} = hh(h);


function calculateTotalTip(sum, perc) {
	const bill = parseFloat(sum);
	const tip = bill * parseFloat(perc) / 100 || 0;
	return [ bill + tip, tip ];
}

function inputSet(inputTitle, value, oninput) {
	return div({ className: 'w-40' }, [
			label({ className: 'db fw6 lh-copy f5' }, inputTitle),
			input({ 
				className: 'border-box pa2 ba mb2 tr w-100', 
				type: 'text',
				value,
				oninput
				})
		]);
}

const round = places => 
	R.pipe(
			num => num * Math.pow(10, places),
			Math.round,
			num => num * Math.pow(10, -1 * places)
			);
	
	
const formatMoney = R.curry(
		(symbol, places, number) => {
			return R.pipe(
				R.defaultTo(0),
				round(places),
				num => num.toFixed(places),
				R.concat(symbol)
				)(number);
}
)
		

function outputSet(tip, total) {
	return div({ className: 'w-40 b bt mt2 pt2' }, [
		calculatedAmount('Tip:', tip),
		calculatedAmount('Total', total)
	]);
}

function calculatedAmount(description, amount) {
	return div({ className: 'flex w-100' }, [
		div({ className: 'w-50 pv1 pr2 '}, description),
		div({ className: 'w-50 tr pv1 pr2' }, amount)
	]);
}

function view(dispatch, model) {
	const { billAmount, tipPercentage } = model;
	const [ totalBill, tip ] = calculateTotalTip(billAmount, tipPercentage);
	const toMoney = formatMoney('$', 2);
	
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', billAmount, 
    		e => dispatch(billInputMsg(e.target.value))
    		),
    inputSet('Tip %', tipPercentage,
    		e => dispatch(tipPercentageMsg(e.target.value))
    		),
    outputSet(toMoney(tip), toMoney(totalBill))
  ]);
}

export default view;
