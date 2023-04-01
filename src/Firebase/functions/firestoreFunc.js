
import {
  addDoc,
  doc,
  getDocs,
  query,
  onSnapshot,
  collection,
  setDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL,  uploadBytesResumable } from "firebase/storage";
import { db, storage, database } from "../firebase";


import { getDatabase, ref,   onValue, set } from "firebase/database";

class RealtimeData {
  constructor(path, customQueryProps = []) {
    this.path = 'users';
    this.customQueryProps = customQueryProps;
    this.data = 'hgjhjh';
    this.listener = null;
  }

  start() {
    const db = getDatabase();
    const dataRef = query(ref(database, 'students/elève 2'));

    set(ref(db, 'users/' ), {
      username: 'Tenezeu237',
      email: 'bennny',
      profile_picture : 'dlfsjldkfjsdklf'
    });


    this.listener = onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      console.log(val)
      if (val) {
        this.data = val;
        console.log(val)
      }
    }, (error) => {
      console.log("Error fetching data: ", error);
    });

    console.log(this.listener)
  }

  stop() {
    if (this.listener) {
      this.listener();
    }
  }

  getData() {
    return this.data;
  }
}

export default RealtimeData;




export const realTimeFectch = async (path) => {
  let list = [];
  onSnapshot(collection(db, path), (docs) => {
    docs.forEach((el) => {
      list.push({ id: el.id, ...el.data() });
    });
  });

  return list;
};

/**
 * fetchData  -  retrive data from a collection in firebase
 * @param {string} path - The path to acces the collection in firebase 
 * @param {array} customQueryProps -  More details about de documents you want to fetch ( use : where ...) 
 * 
 * @throws {Error} if either the path, custuomQueryProps, connection are not valid or something interupp de fetch
 * @returns {Array} An array containing the retrive information
 */
export const fetchData = async ({ path, custumQueryProps = [] }) => {
  let list = [];

  try {
    const q = query(collection(db, path), ...custumQueryProps);
    const qData = await getDocs(q);
    qData.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch (err) {
    console.log(err);
  }

  if (list.length !== 0) {
    return list;
  }
};


export const setDataIdTime = async (nombase, id, data) => {
  try {
    await setDoc(doc(db, nombase, id, { ...data, time: serverTimestamp() }));
  } catch (err) {
    console.log(err);
  }
};

export const setDataId = async ({ path, data }) => {
  try {
    let pathRef = doc(db, path);
    await setDoc(pathRef, { ...data });
  } catch (err) {
    console.log(err);
  }
};

export const setFile = async (path, file, storeUrl) => {
  let url;
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // on peut suivre la progression du chargement

      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        url = downloadURL;
        storeUrl(downloadURL);
        return url;
      });
    }
  );

  return await url;
};

export const setDataTime = async (nombase, data) => {
  try {
    await addDoc(collection(db, nombase), { ...data, time: serverTimestamp() });
  } catch (err) {
    console.log(err);
  }
};


/**
 * addData is an async function that adds data to a specified path in a database.
 *
 * @param {string} path - The path in the database to add the data to.
 * @param {object} data - The data to be added to the database.
 *
 * @throws {Error} If either the `path` or `data` parameters are not provided.
 */

export const addData = async (path, data) => {
  if (!path || !data) {
    console.error("Error adding data: Invalid parameters");
    return;
  }

  let pathRef; 
  try {
    pathRef = collection(db, path);
    await addDoc(pathRef, { ...data });
  } catch (err) {
    console.error("Error adding data: ", err);
  }
};


export const updateData = async ({ path, data }) => {
  try {
    await updateDoc(doc(db, path), { ...data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async ({ path }) => {
  try {
    await deleteDoc(doc(db, path)); //Effacer en présicsabt la collection et l'ID
  } catch (err) {
    console.log(err.name);
  }
};
