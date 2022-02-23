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
export const voucherColRef = collection(db, 'vouchers');
export const favoriteColRef = collection(db, 'favorites');

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
export const getAllTransactionsByMemberId = async (memberId) => {
  try {
    const q = query(transactionColRef, where('memberId', '==', memberId));
    const members = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      data = data.sort(function (a, b) {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      return data;
    });

    return members;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};
export const getAllVisitsByMemberId = async (memberId) => {
  try {
    const q = query(visitColRef, where('memberId', '==', memberId));
    const visits = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      data = data.sort(function (a, b) {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      return data;
    });

    return visits;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};
export const getAllVouchersById = async (memberId) => {
  try {
    const q = query(voucherColRef, where('memberId', '==', memberId));
    const vouchers = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      data = data.sort(function (a, b) {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      return data;
    });

    return vouchers;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};

export const addFavorite = async (memberId, outletId) => {
  addDoc(favoriteColRef, {
    memberId,
    outletId,
  });
};

export const getAllFavoritesById = async (memberId) => {
  try {
    const q = query(favoriteColRef, where('memberId', '==', memberId));
    const vouchers = await getDocs(q).then((snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ outletId: doc.data().outletId, id: doc.id });
      });
      return data;
    });

    return vouchers;
  } catch (error) {
    console.log(error);
    return new Error('error');
  }
};
export const deleteFavorite = async (favorite) => {
  await db.collection('favorites').document(favorite).delete();
};
