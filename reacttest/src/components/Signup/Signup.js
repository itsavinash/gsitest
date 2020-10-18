import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./Signup.css";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  userData;
  redirectToSignIn;
  constructor(props) {
    super(props);
    this.redirectToSignIn = false;
    this.state = {
      signupData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        isLoading: "",
      },
      msg: "",
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8100/api/auth/signup", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        console.log(response);
        if (response.data.status === 201) {
          this.setState({
            msg: response.data.statusText,
            signupData: {
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
          this.redirectToSignIn = true;
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.statusText });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 10000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/sign-in" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.signupData.password}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password_confirmation">Confirm Password</Label>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Enter password"
              value={this.state.signupData.password_confirmation}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-white">{this.state.msg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Sign Up
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
        </Form>
      </div>
    );
  }
}
