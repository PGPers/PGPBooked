import { firebase } from "../firebase-config";

export async function AddUser(uid, email, firstname, lastname, phone) {
  const data = {
    email: email,
    firstName: firstname,
    lastName: lastname,
    phone: phone,
    uid: uid
  }
  await firebase.firestore().doc(`users/${uid}`).set(data);
}