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
                ") ingevuld ten opzichte van het aantal te werke uren deze maand (" +
                potentialTotalHours +
                ")."
            );
        }
        return;
    },
    getTotalHoursPerDay(day) {
        return Number(
            [
                day.worked,
                day.overtime,
                day.sick,
                day.holiday,
                day.publicHoliday,
                day.available,
                day.education,
                day.other,
                day.standBy,
            ].reduce((a, b) => a + b, 0),
        );
    },
};
