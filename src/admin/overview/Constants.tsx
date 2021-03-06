import IAdminOverviewColumn from "../../common/interfaces/IAdminOverviewColumn";

export const columns: IAdminOverviewColumn[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Naam",
    },
    {
        id: "client",
        numeric: false,
        disablePadding: false,
        label: "Klant",
    },
    {
        id: "project",
        numeric: false,
        disablePadding: false,
        label: "Project",
    },
    {
        id: "approved",
        numeric: false,
        disablePadding: true,
        label: "Akkoord",
    },
    {
        id: "worked",
        numeric: true,
        disablePadding: true,
        label: "Gewerkt",
    },
    {
        id: "overtime",
        numeric: true,
        disablePadding: true,
        label: "Overwerk",
    },
    {
        id: "sick",
        numeric: true,
        disablePadding: true,
        label: "Ziek",
    },
    {
        id: "holiday",
        numeric: true,
        disablePadding: true,
        label: "Verlof",
    },
    {
        id: "publicHoliday",
        numeric: true,
        disablePadding: true,
        label: "Feestdag",
    },
    {
        id: "available",
        numeric: true,
        disablePadding: true,
        label: "Beschikbaar",
    },
    {
        id: "education",
        numeric: true,
        disablePadding: true,
        label: "Opleiding",
    },
    {
        id: "other",
        numeric: true,
        disablePadding: true,
        label: "Overig",
    },
    {
        id: "standBy",
        numeric: true,
        disablePadding: true,
        label: "stand-by",
    },
    {
        id: "kilometers",
        numeric: true,
        disablePadding: false,
        label: "Km",
    },
];
