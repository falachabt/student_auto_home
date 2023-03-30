import { db , storage } from '../../firebase';
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
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";




 const sortedDataCentre = (data) => {
  function compare(a, b) {
    let nameA = a.centre.toLowerCase();
    let nameB = b.centre.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  }
  function compare1(a, b) {
    let nameA = a.nom.toLowerCase(),
      nameB = b.nom.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  }

  let dataSep = [];
  let b = data.sort(compare).reverse();
  let prevIndex = 0;
  for (var i = 0; i < b.length; i++) {
    let el = b[i].centre;
    if (i !== b.length - 1) {
      let elNext = b[i + 1].centre;
      if (el.toLowerCase() !== elNext.toLowerCase()) {
        dataSep.push({
          centre: el,
          eleves: b.slice(prevIndex, i + 1).sort(compare1),
        });
        prevIndex = i + 1;
      }
    } else {
      dataSep.push({
        centre: el,
        eleves: b.slice(prevIndex, i + 1).sort(compare1),
      });
      prevIndex = i + 1;
    }
  }
  return dataSep;
};


 const sepAmount = (val) => {
  val = val.toString();
  if (val < 1000) {
  } else if (val >= 1000 && val < 10000) {
    val = ` ${val[0]},${val.slice(1, 4)}`;
  } else if (val >= 10000 && val < 100000) {
    val = `${val.slice(0, 2)},${val.slice(2, 5)}`;
  } else if (val >= 100000 && val < 1000000) {
    val = `${val.slice(0, 3)},${val.slice(3, 6)}`;
  } else if (val >= 1000000 && val < 10000000) {
    val = `${val[0]},${val.slice(1, 4)},${val.slice(4, 7)}`;
  } else if (val >= 10000000 && val < 100000000) {
    val = `${val.slice(0, 2)},${val.slice(2, 5)},${val.slice(5, 9)}`;
  }
  return val;
};

 const getDay = (e, primary) => {
  let date;
  if (primary) {
    date = new Date(e);
  } else {
    date = new Date(e.seconds * 1000);
  }
  let day = date.getDay();
  //   let jourDate = date.getDate(); // pour trier les donné par *jour et par années
  //   let Month = date.getMonth();
  let jour;
  switch (day) {
    case 1: {
      jour = "lundi";
      break;
    }
    case 2: {
      jour = "mardi";
      break;
    }
    case 3: {
      jour = "mercredi";
      break;
    }
    case 4: {
      jour = "jeudi";
      break;
    }
    case 5: {
      jour = "vendredi";
      break;
    }
    case 6: {
      jour = "samedi";
      break;
    }
    case 7: {
      jour = "dimanche";
      break;
    }
    default: {
    }
  }

  return `${jour}`;
};

 const getDayByNumber = (day_num) => {
  let jour;
  switch (day_num) {
    case 0: {
      jour = "Dimanche";
      break;
    }
    case 1: {
      jour = "Lundi";
      break;
    }
    case 2: {
      jour = "Mardi";
      break;
    }
    case 3: {
      jour = "Mercredi";
      break;
    }
    case 4: {
      jour = "Jeudi";
      break;
    }
    case 5: {
      jour = "Vendredi";
      break;
    }
    case 6: {
      jour = "Samedi";
      break;
    }
    default: {
      jour = "lundi";
      break;
    }
  }

  return `${jour}`;
};

 const compare_string = (a, b) => {
  let nameA = a.nom.toLowerCase();
  let nameB = b.nom.toLowerCase();
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
};

