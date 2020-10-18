import React, { Component } from "react";
import { Progress } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Game.css";

const MAX_VAlUE = 100;

export default class Game extends Component {
  attackMin = 1;
  attackMax = 10;
  powAttackmin = 10;
  powAttackmax = 30;
  healMin = 20;
  healMax = 80;
  finalResult = 0;
  result = 0;
  constructor() {
    super();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.userData);
    this.state = {
      maxPlayerScore: MAX_VAlUE,
      playerScore: MAX_VAlUE,
      maxDragonScore: MAX_VAlUE,
      dragonScore: MAX_VAlUE,
      surrender: 0,
      comment: "Game Started.",
      result: 0,
      isLoading: false,
      redirect: false,
      finalResult: 0,
    };
  }

  postgameResult() {
    this.setState({ isLoading: true });
    console.log(this.state);
    setTimeout(function () {}, 3000);
    console.log(this.state);
    const config = {
      headers: { Authorization: `Bearer ${this.userData.access_token}` },
    };

    axios
      .post(
        "http://localhost:8100/api/auth/add-game",
        {
          result: this.result,
        },
        config
      )
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.status === 200) {
          localStorage.setItem("gameData", JSON.stringify(response.data.games));
          this.setState({
            msg: response.statusText,
            redirect: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  attack(e) {
    if (this.state.finalResult === 1) {
      return;
    }
    if (
      this.state.dragonScore <= 0 &&
      this.state.playerScore <= 0 &&
      this.state.finalResult === 0
    ) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Tied",
          finalResult: 1,
          result: 0,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    } else if (this.state.dragonScore <= 0 && this.state.finalResult === 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Won",
          finalResult: 1,
          result: 1,
        };
      });
      this.finalResult = 1;
      this.result = 1;
      this.postgameResult();
      return;
    } else if (this.state.playerScore <= 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Lost",
          finalResult: 1,
          result: 2,
        };
      });
      this.finalResult = 1;
      this.result = 2;
      this.postgameResult();
      return;
    }
    this.setState((state) => {
      return {
        playerScore: this.randGen(
          state.playerScore,
          "-",
          this.attackMin,
          this.attackMax
        ),
        dragonScore: this.randGen(
          state.dragonScore,
          "-",
          this.attackMin,
          this.attackMax
        ),
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          " Dragon Attack the [" +
          this.userData.user.name +
          "] " +
          state.playerScore +
          ".",
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          "[" +
          this.userData.user.name +
          "]" +
          " Attack the Dragon " +
          state.dragonScore +
          ".",
      };
    });
  }

  powAttack(e) {
    console.log(this.state);
    if (this.state.finalResult === 1) {
      return;
    }
    if (
      this.state.dragonScore <= 0 &&
      this.state.playerScore <= 0 &&
      this.state.finalResult === 0
    ) {
      console.log("a");
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Tied",
          finalResult: 1,
          result: 0,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    } else if (this.state.dragonScore <= 0 && this.state.finalResult === 0) {
      console.log("b");
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Won",
          finalResult: 1,
          result: 1,
        };
      });
      this.finalResult = 1;
      this.result = 1;
      this.postgameResult();
      return;
    } else if (this.state.playerScore <= 0) {
      console.log("c");
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Lost",
          finalResult: 1,
          result: 2,
        };
      });
      this.finalResult = 1;
      this.result = 2;
      this.postgameResult();
      return;
    }
    this.setState((state) => {
      return {
        playerScore: this.randGen(
          state.playerScore,
          "-",
          this.powAttackmin,
          this.powAttackmax
        ),
        dragonScore: this.randGen(
          state.dragonScore,
          "-",
          this.powAttackmin,
          this.powAttackmax
        ),
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          " Dragon Attack the [" +
          this.userData.user.name +
          "] " +
          state.playerScore +
          ".",
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          "[" +
          this.userData.user.name +
          "]" +
          " Attack the Dragon " +
          state.dragonScore +
          ".",
      };
    });
  }

  heal(e) {
    if (this.state.finalResult === 1) {
      return;
    }
    if (this.state.dragonScore <= 0 && this.state.playerScore <= 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Tied",
          finalResult: 1,
          result: 0,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    } else if (this.state.dragonScore <= 0 && this.state.finalResult === 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Won",
          finalResult: 1,
          result: 1,
        };
      });
      this.finalResult = 1;
      this.result = 1;
      this.postgameResult();
      return;
    } else if (this.state.playerScore <= 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Lost",
          finalResult: 1,
          result: 2,
        };
      });
      this.finalResult = 1;
      this.result = 2;
      this.postgameResult();
      return;
    }
    if (this.state.playerScore >= 100) {
      return;
    }
    this.setState((state) => {
      if (
        state.playerScore +
          parseInt(
            this.healMin + Math.random() * (this.healMax - this.healMin),
            10
          ) >
        100
      ) {
        return { playerScore: 100 };
      }
      return {
        playerScore: this.randGen(
          state.playerScore,
          "+",
          this.healMin,
          this.healMax
        ),
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          "[" +
          this.userData.user.name +
          "]" +
          " Healed by " +
          state.playerScore +
          ".",
      };
    });
    this.setState((state) => {
      return {
        playerScore: this.randGen(
          state.playerScore,
          "-",
          this.powAttackmin,
          this.powAttackmax
        ),
      };
    });
    this.setState((state) => {
      return {
        comment:
          state.comment +
          "[" +
          this.userData.user.name +
          "]" +
          " Infected by Dragon " +
          state.dragonScore +
          ".",
      };
    });
  }

  surrender(e) {
    if (this.state.finalResult === 1) {
      return;
    }
    if (this.state.dragonScore <= 0 && this.state.playerScore <= 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Tied",
          finalResult: 1,
          result: 0,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    } else if (this.state.dragonScore <= 0 && this.state.finalResult === 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Won",
          finalResult: 1,
          result: 1,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    } else if (this.state.playerScore <= 0) {
      this.setState((state) => {
        return {
          comment: state.comment + "[" + this.userData.user.name + "] Lost",
          finalResult: 1,
          result: 2,
        };
      });
      this.finalResult = 1;
      this.result = 0;
      this.postgameResult();
      return;
    }
    this.setState((state) => {
      return {
        surrender: 1,
        finalResult: 1,
        result: 2,
        comment: state.comment + "[" + this.userData.user.name + "] Lost",
      };
    });
    this.finalResult = 1;
    this.result = 2;
    this.postgameResult();
    return;
  }

  randGen(score, operator, min, max) {
    console.log(score, operator, min, max);
    if (operator === "-") {
      let data = score - parseInt(min + Math.random() * (max - min), 10);
      if (data <= 0) {
        return 0;
      } else {
        return data;
      }
    } else {
      let data = score + parseInt(min + Math.random() * (max - min), 10);
      if (data >= 100) {
        return 100;
      } else {
        return data;
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center">Dragon Health</h3>
            <div className="progress">
              <Progress
                className="progress-bar progress-bar-striped progress-bar-animated"
                animated
                color="danger"
                min={0}
                max={this.state.maxDragonScore}
                value={this.state.dragonScore}
              >
                {this.state.dragonScore + "%"}
              </Progress>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Player Health</h3>
            <div className="progress">
              <Progress
                className="progress-bar progress-bar-striped progress-bar-animated"
                animated
                color="success"
                min={0}
                max={this.state.maxPlayerScore}
                value={this.state.playerScore}
              >
                {this.state.playerScore + "%"}
              </Progress>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={(e) => {
                this.attack(e);
              }}
            >
              Attack
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={(e) => {
                this.powAttack(e);
              }}
            >
              Power-Attack
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={(e) => {
                this.heal(e);
              }}
            >
              Heal
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={(e) => {
                this.surrender(e);
              }}
            >
              Give Up
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-center text-danger lead">{this.state.comment}</p>
          </div>
        </div>
      </div>
    );
  }
}
