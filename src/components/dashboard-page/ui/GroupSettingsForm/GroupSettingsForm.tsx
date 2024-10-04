"use client";

import React, { useContext, useEffect, useState } from "react";
import "./GroupSettingsForm.scss";
import CardRuleLayout from "../CardRule/CardRule";

import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import useFormContext from "../../../../hooks/useFormContext";

function GroupSettingsForm() {
  const {
    win,
    draw,
    loss,
    rounds,
    teams,
    total_groups,
    teamsPerGroupAdvancing,
    handleIncrement,
    handleDecrement,
    setPage,
  } = useFormContext();

  const possiblePlayoffRounds = [2, 4, 8, 16, 32];
  const totalTeams = teams.length!;
  const totalGroups = total_groups!;
  const totalTeamsGoingToPlayoff = totalGroups * teamsPerGroupAdvancing!;

  const handleBack = () => setPage((prev) => prev - 1);
  const handleNext = () => setPage((prev) => prev + 1);

  function handleOnSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    if (
      possiblePlayoffRounds.includes(totalTeamsGoingToPlayoff) &&
      totalTeamsGoingToPlayoff <= totalTeams
    ) {
    }
  }
  return (
    <CardRuleLayout title="Gruppspelsinställningar">
      <div className="group-settings">
        <form
          onSubmit={handleOnSubmit}
          action=""
          className="group-settings__form"
        >
          {/* <label className="group-settings__form--label" htmlFor="image">
            <p>Omslag</p>
            <input
              type="file"
              id="image"
              name="filename"
              className="group-settings__form--label--upload-file"
            />
          </label> */}

          <label className="group-settings__form--label" htmlFor="rounds">
            <p>Antal möten</p>
            <section className="">
              <button
                type="button"
                onClick={() => {
                  if (rounds <= 1) return;
                  handleDecrement("rounds");
                }}
              >
                <span>-</span>
              </button>
              <span>{rounds}</span>
              <button
                type="button"
                onClick={() => {
                  if (rounds >= 2) return;
                  handleIncrement("rounds");
                }}
              >
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings__form--label" htmlFor="win">
            <p>Poäng för vinst</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("win")}>
                <span>-</span>
              </button>

              <span>{win}</span>
              <button type="button" onClick={() => handleIncrement("win")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings__form--label" htmlFor="draw">
            <p>Poäng för oavgjort</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("draw")}>
                <span>-</span>
              </button>

              <span>{draw}</span>
              <button type="button" onClick={() => handleIncrement("draw")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings__form--label" htmlFor="lost">
            <p>Poäng för förlust</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("loss")}>
                <span>-</span>
              </button>
              <span>{loss}</span>
              <button type="button" onClick={() => handleIncrement("loss")}>
                <span>+</span>
              </button>
            </section>
          </label>
        </form>

        <div className="group-settings__buttons">
          <button
            className="group-settings__buttons--back btn"
            onClick={handleBack}
          >
            <IoIosArrowRoundBack size={25} />
            Tillbaka
          </button>
          <button
            className="group-settings__buttons--next btn"
            onClick={handleNext}
          >
            Nästa
            <IoIosArrowRoundForward size={25} />
          </button>
        </div>
      </div>
    </CardRuleLayout>
  );
}

export default GroupSettingsForm;
