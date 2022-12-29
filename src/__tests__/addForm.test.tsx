import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AddUser } from "../pages/user/AddUser";

describe("ADD USER FORM FIELD TESTS", () => {
  beforeEach(()=> cleanup())
  test("FORM INPUTS IN DOCUMENT", () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );
    const firstName = screen.getByTestId("input-firstName");
    const lastName = screen.getByTestId("input-lastName");
    const email = screen.getByTestId("input-email");
    const mobile = screen.getByTestId("input-mobile");
    const dob = screen.getByTestId("input-dob");
    const gender = screen.getByTestId("input-gender");
    const country = screen.getByTestId("input-country");
    const state = screen.getByTestId("input-state");
    const city = screen.getByTestId("input-city");
    // const hobby = screen.getByTestId("input-hobby");
    const address = screen.getByTestId("input-address");
    const termsandconditions = screen.getByTestId("input-termsandconditions");
    const submitButtton = screen.getByTestId("button-form-submit");

    
    expect(firstName).toHaveAttribute("inputmode", "text");
    expect(firstName).toBeInTheDocument();

    expect(lastName).toHaveAttribute("inputmode", "text");
    expect(lastName).toBeInTheDocument();

    expect(email).toHaveAttribute("inputmode", "email");
    expect(email).toBeInTheDocument();

    expect(mobile).toHaveAttribute("inputmode", "numeric");
    expect(mobile).toBeInTheDocument();

    expect(dob).toHaveAttribute("name", "dob");
    expect(dob).toHaveAttribute("id", "datetime");
    expect(dob).toBeInTheDocument();

    expect(gender).toHaveAttribute("name", "gender");
    expect(gender).toBeInTheDocument();

    expect(country).toHaveAttribute("name", "country");
    expect(country).toBeInTheDocument();
  
    expect(state).toHaveAttribute("name", "state");
    expect(state).toBeInTheDocument();
  
    expect(city).toHaveAttribute("name", "city");
    expect(city).toBeInTheDocument();
  
    // expect(hobby).toBeInTheDocument();
  
    expect(address).toHaveAttribute("name", "address");
    expect(address).toBeInTheDocument();
  
    expect(termsandconditions).toHaveAttribute("checked");
    expect(termsandconditions).toBeInTheDocument();

    expect(submitButtton).toHaveAttribute("type", "submit");
    expect(submitButtton).toBeInTheDocument();
  });

  test.skip("VALID INPUT TEST", async () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );
    const firstName = screen.getByTestId("input-firstName");
    const lastName = screen.getByTestId("input-lastName");
    const email = screen.getByTestId("input-email");
    const mobile = screen.getByTestId("input-mobile");
    const dob = screen.getByTestId("input-dob");
    const gender = screen.getByTestId("input-gender");
    const country = screen.getByTestId("input-country");
    const state = screen.getByTestId("input-state");
    const city = screen.getByTestId("input-city");
    // const hobby = screen.getByTestId("input-hobby");
    const address = screen.getByTestId("input-address");
    const termsandconditions = screen.getByTestId("input-termsandconditions");
    const submitButtton = screen.getByTestId("button-form-submit");


    await userEvent.type(firstName, "Devbrat");

    await waitFor(()=> expect(firstName).toBe("Devbrat"));
  });

  test.skip("IN-VALID INPUT TEST", async () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );
    const firstName = screen.getByTestId("input-firstName");
    const lastName = screen.getByTestId("input-lastName");
    const email = screen.getByTestId("input-email");
    const mobile = screen.getByTestId("input-mobile");
    const dob = screen.getByTestId("input-dob");
    const gender = screen.getByTestId("input-gender");
    const country = screen.getByTestId("input-country");
    const state = screen.getByTestId("input-state");
    const city = screen.getByTestId("input-city");
    // const hobby = screen.getByTestId("input-hobby");
    const address = screen.getByTestId("input-address");
    const termsandconditions = screen.getByTestId("input-termsandconditions");


    await waitFor(()=> expect(firstName).toBe("Devbrat"));
    await waitFor(()=> expect(lastName).toBe("Kar"));

    // await waitFor(()=> expect(true).toBe(true));
  });
});
