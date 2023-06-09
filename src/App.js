import React, { useState } from 'react';
import './App.css'
import stoneImg from './assets/stone.png';
import scissorsImg from './assets/scissors.png';
import paperImg from './assets/paper.png';

const CHOICES = [
  { name: 'stone', image: stoneImg },
  { name: 'scissors', image: scissorsImg },
  { name: 'paper', image: paperImg }
];

// const RESULT_MESSAGES = {
//   win: 'You win!',
//   lose: 'You lose!',
//   draw: 'It\'s a draw!',
// };

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [computerScore, setComputerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  // const [isComputing, setIsComputing] = useState(false);

  const makeChoice = (choice) => {
    const computerChoice = getRandomChoice();
    const result = getResult(choice, computerChoice);
    updateScores(result);

    setComputerChoice(computerChoice);
    setResult(result);
  };

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
  };

  const getResult = (userChoice, computerChoice) => {
    if (userChoice.name === computerChoice.name) {
      return 'draw';
    } else if (
      (userChoice.name === 'stone' && computerChoice.name === 'scissors') ||
      (userChoice.name === 'scissors' && computerChoice.name === 'paper') ||
      (userChoice.name === 'paper' && computerChoice.name === 'stone')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  };

  const updateScores = (result) => {
    if (result === 'win') {
      setUserScore(userScore + 1);
    } else if (result === 'lose') {
      setComputerScore(computerScore + 1);
    } else {
      setDrawScore(drawScore + 1);
    }
  };

  const restartGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setComputerScore(0);
    setDrawScore(0);
    setUserScore(0);
  };

  return (
    <div className="App">
      <div className="restartbtn">
        <button  onClick={restartGame}>Restart</button>
      </div>
      <div className="game-container">
        <div className="computer-choice">
          {computerChoice && (
            <>              
              <img src={computerChoice.image} alt={computerChoice.name} />
            </>
          )}
        </div>
        <div className="choices">
          {CHOICES.map((choice) => (
            <button key={choice.name} onClick={() => makeChoice(choice)}>
              <img src={choice.image} alt={choice.name} />
            </button>
          ))}
        </div>
        <div className="scoreboard">
          <p>{computerScore}</p>
          <p>{drawScore}</p>
          <p>{userScore}</p>
        </div>
      </div>
    </div>
  );
};

export default App;