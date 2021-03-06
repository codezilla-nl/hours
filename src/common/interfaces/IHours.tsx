import IDay from "./IDay";
import IProfile from "./IProfile";

export default interface IHours {
    id: string;
    days: IDay[];
    profile: IProfile;
    approved: Boolean;
    [key: string]: any;
}
