'use client';
import React, { useState } from 'react';
import './TournamentInfoForm.scss';
import FormSettingsWrapper from '../../../../../components/dashboard-page/ui/FormSettingsWrapper/FormSettingsWrapper';
import useFormContext from '../../../../../hooks/useFormContext';

function TournamentInfoForm() {
  const { description, name, startDate, endDate, setPage, handleOnChange } =
    useFormContext();

  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <FormSettingsWrapper
      title="Information"
      btn={
        <button className="tournament-info__btn" onClick={handleNext}>
          Nästa
        </button>
      }
    >
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
      </div>
    </FormSettingsWrapper>
  );
}

export default TournamentInfoForm;
