import { combineReducers } from "redux";
import app from './app.reducers'
import user from './user.reducers'
import cash from './cash.reducers'
import shift from './shift.reducers'
import cashHistory from "./cashHistory.reducers";
export default combineReducers({
    app,
    user,
    cash,
    shift,
    cashHistory
})
