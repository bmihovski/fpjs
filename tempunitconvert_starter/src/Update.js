import * as R from 'ramda';

const MSGS = {
		LEFT_INPUT: 'LEFT_INPUT',
		RIGHT_INPUT: 'RIGHT_INPUT',
		LEFT_UNIT: 'LEFT_UNIT',
		RIGHT_UNIT: 'RIGHT_UNIT'
};

export function updateLeftValueMsg(leftValue) {
	return {
		type: MSGS.LEFT_INPUT,
		leftValue
	};
};

export function updateRightValueMsg(rightValue) {
	return {
		type: MSGS.RIGHT_INPUT,
		rightValue
	};
};

export function updateLeftUnitMsg(leftUnit) {
	return {
		type: MSGS.LEFT_UNIT,
		leftUnit
	};
};

export function updateRightUnitMsg(rightUnit) {
	return {
		type: MSGS.RIGHT_UNIT,
		rightUnit
	};
};

const toInt = R.pipe(parseInt, R.defaultTo(0));

function update (msg, model) {
	switch (msg.type) {
	case MSGS.LEFT_INPUT:
		const { leftValue } = msg;
		if (leftValue === '') {
			return { ...model, leftValue: '', rightValue: '', sourceLeft: true};
		} else {
			return { ...model, leftValue: toInt(leftValue), sourceLeft: true};
		};
		break;
	case MSGS.RIGHT_INPUT:
		const { rightValue } = msg;
		if (rightValue === '') {
			return { ...model, rightValue: '', leftValue: '', sourceLeft: false};
		} else {
			return { ...model, rightValue: toInt(rightValue), sourceLeft: false};
		}
		break;
	case MSGS.LEFT_UNIT:
		const { leftUnit } = msg;
		return { ...model, leftUnit };
		break;
	case MSGS.RIGHT_UNIT:
		const { rightUnit } = msg;
		return { ...model, rightUnit };
		break;
	default:
		return model;
		break;
	};
};

export default update;
