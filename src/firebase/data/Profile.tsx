import firebase from "../firebase.component";

import IProfile from "../../common/interfaces/IProfile";

export default {
    async getProfile(microsoftId: string): Promise<any> {
        const db = firebase.firestore();
        return await db
            .collection("profile")
            .where("microsoftId", "==", microsoftId)
            .get();
    },

    async updateProfile(document: IProfile): Promise<void> {
        const db = firebase.firestore();
        return await db
            .collection("profile")
            .doc(document.id)
            .set({
                displayName: this.transformToString(document.displayName),
                email: this.transformToString(document.email),
                hoursPerWeek: this.transformToString(document.hoursPerWeek),
                isAdmin: Boolean(document.isAdmin),
                microsoftId: this.transformToString(document.microsoftId),
            });
    },

    async deleteProfile(documentId: string): Promise<void> {
        const db = firebase.firestore();
        return await db.collection("profile").doc(documentId).delete();
    },

    transformToString(value: any): string {
        return value ? value : "";
    },
};
