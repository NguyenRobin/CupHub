import React, { useState } from "react";
import "./TournamentInfo.scss";
import CardRule from "../CardRule/CardRule";
import useFormContext from "../../../../hooks/useFormContext";

function TournamentInfo() {
  const { description, name, startDate, endDate, setPage, handleOnChange } =
    useFormContext();

  const handlePrev = () => setPage((prev) => prev - 1);
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <CardRule title="Information">
      <div className="tournament-info">
        <form className="tournament-info__form">
          <label htmlFor="title" className="tournament-info__form--label">
            <p>Namn på turneringen</p>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleOnChange}
            />
          </label>

          <label htmlFor="description" className="tournament-info__form--label">
            <p>Beskrivning</p>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleOnChange}
            />
          </label>

          <label htmlFor="startDate" className="tournament-info__form--label">
            <p>Startdatum</p>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleOnChange}
            />
          </label>

          <label htmlFor="endDate" className="tournament-info__form--label">
            <p>Slutdatum</p>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleOnChange}
            />
          </label>
        </form>

        {/* <div> */}
        <button className="tournament-info__btn" onClick={handleNext}>
          Nästa
        </button>
        {/* </div> */}
      </div>
    </CardRule>
  );
}

export default TournamentInfo;
