import { firebase } from "../firebase-config";
import moment from 'moment';

export async function AddBooking(uid, facility, date, matric, numOfPeople, purpose, startTime, endTime) {
  const bookid = firebase.firestore().collection('bookings').doc();
  const dateTime = moment(`${date} ${startTime}`, "DD/MM/YYYY HHmm").toDate();
  const data = {
    uid: uid,
    facility: facility,
    date: date,
    matric: matric,
    numOfPeople: numOfPeople,
    purpose: purpose,
    bookid: bookid.id,
    startTime: startTime,
    endTime: endTime,
    dateTime: dateTime,
    status: 'CONFIRMED'
  }
  await bookid.set(data);
  await firebase.firestore().collection(`users/${uid}/bookings`).doc(bookid.id).set(data);
}