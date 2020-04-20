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

    async updateHours(id, document) {
        const db = firebase.firestore();
        return await db
            .collection("months")
            .doc(id)
            .set({
                client: this.transformToString(document.client),
                days: this.processDays(document.days),
                profile: document.profile,
                profileId: this.transformToString(document.profileId),
                project: this.transformToString(document.project),
                year: this.transformToString(document.year),
                month: this.transformToString(document.month),
                approved: document.approved ? document.approved : false,
            });
    },

    async updateHourList(documents) {
        const db = firebase.firestore();
        const batch = db.batch();

        documents.forEach((document) => {
            if (!document.id || document.id === "") {
                const reference = db.collection("months").doc(document.id);
                batch.update(reference, document);
            }
        });

        return batch.commit();
    },

    processDays(days) {
        return days.map((x, index) => {
            return {
                day: x.day ? x.day : index + 1,
                dayOfTheWeek: x.dayOfTheWeek ? x.dayOfTheWeek : index + 1,
                isWeekend: x.isWeekend ? x.isWeekend : false,
                worked: this.transformToString(x.worked),
                overtime: this.transformToString(x.overtime),
                sick: this.transformToString(x.sick),
                holiday: this.transformToString(x.holiday),
                publicHoliday: this.transformToString(x.publicHoliday),
                available: this.transformToString(x.available),
                education: this.transformToString(x.education),
                other: this.transformToString(x.other),
                standBy: this.transformToString(x.standBy),
                kilometers: this.transformToString(x.kilometers),
                explanation: this.transformToString(x.explanation),
            };
        });
    },

    transformToString(value) {
        return value ? value : "";
    },
};
