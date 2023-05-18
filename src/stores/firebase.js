import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://sweety-89cb8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const setFireBase = set
const refFireBase = ref

const onValueFireBase = onValue

const firebase = initializeApp(firebaseConfig);

const database = getDatabase(firebase);

export { database, refFireBase, setFireBase, onValueFireBase }