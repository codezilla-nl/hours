import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { mockDays, mockWeekend } from "./hours.mock";
import HoursGrid from "../../hours/hoursGrid";
import { createShallow, createMount } from "@material-ui/core/test-utils";

let wrapper = null;
let shallow;
let mount;
beforeEach(() => {
    // setup a DOM element as a render target
    wrapper = document.createElement("div");
    document.body.appendChild(wrapper);
    mount = createMount();
    shallow = createShallow();
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(wrapper);
    wrapper.remove();
    wrapper = null;
    shallow = null;
});

describe("HoursGrid", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <HoursGrid
                expandColumns="true"
                days={mockDays}
                handleChange={() => {}}
                save={() => {}}
                isTemplate={false}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should render a table according to days passed in props", () => {
        const wrapper = mount(
            <HoursGrid
                expandColumns="true"
                days={mockDays}
                handleChange={() => {}}
                save={() => {}}
                isTemplate={false}
            />,
        );

        const table = wrapper.find("table");
        expect(table).toHaveLength(1);
        const row = wrapper.find("tr");
        // add 2 for header row and total row
        expect(row).toHaveLength(mockDays.length + 2);
    });

    it("should call handleChange function when explanation cell is edited", () => {
        const onBlur = jest.fn();
        const wrapper = mount(
            <HoursGrid
                expandColumns="true"
                days={mockDays}
                handleChange={onBlur}
                save={() => {}}
                isTemplate={false}
            />,
        );
        const explanations = wrapper.find("input");
        explanations.first().simulate("blur");

        expect(onBlur).toHaveBeenCalled();
    });

    it("should add highlight for weekend day based on date when not a template", () => {
        const wrapper = shallow(
            <HoursGrid
                expandColumns="true"
                days={mockWeekend}
                handleChange={() => {}}
                save={() => {}}
                isTemplate={false}
            />,
        );

        const weekend = wrapper.find(".highlight");
        expect(weekend).toHaveLength(mockWeekend.length);
    });

    it("should add highlight for weekend based on day nr when template", () => {
        const wrapper = shallow(
            <HoursGrid
                expandColumns="true"
                days={mockWeekend}
                handleChange={() => {}}
                save={() => {}}
                isTemplate
            />,
        );

        const weekendDay = wrapper.find(".highlight");
        expect(weekendDay).toHaveLength(0);
    });
});
