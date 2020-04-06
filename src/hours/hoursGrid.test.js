import React from "react";
import { unmountComponentAtNode } from "react-dom";

import HoursGrid from "./hoursGrid";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Render table with 5 rows", () => {
    const days = null;
    const mockDays = [
        {
            day: 1,
            date: new Date(2020, 3, 1),
            worked: "",
            overtime: "",
            sick: "",
            holiday: "",
            publicHoliday: "",
            available: "",
            education: "",
            other: "",
            standBy: "",
            kilometers: "",
            explanation: "",
        },
        {
            day: 2,
            date: new Date(2020, 3, 2),
            worked: "",
            overtime: "",
            sick: "",
            holiday: "",
            publicHoliday: "",
            available: "",
            education: "",
            other: "",
            standBy: "",
            kilometers: "",
            explanation: "",
        },
        {
            day: 3,
            date: new Date(2020, 3, 3),
            worked: "",
            overtime: "",
            sick: "",
            holiday: "",
            publicHoliday: "",
            available: "",
            education: "",
            other: "",
            standBy: "",
            kilometers: "",
            explanation: "",
        },
        {
            day: 4,
            date: new Date(2020, 3, 4),
            worked: "",
            overtime: "",
            sick: "",
            holiday: "",
            publicHoliday: "",
            available: "",
            education: "",
            other: "",
            standBy: "",
            kilometers: "",
            explanation: "",
        },
        {
            day: 5,
            date: new Date(2020, 3, 5),
            worked: "",
            overtime: "",
            sick: "",
            holiday: "",
            publicHoliday: "",
            available: "",
            education: "",
            other: "",
            standBy: "",
            kilometers: "",
            explanation: "",
        },
    ];

    const container = shallow(
        <HoursGrid
            expandColumns="true"
            days={mockDays}
            handleChange={() => {}}
            save={() => {}}
            isTemplate="false"
        />,
    );

    const table = container.find("table");

    // expect(table).toHaveLength(1);
});
