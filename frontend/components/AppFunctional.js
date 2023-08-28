import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
// Suggested initial states
const initialEmail = {
  email : ''
}
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

async function fetchData(aMessage) {
  const res = await axios.post("http://localhost:9000/api/result", aMessage);
  try {
    return res;
  } catch {
    console.error("This Did Not Work");
  }
}


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState([]);
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps);
  const [index1, setIndex1] = useState(initialIndex);
  const [coords, setCoords] = useState("2,2");
  const [count, setCount] = useState(0);

  const coordTemplate = [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ];

  function getXY(i) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let [x, y] = coordTemplate[i];
    setCoords(`${x},${y}`);
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setCoords("2,2");
    setIndex1(initialIndex);
    setCount(initialSteps)
    setMessage([]);
    setEmail(initialEmail);
  }

  function getNextIndex(direction, i) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (index1 >= 0) {
      if (direction === "RIGHT") {
        let count = 0;
        if (index1 === 2 || index1 === 8 || index1 === 5) {
          setCount(count + 1)
          setMessage(["You can't go right"])
          return index1;
        } else {
          setMessage([]);
          setCount(count + 1)
          return index1 + 1;
        }
      } else if (direction === "LEFT") {
        if (index1 === 0 || index1 === 3 || index1 === 6) {
          setMessage(["You can't go left"])
          return index1;
        } else {
          setMessage([]);
          setCount(()=> count + 1)
          return index1 - 1;
        }
      } else if (direction === "UP") {
        if (index1 === 0 || index1 === 1 || index1 === 2) {
          setMessage(["You can't go up"])
          return index1;
        } else {
          setMessage([]);
          setCount(()=> count + 1)
          return index1 - 3;
        }
      } else if (direction === "DOWN") {
        if (index1 === 6 || index1 === 7 || index1 === 8) {
          setMessage(["You can't go down"])
          return index1;
        } else {
          setMessage([]);
          setCount(()=> count + 1)
          return index1 + 3;
        }
      }
    }
  }

  function move(evt) {

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const name = evt.target.textContent;
    if (coordTemplate[index1] !== -1) {
      let result = getNextIndex(name, index1);
      getXY(result)
      setIndex1(result)
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const {value} = evt.target;
    setEmail({...email, email : value})
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // Use a POST request to send a payload to the server.
    let object =  { "x": coordTemplate[index1][0], "y": coordTemplate[index1][1], "steps": count, "email": email.email };
    axios.post("http://localhost:9000/api/result",object)
    .then((res)=> {
    setMessage([res.data.message])
    }) 
    .catch(err=> {
      setMessage(["Ouch: email must be a valid email"])
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinate : ({coords})</h3>
        <h3 id="steps">You moved {count} {count > 1 ? "times" : "time"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === index1 ? ' active' : ''}`}>
              {idx === index1 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message.length > 0 && message[0]}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange = {onChange} value = {email.email} id="email" type="email" placeholder="type email" />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

