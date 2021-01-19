import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/authActions";
import CartIcon from '../cart/CartIcon';
import '../cart/cart.scss';
const SignInLink = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const uid = useSelector((state) => state.firebase.auth.uid);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(logoutAction());
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CartIcon />
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <PersonIcon />
        </Avatar>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => history.push(`/editProfile/${uid}`)}>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={() => history.push("/myproducts")}>
          My Products
        </MenuItem>
        <MenuItem onClick={() => history.push("/mypurchase")}>
          My Orders
        </MenuItem>
        {/* <MenuItem onClick={() => history.push("/checkout")}>
          Checkout
        </MenuItem> */}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default SignInLink;
