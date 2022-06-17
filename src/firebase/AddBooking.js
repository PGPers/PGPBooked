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
  await firebase.firestore().collection('bookings').add(data);
}