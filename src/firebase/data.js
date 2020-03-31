import firebase from "./firebase";

async function getMonths(month, year) {
    const db = firebase.firestore();
    const response = await db
        .collection("months")
        .where("month", "==", month)
        .where("year", "==", year)
        .get();
    return response.docs.map(doc => {
        const row = doc.data();
        row.id = doc.id;
        return row;
    });
}

export default getMonths;
