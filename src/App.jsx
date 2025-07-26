import { useState } from "react";
import "./App.css";
import Die from "./Die.jsx";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateDice());

  const won = dice.every((die) => die.isHeld && die.value === dice[0].value);

  function getRandomValue() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function generateDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: i,
        value: getRandomValue(),
        isHeld: false,
      });
    }
    return newDice;
  }

  function generateNewVal() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: getRandomValue() }
      )
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function playAgain() {
    setDice(generateDice());
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
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

        <div>
          <button
            className="roll-button"
            onClick={won ? playAgain : generateNewVal}
          >
            {won ? "Play again" : "Roll"}
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
