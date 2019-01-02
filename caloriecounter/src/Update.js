import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
};

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
};

export function editMealMsg(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId,
  };
};

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
      const { editId } = model;
      const updatedModel = editId !== null ?
        edit(msg, model) : add(msg, model);
      return updatedModel;
    };
    break;
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const applyDelete = function deleteMeal(meal) {
        return meal.id !== id;
      };
      const meals = R.filter(applyDelete, model.meals);
      return { ...model, meals};
    };
    break;
    case MSGS.EDIT_MEAL: {
      const { editId } = msg;
      const applyEdit = function editMeal(meal) {
        return meal.id === editId;
      };
      const meal = R.find(applyEdit, model.meals);
      const { description, calories } = meal;
      return {...model,
              description,
              calories,
              editId,
              showForm: true,
            };
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
    meals: meals,
    description: '',
    calories: 0,
    showForm: false,
    nextId: nextId + 1,
    editId : null,
  };
};

function edit(msg, model) {
  const { editId, description, calories } = model;
  const correctIdUpdate = function(meal) {
    if (meal.id === editId) {
      return { ...meal, description, calories };
    } else {
      return meal;
    };
  };
  const meals = R.map(correctIdUpdate, model.meals);
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null,
  }
}

export default update;
