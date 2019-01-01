import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
};

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
};

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description,
  };
};

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories,
  };
};

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    };
      break;
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description };
    };
    break;
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe(parseInt, R.defaultTo(0))
      (msg.calories);
      return { ...model, calories };
    };
      break;
    case MSGS.SAVE_MEAL: {
      return add(msg, model);
    };
    break;
    default:
      return model;
  };
};

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories};
  const meals = [...model.meals, meal ];
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    nextId: nextId + 1,
    editId : null,
  };
};

export default update;
