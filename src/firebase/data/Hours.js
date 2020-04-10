import firebase from "../firebase";

export default {
    async getHours(month, year) {
        const db = firebase.firestore();
        const response = await db
            .collection("months")
            .where("month", "==", month)
            .where("year", "==", year)
            .get();
        return response.docs.map((doc) => {
            const row = doc.data();
            row.id = doc.id;
            return row;
        });
    },
    async getHoursForProfile(month, year, profileId) {
        const db = firebase.firestore();
        const response = await db
            .collection("months")
            .where("month", "==", month)
            .where("year", "==", year)
            .where("profileId", "==", profileId)
            .get();
        return response.docs.map((doc) => {
            const row = doc.data();
            row.id = doc.id;
            return row;
        });
    },
    async getHoursWithId(id) {
        const db = firebase.firestore();
        return await db.collection("months").doc(id).get();
    },
};
