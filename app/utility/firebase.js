import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlrDpegDFfYgU-8GYApeiKQ5z5Wk8TNVc',
  authDomain: 'yasalam-55cc7.firebaseapp.com',
  projectId: 'yasalam-55cc7',
  storageBucket: 'yasalam-55cc7.appspot.com',
  messagingSenderId: '233663621621',
  appId: '1:233663621621:web:187c881f8ab738351bd8bc',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const categoryColRef = collection(db, 'categories');
export const featureColRef = collection(db, 'features');
export const regionColRef = collection(db, 'regions');
export const outletColRef = collection(db, 'outlets');
export const visitColRef = collection(db, 'visits');
export const transactionColRef = collection(db, 'transactions');
export const productColRef = collection(db, 'products');

export const getCategories = async () => {
  const categories = await getDocs(categoryColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });

  return categories;
};
export const getFeatures = async () => {
  const features = await getDocs(featureColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return features;
};
export const getRegions = async () => {
  const region = await getDocs(regionColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return region;
};
export const getOutlets = async () => {
  const outlet = await getDocs(outletColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });
  return outlet;
};
export const getOutlet = async (id) => {
  const docRef = doc(db, 'outlets', id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return data;
};
export const getProducts = async () => {
  const categories = await getDocs(productColRef).then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  });

  return categories;
};
export const getAllTransactions = async () => {
  try {
    const q = query(transactionColRef, orderBy('createdAt', 'desc'));
    const members = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    });

    return members;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};
export const getAllVisits = async () => {
  try {
    const q = query(visitColRef, orderBy('createdAt', 'desc'));
    const members = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    });

    return members;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};
