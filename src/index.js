import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-notifications/lib/notifications.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { NotificationContainer } from "react-notifications";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";

import rootReducer from "./redux/reducers";
//import rootReducer from "./redux/reducers/rootReducer"
import firebase from "./configs/firebaseConfig";

// redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      <NotificationContainer />
    </ReactReduxFirebaseProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
