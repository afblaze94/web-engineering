import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty, useFirestoreConnect } from "react-redux-firebase";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import AddProductForm from "./pages/AddProductForm";
import EditProductForm from "./pages/EditProductForm";
import MyProducts from "./pages/MyProducts";
import MyPurchases from "./pages/MyPurchases";
import EditUserPage from "./pages/EditUserPage";

import { logoutAction } from "./redux/actions/authActions";
import searchProduct from "./components/Product/searchProduct";
import CheckoutList from "./pages/CheckoutList";

// splash screen
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  const loading = useSelector((state) => state.app.loading);
  if (!isLoaded(auth) || loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={90} />
      </div>
    );
  return children;
}

function PrivateRoute({ component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          React.createElement(component)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  useFirestoreConnect([
    {
      collection: "categories",
      orderBy: ["name"],
    },
  ]);

  console.log("rerendered");

  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/searchProduct" component={searchProduct} />
          <PrivateRoute path="/editProfile/:id" component={EditUserPage} />
          <PrivateRoute path="/addproduct" component={AddProductForm} />
          <PrivateRoute path="/editproduct/:id" component={EditProductForm} />
          <PrivateRoute path="/myproducts" component={MyProducts} />
          <PrivateRoute path="/mypurchase" component={MyPurchases} />
          <PrivateRoute path="/checkout" component={CheckoutList} />
          <PrivateRoute path="/recommendation" component={Recommendation} />
        </Switch>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

function Recommendation() {
  // const state = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(logoutAction())}>Logout</button>;
}

export default App;
