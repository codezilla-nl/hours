import IHoursColumn from "./IHoursColumn";
import IMonth from "./IMonth";

export const columns: IHoursColumn[] = [
    {
        id: "worked",
        description: "Gewerkt",
        enabled: true,
    },
    {
        id: "overtime",
        description: "Overwerk",
        enabled: true,
    },
    {
        id: "sick",
        description: "Ziek",
        enabled: true,
    },
    {
        id: "holiday",
        description: "Verlof",
        enabled: true,
    },
    {
        id: "publicHoliday",
        description: "Feestdag",
        enabled: true,
    },
    {
        id: "available",
        description: "Beschikbaar",
        enabled: false,
    },
    {
        id: "education",
        description: "Opleiding",
        enabled: false,
    },
    {
        id: "other",
        description: "Overig",
        enabled: false,
    },
    {
        id: "standBy",
        description: "StandBy",
        enabled: false,
    },
    {
        id: "kilometers",
        description: "Kilometers",
        enabled: false,
    },
];

export const months: IMonth[] = [
    {
        id: 1,
        description: "Januari",
    },
    {
        id: 2,
        description: "Februari",
    },
    {
        id: 3,
        description: "Maart",
    },
    {
        id: 4,
        description: "April",
    },
    {
        id: 5,
        description: "Mei",
    },
    {
        id: 6,
        description: "Juni",
    },
    {
        id: 7,
        description: "Juli",
    },
    {
        id: 8,
        description: "Augustus",
    },
    {
        id: 9,
        description: "September",
    },
    {
        id: 10,
        description: "Oktober",
    },
    {
        id: 11,
        description: "November",
    },
    {
        id: 12,
        description: "December",
    },
];

export const years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];

export const publicHolidays: string[] = [
    "2020, 1, 1",
    "2020, 4, 13",
    "2020, 4, 27",
    "2020, 5, 5",
    "2020, 5, 21",
    "2020, 6, 1",
    "2020, 12, 25",
    "2020, 12, 26",
    "2021, 1, 1",
    "2021, 4, 5",
    "2021, 4, 27",
    "2021, 5, 24",
    "2021, 5, 31",
    "2021, 12, 25",
    "2021, 12, 26",
    "2022, 1, 1",
    "2022, 4, 18",
    "2022, 4, 27",
    "2022, 5, 26",
    "2022, 6, 6",
    "2022, 12, 25",
    "2022, 12, 26",
    "2023, 1, 1",
    "2023, 4, 10",
    "2023, 4, 27",
    "2023, 5, 18",
    "2023, 5, 28",
    "2023, 12, 25",
    "2023, 12, 26",
];
