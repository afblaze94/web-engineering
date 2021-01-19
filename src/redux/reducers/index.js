import { combineReducers } from "redux";
import { firebaseReducer as firebase } from "react-redux-firebase";
import { firestoreReducer as firestore } from "redux-firestore";

import { appReducer as app } from "./appReducer";
import { authReducer as auth} from "./authReducer"
import { productReducer as product} from "./productReducer"
import cartReducer from './cartReducer';
export default combineReducers({ cartReducer,firebase, firestore, app });
