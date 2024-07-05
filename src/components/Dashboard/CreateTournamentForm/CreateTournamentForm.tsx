import React, { useState } from "react";
import "./CreateTournamentForm.scss";

function CreateTournamentForm() {
  const [win, setWin] = useState(3);
  const [draw, setDraw] = useState(1);
  const [lost, setLost] = useState(0);

  const handleIncrement = (setter, value) => {
    setter(value + 1);
  };

  const handleDecrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  return (
    <form action="" className="tournament-form">
      <label htmlFor="name">
        <p>Namn</p>
        <input type="text" id="name" name="name" />
      </label>

      <label htmlFor="image">
        <p>Omslag</p>
        <input type="file" id="image" name="filename" />
      </label>

      <label htmlFor="rounds">
        <p>Omgångar</p>
        <input type="number" min="1" max="10" id="rounds" name="rounds" />
      </label>

      <label htmlFor="win">
        <p>Vinst</p>
        <section className="counter">
          <button type="button" onClick={() => handleDecrement(setWin, win)}>
            -
          </button>
          <input
            type="number"
            min="0"
            max="9"
            value={win}
            onChange={(e) => setWin(Number(e.target.value))}
            id="win"
            name="win"
          />
          <button type="button" onClick={() => handleIncrement(setWin, win)}>
            +
          </button>
        </section>
      </label>

      <label htmlFor="draw">
        <p>Oavgjort</p>
        <section className="counter">
          <button type="button" onClick={() => handleDecrement(setDraw, draw)}>
            -
          </button>
          <input
            type="number"
            min="0"
            max="9"
            value={draw}
            onChange={(e) => setDraw(Number(e.target.value))}
            id="draw"
            name="draw"
          />
          <button type="button" onClick={() => handleIncrement(setDraw, draw)}>
            +
          </button>
        </section>
      </label>

      <label htmlFor="lost">
        <p>Förlust</p>
        <section className="counter">
          <button type="button" onClick={() => handleDecrement(setLost, lost)}>
            -
          </button>
          <input
            type="number"
            min="0"
            max="9"
            value={lost}
            onChange={(e) => setLost(Number(e.target.value))}
            id="lost"
            name="lost"
          />
          <button type="button" onClick={() => handleIncrement(setLost, lost)}>
            +
          </button>
        </section>
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default CreateTournamentForm;
