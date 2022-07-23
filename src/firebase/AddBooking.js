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
  const dateformat = moment(date,"DD/MM/YYYY").format("YYYYMMDD");
  const startInt = parseInt(startTime);
  const endInt = parseInt(endTime);
  const availRef = firebase.firestore().doc(`facilities/${facility}/availability/${dateformat}`);
  const availSnap = await availRef.get();
  if (availSnap.exists) {
    const avail = availSnap.data();
    for (let i = startInt; i < endInt; i+=100) {
      avail[i] = Math.max(avail[i]-1, 0);
      await firebase.firestore().collection(`facilities/${facility}/availability`).doc(dateformat).update(avail);
    }
  }
}