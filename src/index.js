import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './redux/rootReducer';
import { increment, decrement, asyncIncrement, changeTheme } from './redux/actions';
import './style.css';
import { composeWithDevTools } from 'redux-devtools-extension';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// function logger (state) {
//   return function(next) {
//     return function(action) {
//       console.log(state.getState());
//       console.log(action);
//       return next(action)
//     }
//   }
// }

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(
  applyMiddleware(thunk, logger),
));


addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
  store.dispatch(changeTheme(newTheme));
})

store.dispatch({type: 'INIT__APPLICATION'})

store.subscribe(() => {
  const state = store.getState();
  console.log(state)

  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => btn.disabled = state.theme.disabled);
})