import firebase from "../firebase/Fire";

const authenticate = (token, firebaseToken, cb) => {
  firebase
    .auth()
    .signInWithCustomToken(firebaseToken)
    .then((userCredential) => {
      cb(token, firebaseToken);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

export default {
  authenticate,
};
