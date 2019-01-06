import * as R from 'ramda';

const MSG = {
		BILL_INPUT: 'BILL_INPUT',
		TIP_INPUT: 'TIP_INPUT'
};

function convertToFloat(value) {
	const intValue = R.pipe(parseFloat,
			R.defaultTo(''))(value);
	return intValue;
}

export function billInputMsg(billAmount) {
	return {
		type: MSG.BILL_INPUT,
		billAmount
	};
};

export function tipPercentageMsg(tipPercentage) {
	return {
		type: MSG.TIP_INPUT,
		tipPercentage
	};
};

function calcTip(bill, tip) {
	return (bill * tip) / 100;
	
}

function calcTotal(bill, tip) {
	return bill + tip;
}

function update (msg, model) {
	switch (msg.type) {
	case MSG.BILL_INPUT: {
		const billAmount = convertToFloat(msg.billAmount);
		if (model.tipPercentage !== '' ){
			const tipAmount = calcTip(billAmount, model.tipPercentage);
			const totalAmount = calcTotal(msg.billAmount, tipAmount);
			return { ...model,  billAmount, tipAmount, totalAmount };
		} else {
			return { ...model,  billAmount };
		};

	};
		break;
	case MSG.TIP_INPUT: {
		const tipPercentage = convertToFloat(msg.tipPercentage);
		if ( model.billAmount !== '' ){
			const tipAmount = calcTip(model.billAmount, tipPercentage);
			const totalAmount = calcTotal(model.billAmount, tipAmount);
			return { ...model, tipPercentage, tipAmount, totalAmount };
		} else {
			return { ...model, tipPercentage };
		};
	};
		break;
	default:
		return model;
		break;
	};
};

export default update;
