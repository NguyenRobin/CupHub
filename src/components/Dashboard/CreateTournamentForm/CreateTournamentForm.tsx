"use client";

import React, { useState } from "react";
import "./CreateTournamentForm.scss";
import Image from "next/image";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import AddTeam from "../AddTeam/AddTeam";
import TournamentInfo from "../TournamentInfo/TournamentInfo";

type Form = {
  name: string;
  image: string | null;
  rounds: number;
  win: number;
  draw: number;
  loss: number;
};

type KeyValues = "rounds" | "win" | "draw" | "loss";

function CreateTournamentForm() {
  const [form, setForm] = useState<Form>({
    name: "",
    image: null,
    rounds: 2,
    win: 3,
    draw: 1,
    loss: 0,
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleIncrement = (key: KeyValues) => {
    if (form[key] === 9) return;
    setForm((prevState) => {
      if (typeof prevState[key] === "number") {
        return {
          ...prevState,
          [key]: Number(prevState[key]) + 1,
        };
      }
      return prevState;
    });
  };

  const handleDecrement = (key: KeyValues) => {
    if (form[key] === 0) return;

    setForm((prevState) => {
      if (typeof prevState[key] === "number") {
        return {
          ...prevState,
          [key]: prevState[key] - 1,
        };
      }
      return prevState;
    });
  };

  function handleOnSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    if (form.name === "") return;

    setForm({
      name: "",
      image: null,
      rounds: 2,
      win: 3,
      draw: 1,
      loss: 0,
    });
  }
  return (
    <>
      <TournamentInfo />
      <AddTeam />
      <CardRuleLayout title="Gruppspelsinställningar">
        <form onSubmit={handleOnSubmit} action="" className="tournament-form">
          {/* <label className="tournament-form__label" htmlFor="name">
            <p>Namn</p>
            <input
              type="text"
              id="name"
              name="name"
              minLength={3}
              value={form.name}
              onChange={handleOnChange}
            />
          </label> */}

          {/* <label className="tournament-form__label" htmlFor="image">
            <p>Omslag</p>
            <input
              type="file"
              id="image"
              name="filename"
              className="tournament-form__label--upload-file"
            />
          </label> */}

          <label className="tournament-form__label" htmlFor="rounds">
            <p>Antal möten</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("rounds")}>
                <span>-</span>
              </button>
              <span>{form.rounds}</span>
              <button type="button" onClick={() => handleIncrement("rounds")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="tournament-form__label" htmlFor="win">
            <p>Poäng för vinst</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("win")}>
                <span>-</span>
              </button>

              <span>{form.win}</span>
              <button type="button" onClick={() => handleIncrement("win")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="tournament-form__label" htmlFor="draw">
            <p>Poäng för oavgjort</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("draw")}>
                <span>-</span>
              </button>

              <span>{form.draw}</span>
              <button type="button" onClick={() => handleIncrement("draw")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="tournament-form__label" htmlFor="lost">
            <p>Poäng för förlust</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("loss")}>
                <span>-</span>
              </button>
              <span>{form.loss}</span>
              <button type="button" onClick={() => handleIncrement("loss")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <input
            type="submit"
            value="Nästa"
            className="tournament-form__submit-btn"
          />
        </form>
      </CardRuleLayout>
    </>
  );
}

export default CreateTournamentForm;
