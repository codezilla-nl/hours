import IHours from "../../common/interfaces/IHours";
import IDay from "../../common/interfaces/IDay";
import IHoursColumn from "../../hours/hours-constants/IHoursColumn";

import { columns } from "../../hours/hours-constants/hoursConstants.component";

export default {
    getCSV(data: IHours): void {
        const csvColumns = columns;
        columns.unshift({
            description: "Dag",
            id: "day",
            enabled: true,
        });
        columns.push({
            description: "Toelichting",
            id: "explanation",
            enabled: true,
        });

        const header = csvColumns
            .map((column: IHoursColumn) => column.description)
            .join(",");
        const csvData = data.days.map((day: IDay) => {
            const row = csvColumns
                .map((column: IHoursColumn) => day[column.id].toString())
                .join(",");
            return row;
        });
        csvData.unshift(header);

        const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            "uren-intern - " + data.profile.displayName + ".csv",
        );
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file.
    },
};
