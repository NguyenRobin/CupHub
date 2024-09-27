import React, { useState } from "react";
import "./TournamentInfo.scss";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import useFormContext from "@/hooks/useFormContext";

function TournamentInfo() {
  const { description, name, startDate, endDate, setPage, handleOnChange } =
    useFormContext();

  const handlePrev = () => setPage((prev) => prev - 1);
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <CardRuleLayout title="Information">
      <form className="tournament-info">
        <label htmlFor="title" className="tournament-info__label">
          <p>Namn på turneringen</p>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="description" className="tournament-info__label">
          <p>Beskrivning</p>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="startDate" className="tournament-info__label">
          <p>Startdatum</p>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="endDate" className="tournament-info__label">
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
      <button className="tournament-info__submit-btn" onClick={handleNext}>
        Nästa
      </button>
    </CardRuleLayout>
  );
}

export default TournamentInfo;
