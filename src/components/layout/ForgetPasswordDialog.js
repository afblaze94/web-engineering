import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { sendRecoveryEmail } from "../../redux/actions/authActions";

export default function ForgetPasswordDialog(props) {
  const { open, setOpen } = props;
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(sendRecoveryEmail(email));
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={sendEmail}>
          <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reset your password, please enter your email address here. We
              will send you a recovery email.
            </DialogContentText>

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Email Address"
              autoComplete="email"
              type="email"
              fullWidth
              onChange={handleEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
