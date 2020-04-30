export default interface Day {
    day: number;
    date: any;
    worked: string;
    overtime: string;
    sick: string;
    holiday: string;
    publicHoliday: string;
    available: string;
    education: string;
    other: string;
    standBy: string;
    kilometers: string;
    explanation: string;
    [key: string]: any;
}
