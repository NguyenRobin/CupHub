import React, { useState } from "react";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import "./AddTeam.scss";

function AddTeam() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Lag 1",
    },
    {
      id: 2,
      name: "Lag 2",
    },
  ]);

  const [totalGroups, setTotalGroups] = useState<number | null>(null);

  function handleChangeTotalTeams(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = +e.target.value;
    const difference = currentValue - teams.length;

    if (currentValue > teams.length && currentValue > 2 && currentValue <= 32) {
      Array.from(Array(difference).keys()).map((team) => {
        const id = teams.length + (team + 1);

        const newTeam = {
          id,
          name: `Lag ${id}`,
        };
        setTeams((teams) => [...teams, newTeam]);
      });
    } else if (currentValue < teams.length && currentValue >= 2) {
      setTeams((teams) => [...teams].splice(0, currentValue));
    }
  }

  function handleChangeTeamName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target;

    setTeams((prev) =>
      prev.map((team) => (team.id === +id ? { ...team, name: value } : team))
    );
  }

  function handleSelectGroupAmount(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = +e.target.value;
    setTotalGroups(value);
  }
  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(teams, totalGroups);
  }

  function approvedGroups(totalTeams: number): number[] {
    // om antalet lag < 3 endast 1 grupp ska kunna skapas
    // om antalet lag <= 5 endast 1 eller 2 grupper ska kuna visas
    // om antalet lag <= 7 endast 1,2,3 grupper
    // om antalet lag <= 9 endast 1,2,3,4 grupper
    // om antalet lag <= 11 endast 1,2,3,4,5 grupper
    // om antalet lag <= 13 endast 1,2,3,4,5,6 grupper
    // om antalet lag <= 15 endast 1,2,3,4,5,6,7 grupper
    // om antalet lag <= 17 endast 1,2,3,4,5,6,7,8 grupper
    // om antalet lag <= 19 endast 1,2,3,4,5,6,7,8,9 grupper
    const options = [];

    let maxAmountOfGroups = 1;
    if (totalTeams <= 3) {
      maxAmountOfGroups = 1;
    } else if (totalTeams <= 5) {
      maxAmountOfGroups = 2;
    } else if (totalTeams <= 7) {
      maxAmountOfGroups = 3;
    } else if (totalTeams <= 9) {
      maxAmountOfGroups = 4;
    } else if (totalTeams <= 11) {
      maxAmountOfGroups = 5;
    } else if (totalTeams <= 13) {
      maxAmountOfGroups = 6;
    } else if (totalTeams <= 15) {
      maxAmountOfGroups = 7;
    } else if (totalTeams <= 17) {
      maxAmountOfGroups = 8;
    } else if (totalTeams <= 19) {
      maxAmountOfGroups = 9;
    } else if (totalTeams <= 21) {
      maxAmountOfGroups = 10;
    } else if (totalTeams <= 23) {
      maxAmountOfGroups = 11;
    } else if (totalTeams <= 25) {
      maxAmountOfGroups = 12;
    } else if (totalTeams <= 27) {
      maxAmountOfGroups = 13;
    } else if (totalTeams <= 29) {
      maxAmountOfGroups = 14;
    } else if (totalTeams <= 31) {
      maxAmountOfGroups = 15;
    } else if (totalTeams <= 32) {
      maxAmountOfGroups = 16;
    }

    for (let i = 1; i <= maxAmountOfGroups; i++) {
      options.push(i);
    }

    return options;
  }

  const numberOfGroups = approvedGroups(teams.length);

  return (
    <CardRuleLayout title="Antal lag">
      <form onSubmit={handleOnSubmit} action="" className="addTeam-form">
        <label htmlFor="teams" className="addTeam-form__label">
          <p>Ange antalet lag</p>
          <input
            type="number"
            id="teams"
            name="teams"
            min="2"
            max="32"
            defaultValue={teams.length}
            onChange={handleChangeTotalTeams}
          />
        </label>

        <label className="addTeam-form__teams">
          {teams?.map((team) => {
            return (
              <input
                key={team?.id}
                type="text"
                name={team.name}
                id={String(team.id)}
                defaultValue={team?.name}
                onChange={handleChangeTeamName}
              />
            );
          })}
        </label>

        <label className="addTeam-form__group">
          <p>Antal grupper</p>
          <select
            name="groups"
            id="groupAmount-select"
            onChange={handleSelectGroupAmount}
          >
            {numberOfGroups.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <input
          type="submit"
          value="Nästa"
          className="tournament-form__submit-btn"
        />
      </form>
    </CardRuleLayout>
  );
}

export default AddTeam;
