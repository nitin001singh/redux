import { createStore, applyMiddleware, combineReducers } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
const INC = "account/increment";
// const INIT = "account/initialize";
const DEC = "account/decrement";
const INCBYAMT = "account/incrementByAmount";
const getAccUSerPending = "account/getUser/pending";
const getAccUSerFullfilled = "account/getUser/fulfilled";
const getAccUSerRejected = "account/getUser/rejected";

const INCBONUS = "bonus/increaseBonus";

// Store
const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

//reducer
function accountReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case getAccUSerFullfilled:
      return { amount: action.payload ,  pending:false};
    case getAccUSerRejected:
      return { ...state, error: action.error, pending:false };

    case getAccUSerPending:
      return { ...state, pending: true };


    case INC:
      return { amount: state.amount + 1 };
    case DEC:
      return { amount: state.amount - 1 };
    case INCBYAMT:
      return { amount: state.amount + action.payload };

    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case INCBONUS:
      return { points: state.points + 1 };

    case INCBYAMT:
      if (action.payload >= 100) {
        return { points: state.points + 1 };
      }
    default:
      return state;
  }
}

//Global State

// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

// Action Creaters

function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUSerPending());
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch(getAccountUSerFullfilled(data.amount));
    } catch (error) {
      dispatch(getAccountUSerRejected(error.message));
    }
  };
}

function getAccountUSerFullfilled(value) {
  return { type: getAccUSerFullfilled, payload: value };
}

function getAccountUSerRejected(error) {
  return { type: getAccUSerRejected, error: error };
}

function getAccountUSerPending() {
  return { type: getAccUSerPending };
}

function incrementBonus() {
  return { type: INCBONUS };
}

function incrementAmt() {
  return { type: INC };
}
function decrementAmt() {
  return { type: DEC };
}

function incrementByAmount(value) {
  return { type: INCBYAMT, payload: value };
}

// Async api calls

//action
setTimeout(() => {
  store.dispatch(getUserAccount(3));
  // store.dispatch(incrementByAmount(500));
  store.dispatch(incrementBonus(50));
}, 1500);
