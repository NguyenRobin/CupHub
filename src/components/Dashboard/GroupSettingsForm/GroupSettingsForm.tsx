"use client";

import React, { useEffect, useState } from "react";
import "./GroupSettingsForm.scss";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";

type Form = {
  image: string | null;
  rounds: number;
  win: number;
  draw: number;
  loss: number;
  teamsPerGroupAdvancing: number;
};

type KeyValue = "rounds" | "win" | "draw" | "loss" | "teamsPerGroupAdvancing";

function GroupSettingsForm() {
  const [groupSettings, setGroupSettings] = useState({
    teamAmount: null,
    totalGroups: null,
  });
  const [form, setForm] = useState<Form>({
    image: null,
    rounds: 1,
    win: 3,
    draw: 1,
    loss: 0,
    teamsPerGroupAdvancing: 1,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("addTeam");
      if (storage) {
        const products = JSON.parse(storage);
        setGroupSettings(products);
      }
    }
  }, []);

  const possiblePlayoffRounds = [2, 4, 8, 16, 32];
  const totalTeams = groupSettings.teamAmount!;
  const totalGroups = groupSettings.totalGroups!;
  const totalTeamsGoingToPlayoff = totalGroups * form.teamsPerGroupAdvancing;

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleIncrement = (key: KeyValue) => {
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

  const handleDecrement = (key: KeyValue) => {
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
    // if (form.name === "") return;

    setForm({
      image: null,
      rounds: 1,
      win: 3,
      draw: 1,
      loss: 0,
      teamsPerGroupAdvancing: 1,
    });

    if (
      possiblePlayoffRounds.includes(totalTeamsGoingToPlayoff) &&
      totalTeamsGoingToPlayoff <= totalTeams
    ) {
      localStorage.setItem("groupSettings", JSON.stringify(form));
    } else {
      window.alert(
        `Possible playoff schedule is ${possiblePlayoffRounds}. You have a total of ${totalTeams} teams. Which means please select a playoff round ${possiblePlayoffRounds.filter(
          (num) => num <= totalTeams
        )}`
      );
    }
  }

  const testGroups = [
    {
      group: "A",
      teams: ["team1", "team2", "team3", "team4"],
    },
    {
      group: "B",
      teams: ["team5", "team6", "team7"],
    },
    {
      group: "C",
      teams: ["team8", "team9", "team10"],
    },
  ];

  return (
    <>
      <CardRuleLayout title="Gruppspelsinställningar">
        <form
          onSubmit={handleOnSubmit}
          action=""
          className="group-settings-form"
        >
          {/* <label className="group-settings-form__label" htmlFor="image">
            <p>Omslag</p>
            <input
              type="file"
              id="image"
              name="filename"
              className="group-settings-form__label--upload-file"
            />
          </label> */}

          <label className="group-settings-form__label" htmlFor="rounds">
            <p>Antal möten</p>
            <section className="">
              <button
                type="button"
                onClick={() => {
                  if (form.rounds <= 1) return;
                  handleDecrement("rounds");
                }}
              >
                <span>-</span>
              </button>
              <span>{form.rounds}</span>
              <button
                type="button"
                onClick={() => {
                  if (form.rounds >= 1) return;
                  handleIncrement("rounds");
                }}
              >
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings-form__label" htmlFor="win">
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

          <label className="group-settings-form__label" htmlFor="draw">
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

          <label className="group-settings-form__label" htmlFor="lost">
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

          <label className="group-settings-form__label" htmlFor="lost">
            <p>Antal lag per grupp vidare till slutspel</p>
            <section className="">
              <button
                type="button"
                onClick={() => {
                  if (form.teamsPerGroupAdvancing <= 1) return;
                  handleDecrement("teamsPerGroupAdvancing");
                }}
              >
                <span>-</span>
              </button>
              <span>{form.teamsPerGroupAdvancing}</span>
              <button
                type="button"
                onClick={() => handleIncrement("teamsPerGroupAdvancing")}
              >
                <span>+</span>
              </button>
            </section>
          </label>

          <input
            type="submit"
            value="Nästa"
            className="group-settings-form__submit-btn"
          />
        </form>
      </CardRuleLayout>
    </>
  );
}

export default GroupSettingsForm;
