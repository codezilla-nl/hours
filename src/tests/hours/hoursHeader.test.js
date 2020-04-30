import React from "react";
import { unmountComponentAtNode } from "react-dom";
import HoursHeader from "../../hours/HoursHeader";
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
    mount = null;
});

describe("HoursHeader", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <HoursHeader
                handleInputChange={jest.fn()}
                client={"Codezilla"}
                project={"Hours"}
                expandColumns
                isTemplate={false}
                applyTemplate={jest.fn()}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("should only render client and project on template", () => {
        const client = "Codezilla";
        const project = "Hours";
        const wrapper = mount(
            <HoursHeader
                handleInputChange={jest.fn()}
                client={client}
                project={project}
                expandColumns
                isTemplate
                applyTemplate={jest.fn()}
            />,
        );

        const inputs = wrapper.find("input");
        expect(inputs).toHaveLength(2);

        const clientInput = inputs.find("#client");
        expect(clientInput.props().value).toEqual(client);

        const projectInput = inputs.find("#project");
        expect(projectInput.props().value).toEqual(project);
    });

    it("should call handleInputChange when one of the fields is edited", () => {
        const client = "Codezilla";
        const handleInput = jest.fn();
        const wrapper = mount(
            <HoursHeader
                handleInputChange={handleInput}
                client={client}
                project={"Hours"}
                expandColumns
                isTemplate={false}
                applyTemplate={jest.fn()}
            />,
        );

        const clientInput = wrapper.find("input").find("#client");

        clientInput.simulate("change", { target: { value: client } });

        expect(handleInput).toHaveBeenCalledWith("client", client);
    });

    it("should call applyTemplate function when button is clicked", () => {
        const applyTemplate = jest.fn();
        const wrapper = mount(
            <HoursHeader
                handleInputChange={jest.fn()}
                client={"Codezilla"}
                project={"Hours"}
                expandColumns
                isTemplate={false}
                applyTemplate={applyTemplate}
            />,
        );

        const headerMenuButton = wrapper.find("button");
        headerMenuButton.simulate("click");

        const button = wrapper
            .find("#headerMenu")
            .find("li")
            .find("#applyTemplate");

        expect(button.text()).toEqual("Pas template toe");

        button.simulate("click");

        expect(applyTemplate).toHaveBeenCalled();
    });

    it("should call getReport function when button is clicked", () => {
        const getReport = jest.fn();
        const wrapper = mount(
            <HoursHeader
                handleInputChange={jest.fn()}
                client={"Codezilla"}
                project={"Hours"}
                expandColumns
                isTemplate={false}
                getReport={getReport}
                applyTemplate={jest.fn()}
            />,
        );

        const headerMenuButton = wrapper.find("button");
        headerMenuButton.simulate("click");

        const button = wrapper
            .find("#headerMenu")
            .find("li")
            .find("#getInternReport");

        expect(button.text()).toEqual("Maak interne PDF");

        button.simulate("click");

        expect(getReport).toHaveBeenCalled();
    });
});
