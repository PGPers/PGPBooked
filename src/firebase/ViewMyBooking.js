import { firebase } from "../firebase-config";

export async function ViewMyBooking(uid) {
  console.log(uid);
  const bookRef = firebase.firestore().collection(`users/${uid}/bookings`);
  const bookSnap = await bookRef.get();
  bookSnap.forEach(doc => {
    console.log(doc.id, doc.data());
  })
}