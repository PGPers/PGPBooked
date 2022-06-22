import { firebase } from "../firebase-config";

export async function AddBooking(uid, facility, date, matric, numOfPeople, purpose) {
  const bookid = firebase.firestore().collection('bookings').doc();
  const data = {
    uid: uid,
    facility: facility,
    date: date,
    matric: matric,
    numOfPeople: numOfPeople,
    purpose: purpose,
    bookid: bookid.id
  }
  await bookid.set(data);
  await firebase.firestore().collection(`users/${uid}/bookings`).doc(bookid.id).set(data);
}