import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./Home.css";

export default class Home extends Component {
  state = {
    navigate: false,
  };

  gameData = "";
  userData = "";

  constructor() {
    super();
    this.gameData = JSON.parse(localStorage.getItem("gameData"));
    console.log(this.gameData);
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  renderTableData() {
    return this.gameData.map((games, index) => {
      const { id, result, created_at } = games; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{result}</td>
          <td>{created_at}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>S.No.</th>
        <th>Result</th>
        <th>Date</th>
      </tr>
    );
  }

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };

  render() {
    const { navigate } = this.state;
    console.log(navigate);
    if (navigate) {
      return <Redirect to="/sign-in" push={true} />;
    }
    return (
      <div className="container">
        <h3> HomePage</h3>
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome, {this.userData.user.name}. </h5> You have Logged in
            successfully.
            <h5>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/game"
                exact
              >
                Start Game
              </NavLink>
            </h5>
          </div>
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler}
            >
              Logout
            </Button>
          </div>
        </div>
        <div>
          <h3 id="title">Game Results</h3>
          <table id="games">
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
