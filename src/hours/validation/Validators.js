import React from "react";
import Moment from "react-moment";

export default {
    validateWeekend(day) {
        const hours = this.getTotalHoursPerDay(day);
        if (day.isWeekend && hours > 0) {
            return (
                <>
                    <span>
                        Weet je zeker dat je in het weekend hebt gewerkt op:{" "}
                    </span>
                    <Moment format="DD/MM">{day.date}</Moment>
                </>
            );
        }
        return;
    },
    validateTotalHoursOfMonth(days) {
        let userTotalHours = 0;
        let potentialTotalHours = 0;
        days.forEach((day) => {
            if (day.isWeekend) {
                return;
            }
            userTotalHours += this.getTotalHoursPerDay(day);
            potentialTotalHours += 8;
        });

        if (userTotalHours < potentialTotalHours) {
            return (
                "Er zijn te weinig uren (" +
                userTotalHours +
                ") ingevuld ten opzichte van het aantal te werken uren deze maand (" +
                potentialTotalHours +
                "). Klopt dat?"
            );
        }

        if (userTotalHours > potentialTotalHours) {
            return (
                "Er zijn te veel uren (" +
                userTotalHours +
                ") ingevuld ten opzichte van het aantal te werken uren deze maand (" +
                potentialTotalHours +
                "). Klopt dat?"
            );
        }
        return;
    },
    getTotalHoursPerDay(day) {
        const output = Number(
            [
                Number(day.worked),
                Number(day.overtime),
                Number(day.sick),
                Number(day.holiday),
                Number(day.publicHoliday),
                Number(day.available),
                Number(day.education),
                Number(day.other),
                Number(day.standBy),
            ].reduce((a, b) => a + b, 0),
        );
        return output;
    },
};
