import { NotificationManager } from "react-notifications";
import { getFirestore } from "redux-firestore";

import { toggleLoading } from "./appActions";
import { clearItem } from "./cartActions";

// export const loginAction = (credentials) => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then(() => {
//         NotificationManager.success("Login Success");
//       })
//       .catch((err) => {
//         NotificationManager.error(err.message);
//       });
//   };
// };

export const addProduct = (product, images, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(toggleLoading());

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    const storage = getFirebase().storage();

    firestore
      .collection("products")
      .add({
        ...product,
        seller: userId,
        sellerName: profile.firstName + " " + profile.lastName,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then((resp) => {
        const productId = resp.id;

        if (images.length !== 0) {
          images.forEach((image) => {
            const filePath = `images/${productId}/${image.name}`;
            const uploadTask = storage.ref(filePath).put(image);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                throw error;
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  firestore
                    .collection("products")
                    .doc(productId)
                    .update({
                      images: firestore.FieldValue.arrayUnion({
                        name: image.name,
                        url: downloadURL,
                        path: filePath,
                      }),
                    });
                });
              }
            );
          });
        }
        NotificationManager.success("Product Added");
        dispatch(toggleLoading());
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message);
        dispatch(toggleLoading());
      });
  };
};

export const editProduct = (id, product, currentImages, images, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(toggleLoading());

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    const storage = getFirebase().storage();

    const updateDetail = firestore
      .collection("products")
      .doc(id)
      .update({ ...product });

    var imgArr = [];
    currentImages.forEach((image) => {
      if (!image.keep) {
        storage.ref(image.path).delete();
      } else {
        delete image.keep;
        imgArr.push(image);
      }
    });

    const updateImgMetadata = firestore.collection("products").doc(id).update({
      images: imgArr,
    });

    var promises = [];
    promises.push(updateDetail);
    promises.push(updateImgMetadata);

    Promise.all(promises)
      .then(() => {
        if (images.length !== 0) {
          images.forEach((image) => {
            const filePath = `images/${id}/${image.name}`;
            const uploadTask = storage.ref(filePath).put(image);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                throw error;
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  firestore
                    .collection("products")
                    .doc(id)
                    .update({
                      images: firestore.FieldValue.arrayUnion({
                        name: image.name,
                        url: downloadURL,
                        path: filePath,
                      }),
                    });
                });
              }
            );
          });
        }
        NotificationManager.success("Successfully modified");
        dispatch(toggleLoading());
        history.push("/myproducts");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message);
        dispatch(toggleLoading());
        history.push("/myproducts");
      });
  };
};

export const rateProduct = (product) => {
  return (dispatch, getState) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .add({})
      .then(() => {
        dispatch({ type: "RATE_PRODUCT", product });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "RATE_PROJECT_ERROR", err });
      });
  };
};


export const addOrder = (cartItems, totalPrice,address) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(toggleLoading());
    console.log(address);
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    const storage = getFirebase().storage();

    firestore
      .collection("orders")
      .add({
        cartitems:cartItems,
        totalPrice:totalPrice,
        address:address,
        deliveryStatus:'On Delivery',
        purchaser: userId,
        purchaserName: profile.firstName + " " + profile.lastName,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then((resp) => {
        // const productId = resp.id;
        cartItems.forEach(element=>{
          console.log(element);
          const productRef = firestore.collection('products').doc(element.id);
const increaseBy = getFirebase().firestore.FieldValue.increment(-Math.abs(element.qty));
console.log(productRef);
productRef.update({ stock: increaseBy });
        })
        
        NotificationManager.success("Order Created Succesfully!");
        
        dispatch(clearItem());
  dispatch(toggleLoading());
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message);
       dispatch(toggleLoading());
      });
  };
};