import firebase from "../firebase.component";

import IDay from "../../common/interfaces/IDay";
import IHours from "../../common/interfaces/IHours";

export default {
    async getHours(
        month: number,
        year: number,
    ): Promise<
        firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    > {
        const db = firebase.firestore();
        return await db
            .collection("months")
            .where("month", "==", Number(month))
            .where("year", "==", Number(year))
            .get();
    },

    async getHoursForProfile(month: number, year: number, profileId: string) {
        const db = firebase.firestore();
        const response = await db
            .collection("months")
            .where("month", "==", Number(month))
            .where("year", "==", Number(year))
            .where("profileId", "==", profileId)
            .get();
        return response.docs.map((doc) => {
            const row = doc.data();
            row.id = doc.id;
            return row;
        });
    },
    async getHoursWithId(
        id: string,
    ): Promise<
        firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    > {
        const db = firebase.firestore();
        return await db.collection("months").doc(id).get();
    },

    async updateHours(id: string, document: IHours): Promise<void> {
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
                hoursPerWeek: this.transformToString(document.hoursPerWeek),
                year: this.transformToString(document.year),
                month: this.transformToString(document.month),
                approved: document.approved ? document.approved : false,
            });
    },

    async updateHourList(documents: IHours[]): Promise<void> {
        const db = firebase.firestore();
        const batch = db.batch();

        documents.forEach((document: IHours) => {
            if (!document.id || document.id === "") {
                return;
            }
            const reference = db.collection("months").doc(document.id);
            batch.update(reference, document);
        });

        return batch.commit();
    },

    async getTemplate(
        profileId: string,
    ): Promise<
        firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    > {
        const db = firebase.firestore();
        return await db.collection("template").doc(profileId).get();
    },

    async updateTemplate(
        profileId: string,
        days: IDay[],
        client: string,
        project: string,
        profileName: string,
    ): Promise<void> {
        const db = firebase.firestore();
        return await db.collection("template").doc(profileId).set({
            days,
            client,
            project,
            profileName,
        });
    },

    processDays(days: IDay[]) {
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

    transformToString(value: any): string {
        return value ? value : "";
    },
};
