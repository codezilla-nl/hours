import React from "react";
import { unmountComponentAtNode } from "react-dom";
import HoursContainer from "./HoursContainer.component";
import { mockProfile } from "../hours.mock";
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

describe("HoursContainer", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <HoursContainer profile={mockProfile} type="month" />,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
