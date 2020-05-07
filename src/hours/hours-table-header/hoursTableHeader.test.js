import React from "react";
import { unmountComponentAtNode } from "react-dom";
import HoursTableHeader from "./HoursTableHeader.component";
import { mockColumns } from "../hours.mock";
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

describe("HoursTableHeader", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(<HoursTableHeader expandColumns />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should show same amount of columns as mockdata if expandColumns equals true", () => {
        const wrapper = mount(<HoursTableHeader expandColumns />);

        const cells = wrapper.find("th");
        // add 2 for empty starter cell and toelichtingen
        expect(cells).toHaveLength(mockColumns.length + 3);
        expect(cells.last().text()).toEqual("Toelichting");
    });
});
