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
			const updatedWithLeftValue = { ...model, leftValue: toInt(leftValue), sourceLeft: true};
			return convert(updatedWithLeftValue);
		};
		break;
	case MSGS.RIGHT_INPUT:
		const { rightValue } = msg;
		if (rightValue === '') {
			return { ...model, rightValue: '', leftValue: '', sourceLeft: false};
		} else {
			const updatedWithRightValue = { ...model, rightValue: toInt(rightValue), sourceLeft: false};
			return convert(updatedWithRightValue);
		}
		break;
	case MSGS.LEFT_UNIT:
		const { leftUnit } = msg;
		const updatedWithLeftUnit = { ...model, leftUnit };
		return convert(updatedWithLeftUnit);
		break;
	case MSGS.RIGHT_UNIT:
		const { rightUnit } = msg;
		const updatedWithRightUnit = { ...model, rightUnit };
		return convert(updatedWithRightUnit);
		break;
	default:
		return model;
		break;
	};
};

function roundOut(num) {
	return Math.round(num * 10) / 10;
	
};

function convert(model) {
	const { leftValue, leftUnit, rightValue, rightUnit, sourceLeft } = model;
	const [ unitFrom, unitTo, value ] =
		sourceLeft ? 
			[ leftUnit, rightUnit, leftValue ] :
					[ rightUnit, leftUnit, rightValue ];
	const convertedValue = R.pipe(
			convertTemp,
			roundOut
			)( unitFrom, unitTo, value );
	return sourceLeft ?
			{ ...model, rightValue: convertedValue } :
				{ ...model, leftValue: convertedValue };
};

function convertTemp(unitFrom, unitTo, temp) {
	const outTemp = R.pathOr(
			R.identity,
			[unitFrom, unitTo],
			unitCombinations
	);
	return outTemp(temp);
};

function farToCel(temp) {
	return 5 / 9 * (temp - 32);
};

function celToFar(temp) {
	return 9 / 5 * temp + 32;
};

function kelToCel(temp) {
	return temp - 273.15;
};

function celToKel(temp) {
	return temp + 273.15;
};

const farToKel = R.pipe(farToCel, celToKel);
const kelToFar = R.pipe(kelToCel, celToFar);

const unitCombinations = {
		Celsius: {
			Fahrenheit: celToFar,
			Kelvin: celToKel
		},
		Fahrenheit: {
			Celsius: farToCel,
			Kelvin: farToKel
		},
		Kelvin: {
			Celsius: kelToCel,
			Fahrenheit: kelToFar
		},
};

export default update;
