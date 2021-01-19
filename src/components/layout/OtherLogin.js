import React from "react";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import GoogleButton from "react-google-button";

import { useDispatch } from "react-redux";

import { loginWithGoogle } from "../../redux/actions/authActions";

export default function OtherLogin() {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };
  return (
    <div>
      <Box mt={2}>
        <Divider />
        <Box mt={2} />
        <div style={{ textAlign: "center" }}>
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </Box>
    </div>
  );
}
