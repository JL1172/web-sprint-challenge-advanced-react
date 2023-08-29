import React from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}
const coordTemplate = [
  [1, 1], [2, 1], [3, 1],
  [1, 2], [2, 2], [3, 2],
  [1, 3], [2, 3], [3, 3]
];
export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      email: "",
      count: 0,
      index: 4,
      coords: "2,2",
      valid: "",
    }
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = (i) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let [x, y] = coordTemplate[i];
    console.log(x)
    this.setState({ ...this.state, coords: this.state.coords = `${x},${y}` });
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ ...this.state, email: "", coords: "2,2", index: 4, message: [], count: 0 })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (this.state.index >= 0) {
      if (direction === "RIGHT") {
        if (this.state.index === 2 || this.state.index === 8 || this.state.index === 5) {
          this.setState({ message: this.state.message = "You can't go right" })
          return this.state.index;
        } else {
          this.setState({ ...this.state, count: this.state.count += 1, message: this.state.message = "" })
          return this.state.index + 1;
        }
      } else if (direction === "LEFT") {
        if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
          this.setState({ message: this.state.message = "You can't go left" })
          return this.state.index;
        } else {
          this.setState({ ...this.state, count: this.state.count += 1, message: this.state.message = "" })
          return this.state.index - 1;
        }
      } else if (direction === "UP") {
        if (this.state.index === 0 || this.state.index === 1 || this.state.index === 2) {
          this.setState({ message: this.state.message = "You can't go up" })
          return this.state.index;
        } else {
          this.setState({ ...this.state, count: this.state.count += 1, message: this.state.message = "" })
          return this.state.index - 3;
        }
      } else if (direction === "DOWN") {
        if (this.state.index === 6 || this.state.index === 7 || this.state.index === 8) {
          this.setState({ message: this.state.message = "You can't go down" });
          return this.state.index;
        } else {
          this.setState({ ...this.state, count: this.state.count += 1, message: this.state.message = "" })
          return this.state.index + 3;
        }
      }
    }
  }


  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const name = evt.target.textContent;
    if (coordTemplate[this.state.index] !== -1) {
      let result = this.getNextIndex(name, this.state.index);
      this.getXY(result)
      this.setState({ ...this.state, index: (result) })
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    this.setState({ ...this.state, email: value })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    if (!this.state.email) {
      this.setState({ message: this.state.message = "Ouch: email is required" });
    } else {
      let object =
      {
        "x": coordTemplate[this.state.index][0], "y": coordTemplate[this.state.index][1],
        "steps": this.state.count, "email": this.state.email
      };
      axios.post("http://localhost:9000/api/result", object)
        .then((res) => {
          // this.setState({ ...this.state, message: this.state.message = res.data.message })
          if (email !== "foo@bar.baz") {
            this.setState({email : this.state.email = "", index : this.state.index = 4,
            message: this.state.message = res.data.message
          })} else {
            this.setState({index : this.state.index = 4})
          }
        })
        .catch(err => {
          if (this.state.email === "foo@bar.baz") {
              this.setState({message : this.state.message = err.response.data.message,
                email : this.state.email = "", index : this.state.index = 4})
          } else {
            this.setState({ ...this.state, message: ("Ouch: email must be a valid email") })
          }
        })
        .finally(()=> {

        })
    }
  }
  // Use a POST request to send a payload to the server.

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinate : ({this.state.coords})</h3>
          <h3 id="steps">You moved {this.state.count} {this.state.count > 1 ? "times" : "time"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
