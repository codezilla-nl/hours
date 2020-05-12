import React from "react";
import { unmountComponentAtNode } from "react-dom";
import HoursCell from "./HoursCell.component";
import { mockDays, mockDaysChanged } from "../hours.mock";
import { createShallow, createMount } from "@material-ui/core/test-utils";

let wrapper = null;
let shallow;
let mount;
beforeEach(() => {
    // setup a DOM element as a render target
    wrapper = document.createElement("tr");
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

describe("HoursCell", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <HoursCell
                row={mockDays[0]}
                column={"worked"}
                handleChange={() => {}}
                save={() => {}}
                days={mockDays}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("should call handleChange when cell is edited", () => {
        const onChange = jest.fn();
        const onSave = jest.fn();
        const wrapper = mount(
            <HoursCell
                row={mockDays[0]}
                column={"worked"}
                handleChange={onChange}
                save={onSave}
                days={mockDays}
            />,
        );
        const input = wrapper.find("input");
        input.simulate("blur", { target: { value: 8 } });
        expect(onChange).toHaveBeenCalledWith("days", mockDaysChanged);
        expect(onSave).toHaveBeenCalled();
    });
});
