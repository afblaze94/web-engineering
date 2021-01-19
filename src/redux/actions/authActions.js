import { NotificationManager } from "react-notifications";
import { toggleLoading } from "./appActions";

export const loginAction = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        NotificationManager.success("Login Success");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const loginWithGoogle = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(toggleLoading());

    const firebase = getFirebase();
    const firestore = getFirestore();

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        if (result.additionalUserInfo.isNewUser) {
          const uid = result.user.uid;
          const profile = result.additionalUserInfo.profile;
          firestore
            .collection("users")
            .doc(uid)
            .set({
              firstName: profile.given_name,
              lastName: profile.family_name,
              phone: "",
              gender: "",
              lastView: "",
              lastSecondView: "",
            })
            .then(() => {
              dispatch(toggleLoading());
              NotificationManager.success("Login Success");
            });
        } else {
          dispatch(toggleLoading());
          NotificationManager.success("Login Success");
        }
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const logoutAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase.logout();
        NotificationManager.success("Logout Success");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const sendRecoveryEmail = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        NotificationManager.success("Recovery Email sent");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const signupAction = (newUser, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { firstName, lastName, email, password, phone, gender, lastView, lastSecondView } = newUser;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          firstName,
          lastName,
          phone,
          gender,
          lastView,
          lastSecondView,
        });
      })
      .then(() => {
        NotificationManager.success("Signup success");
        history.push("/");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const editUserAction = (editUser, history) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase ();
    const firestore = getFirestore ();
    const { firstName, lastName, phone, gender, lastView, lastSecondView } = editUser;
    const user = firebase.auth().currentUser;
    
    firebase
      .auth()
      .onAuthStateChanged((resp) => { 
        if(resp){
          return firestore.collection("users").doc(user.uid).set({
            firstName,
            lastName,
            phone,
            gender,
            lastView,
            lastSecondView,
          })
          .then(() => {
            NotificationManager.success("Edit profile successfully");
            history.push("/");
          })
          .catch((err) => {
            NotificationManager.error(err.message);
          });
        }else{
          
        }
      });
  };
};

export const clickProductAction = (category, history) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase ();
    const firestore = getFirestore ();
    const { firstName, lastName, phone, gender, lastView, lastSecondView } = category;
    const user = firebase.auth().currentUser;
    
  //   firebase
  //     .auth()
  //     .onAuthStateChanged((resp) => {
  //       if(resp){
  //         return firestore.collection("users").doc(user.uid).set({
  // return (dispatch, getState, { getFirebase, getFirestore }) => {
  //   const firebase = getFirebase();
  //   const firestore = getFirestore();
  //   const { firstName, lastName, phone } = editUser;
  //   const user = firebase.auth().currentUser;
  //   console.log("User ID: ", editUser);

    firebase.auth().onAuthStateChanged((resp) => {
      if (resp) {
        return firestore
          .collection("users")
          .doc(user.uid)
          .set({
            firstName,
            lastName,
            phone,
            gender,
            lastView,
            lastSecondView,
          })
          .then(() => {
            //NotificationManager.success("LAST VIEW");
            //history.push("/login");
          })
          .catch((err) => {
            NotificationManager.error(err.message);
          });
      } else {
      }
      //});
      //.updateCurrentUser()
      // .then((resp) => {
      //   return firestore.collection("users").doc(resp.user.uid).set({
      //     firstName,
      //     lastName,
      //     phone,
      //  });
      // })
      // .then(() => {
      //   NotificationManager.success("Edit success");
      //   history.push("/");
      // })
      // .catch((err) => {
      //   NotificationManager.error(err.message);
      // });
    });
  };
};
