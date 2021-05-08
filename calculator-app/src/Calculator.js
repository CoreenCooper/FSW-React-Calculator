import React from "react";
import "./Calculator.css";

class Calculator extends React.Component {
  state = {
    previousDisplay: "",
    operation: "",
    display: "0",
    sign: "positive",
    history: "",
  };

  // previousDisplay shows up when typed and not when operand is type
  // need to handle multi digit after operand is clicked
  // if (operation !== "" \\ operation !== "="){
  // this.setState((prevState) => ({
  //   display: prevState.display + userInput,
  //   history: prevState.history + userInput,
  // }));
  // }

  handleDigit = (userInput) => {
    const { display, operation } = this.state;
    if (operation === "=") {
      this.setState({
        history: "",
      });
    }

    display === "0"
      ? this.setState({
          display: userInput,
          history: userInput,
        })
      : this.setState((prevState) => ({
          display: userInput,
          history: prevState.history + userInput,
        }));
  };

  handleOperand = (userInput) => {
    const { operation, display } = this.state;
    if (operation !== "") {
      this.setState({ operation: userInput });
    } else {
      this.setState((prevState) => ({
        operation: userInput,
        history: prevState.display + userInput,
        previousDisplay: display,
      }));
    }
  };

  handleEqual = () => {
    const { previousDisplay, display, operation } = this.state;
    // add check for commas(,)
    this.setState((prevState) => ({
      previousDisplay: "",
      history: prevState.history + "=",
      operation: "=",
    }));
    switch (operation) {
      case "+":
        this.setState({
          display: Number(previousDisplay) + Number(display),
        });
        break;
      case "-":
        this.setState({
          display: Number(previousDisplay) - Number(display),
        });
        break;
      case "x":
        this.setState({
          display: Number(previousDisplay) * Number(display),
        });
        break;
      case "÷":
        this.setState({
          display: Number(previousDisplay) / Number(display),
        });
        break;
      default:
        break;
    }
  };

  // prevent more than two decimal places after the decimal
  handleDecimal = () => {
    const { previousDisplay } = this.state;
    if (!previousDisplay.includes(".")) {
      this.setState((prevState) => ({
        previousDisplay: prevState.previousDisplay + ".",
        display: prevState.display + ".",
        history: prevState.history + ".",
      }));
    }
  };

  // add 0 after deleting all numbers
  // error if negative number
  handleDelete = () => {
    const { previousDisplay, display, history } = this.state;
    if (previousDisplay === "") {
      this.setState({
        previousDisplay: "",
      });
    } else {
      this.setState({
        previousDisplay: previousDisplay.slice(0, -1),
        display: display.slice(0, -1),
        history: history.slice(0, -1),
      });
    }
  };

  handleAllClear = () => {
    this.setState({
      previousDisplay: "",
      display: "0",
      history: "",
      operation: "",
      sign: "positive",
    });
  };

  // codesmell
  handleSign = () => {
    const { sign, previousDisplay, history, display } = this.state;
    if (previousDisplay !== "") {
      if (sign === "positive") {
        this.setState({
          sign: "negative",
          previousDisplay: previousDisplay * -1,
          display: display * -1,
          history: history * -1,
        });
      } else {
        this.setState({
          sign: "positive",
          previousDisplay: previousDisplay * -1,
          display: display * -1,
          history: history * -1,
        });
      }
    }
  };

  handleZero = () => {
    const { previousDisplay } = this.state;
    if (previousDisplay !== "0") {
      this.setState((prevState) => ({
        previousDisplay: prevState.previousDisplay + "0",
      }));
    }
  };

  render() {
    const { previousDisplay, display, history } = this.state;
    return (
      <section id="calculator">
        <p id="history">{history} - history</p>
        <p id="previousDisplay">{previousDisplay} - previousDisplay</p>
        <p id="display">{display} - Display</p>
        <button className="one" onClick={() => this.handleDigit("1")}>
          1
        </button>
        <button className="two" onClick={() => this.handleDigit("2")}>
          2
        </button>
        <button className="three" onClick={() => this.handleDigit("3")}>
          3
        </button>
        <button className="four" onClick={() => this.handleDigit("4")}>
          4
        </button>
        <button className="five" onClick={() => this.handleDigit("5")}>
          5
        </button>
        <button className="six" onClick={() => this.handleDigit("6")}>
          6
        </button>
        <button className="seven" onClick={() => this.handleDigit("7")}>
          7
        </button>
        <button className="eight" onClick={() => this.handleDigit("8")}>
          8
        </button>
        <button className="nine" onClick={() => this.handleDigit("9")}>
          9
        </button>
        <button className="zero" onClick={this.handleZero}>
          0
        </button>
        <button className="plus" onClick={() => this.handleOperand("+")}>
          +
        </button>
        <button className="minus" onClick={() => this.handleOperand("-")}>
          -
        </button>
        <button className="divide" onClick={() => this.handleOperand("÷")}>
          ÷
        </button>
        <button className="multiply" onClick={() => this.handleOperand("x")}>
          x
        </button>
        <button className="decimal" onClick={this.handleDecimal}>
          .
        </button>
        <button className="allClear" onClick={this.handleAllClear}>
          AC
        </button>
        <button className="delete" onClick={this.handleDelete}>
          DEL
        </button>
        <button className="sign" onClick={this.handleSign}>
          +/-
        </button>
        <button className="equal" onClick={this.handleEqual}>
          =
        </button>
      </section>
    );
  }
}

export default Calculator;
