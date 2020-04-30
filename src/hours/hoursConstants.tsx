import IHoursColumn from "../common/interfaces/IHoursColumn";
import IMonth from "../common/interfaces/IMonth";

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
