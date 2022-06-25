import { firebase } from "../firebase-config";
import moment from 'moment';

export async function ChangeBooking(bookid, uid, date, numOfPeople, startTime, endTime) {
  const dateTime = moment(`${date} ${startTime}`, "DD/MM/YYYY HHmm").toDate();
  const data = {
    date: date,
    numOfPeople: numOfPeople,
    startTime: startTime,
    endTime: endTime,
    dateTime: dateTime,
    status: 'CONFIRMED'
  }
  await firebase.firestore().doc(`users/${uid}/bookings/${bookid}`).update(data);
  await firebase.firestore().doc(`bookings/${bookid}`).update(data);
}