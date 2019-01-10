import * as R from 'ramda';

const MSG = {
		BILL_INPUT: 'BILL_INPUT',
		TIP_INPUT: 'TIP_INPUT'
};

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

function update (msg, model) {
	switch (msg.type) {
	case MSG.BILL_INPUT: {
		const { billAmount } = msg;
		return { ...model,  billAmount };
		};
		break;
	case MSG.TIP_INPUT: {
		const { tipPercentage } = msg;
		return { ...model, tipPercentage };
	};
		break;
	default:
		return model;
		break;
	};
};

export default update;
