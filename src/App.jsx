import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die.jsx";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateDice());
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [rolling, setRolling] = useState(false);

  const won = dice.every((die) => die.isClicked && die.value === dice[0].value);
  const lost = !won && rollCount >= 15;

  function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
  }

  useEffect(() => {
    let interval;
    if (gameActive && !won && !lost) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameActive, won, lost]);

  function generateDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: i,
        value: getRandomValue(),
        isClicked: false,
      });
    }
    return newDice;
  }

  function generateNewVal() {
    setRolling(true);
    setTimeout(() => {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isClicked ? die : { ...die, value: getRandomValue() }
        )
      );
      setRollCount((prev) => prev + 1);
      setRolling(false);
    }, 300); // delay for animation
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isClicked: !die.isClicked } : die
      )
    );
  }

  function playAgain() {
    setDice(generateDice());
    setRollCount(0);
    setTimer(0);
    setGameActive(true);
  }

  useEffect(() => {
    if (won || lost) {
      setGameActive(false);
    }
  }, [won, lost]);

  let remark = "";
  if (won) {
    if (rollCount <= 5) remark = "🔥 Incredible!";
    else if (rollCount <= 10) remark = "🎯 Good job!";
    else if (rollCount <= 15) remark = "🙂 You still got it!";
  } else if (lost) {
    remark = "❌ You lost! Try again!";
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isClicked={dieObj.isClicked}
      hold={hold}
      id={dieObj.id}
      rolling={rolling}
    />
  ));

  return (
    <>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>

        <p className="roll-count">Rolls: {rollCount} / 15</p>

        <p className="timer">
          ⏱ Time: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </p>

        {(won || lost) && <h3 className="remark">{remark}</h3>}

        <div>
          <button
            className="roll-button"
            onClick={won || lost ? playAgain : generateNewVal}
          >
            {won || lost ? "Play again" : "Roll"}
          </button>
        </div>

        {won && (
          <>
            <Confetti />
            <h2 className="win-message">🎉 Congratulations! You won! 🎉</h2>
          </>
        )}
      </main>
    </>
  );
}

export default App;
