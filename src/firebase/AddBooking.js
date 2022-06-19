import { firebase } from "../firebase-config";

export async function AddBooking(uid, facility, date, matric, numOfPeople, purpose) {
  const data = {
    uid: uid,
    facility: facility,
    date: date,
    matric: matric,
    numOfPeople: numOfPeople,
    purpose: purpose
  }
  const bookid = firebase.firestore().collection('bookings').doc();
  await bookid.set(data);
  console.log(bookid.id);
  await firebase.firestore().collection(`users/${uid}/bookings`).doc(bookid.id).set(data);
}