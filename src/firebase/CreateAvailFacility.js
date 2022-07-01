import { firebase } from "../firebase-config";
import moment from 'moment';

export async function CreateAvailFacility() {
  const day = moment().add(14, 'days');
  const dateString = day.format('YYYYMMDD');
  const data = (num) => {
    const d = {
      '0900': num,
      '1000': num,
      '1100': num,
      '1200': num,
      '1300': num,
      '1400': num,
      '1500': num,
      '1600': num,
      '1700': num,
      '1800': num,
      '1900': num,
      '2000': num,
      '2100': num,
    };
    return d;
  }
  await firebase.firestore().doc(`facilities/badmin1`).set({name: 'badmin1'});
  await firebase.firestore().doc(`facilities/badmin1/availability/${dateString}`).set(data(3));
  await firebase.firestore().doc(`facilities/music1`).set({name: 'music1'});
  await firebase.firestore().doc(`facilities/music1/availability/${dateString}`).set(data(2));
}