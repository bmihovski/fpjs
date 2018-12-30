import app from './App.js';
import initModel from './Model.js';
import update from './Update.js';
import view from './View.js';

const node = document.getElementById('app');

app(initModel, view, update, node);
