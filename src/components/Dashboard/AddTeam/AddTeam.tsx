"use client";

import React, { useState } from "react";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import "./AddTeam.scss";
import Group from "../Group/Group";
import { useRouter } from "next/navigation";
type TeamStats = {
  id: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
};
type ShowGroupPreview = {
  group: string;
  teams: TeamStats[];
}[];

function AddTeam() {
  const router = useRouter();

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Lag 1",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      points: 0,
    },
    {
      id: 2,
      name: "Lag 2",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      points: 0,
    },
  ]);

  const [showGroupPreview, setShowGroupPreview] = useState<ShowGroupPreview>([
    {
      group: "A",
      teams: [
        {
          id: 1,
          name: "Lag 1",
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
          points: 0,
        },
        {
          id: 2,

          name: "Lag 2",
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
          points: 0,
        },
      ],
    },
  ]);
  const [selectGroupAmount, setSelectGroupAmount] = useState(1);

  function splitTeamPerGroup(totalTeams: number, totalGroups: number) {
    const totalTeamPerGroup = Math.floor(totalTeams / totalGroups);
    const leftOverTeams = totalTeams % totalGroups; // if totalTeamPerGroup is not even
    const allGroups: any = [];

    let currentIndex = 0;

    for (let i = 0; i < totalGroups; i++) {
      const newGroup = { group: String.fromCharCode(65 + i), teams: [] };
      allGroups.push(newGroup);

      for (let j = 0; j < totalTeamPerGroup; j++) {
        allGroups[i].teams.push(teams[currentIndex]);
        currentIndex++;
      }
    }

    function generateRandomIndex() {
      return Math.floor(Math.random() * totalGroups);
    }

    for (let i = 0; i < leftOverTeams; i++) {
      let index = generateRandomIndex();
      const randomGroup = allGroups[index];
      randomGroup.teams.push(teams[currentIndex]);
      currentIndex++;
    }
    setShowGroupPreview(allGroups);
  }

  function handleChangeTotalTeams(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const currentValue = +e.target.value;
    const difference = currentValue - teams.length;

    if (currentValue < 2) return;

    if (currentValue > teams.length && currentValue > 2 && currentValue <= 32) {
      Array.from(Array(difference).keys()).map((team) => {
        const id = teams.length + (team + 1);

        const newTeam = {
          id: id,
          name: `Lag ${id}`,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goals_for: 0,
          goals_against: 0,
          points: 0,
        };
        setTeams((teams) => [...teams, newTeam]);

        setShowGroupPreview((prev) =>
          prev.map((group) => ({
            ...group,
            teams: [
              ...group.teams,
              {
                id,
                name: `Lag ${id}`,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goals_for: 0,
                goals_against: 0,
                points: 0,
              },
            ],
          }))
        );
      });
    } else if (currentValue < teams.length && currentValue >= 2) {
      setTeams((teams) => [...teams].splice(0, currentValue));

      setShowGroupPreview((prev) =>
        prev.map((group) => ({
          ...group,
          teams: [...group.teams].splice(0, currentValue),
        }))
      );
    }
  }

  function handleChangeTeamName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target;

    console.log("id", id);
    setTeams((prev) =>
      prev.map((team) => (team.id === +id ? { ...team, name: value } : team))
    );

    setShowGroupPreview((prev) =>
      prev.map((group) => {
        // Return a new group object
        return {
          ...group,
          teams: group.teams.map((team) => {
            // Check if the team's id matches
            if (team.id === +id) {
              // Return a new team object with the updated name
              return { ...team, name: value };
            }
            // Return the original team if there's no match
            return team;
          }),
        };
      })
    );
  }

  function handleSelectAmountOfGroups(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = +e.target.value;
    setSelectGroupAmount(value);
    splitTeamPerGroup(teams.length, value);
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/dashboard/create-tournament/group-settings");
    console.log(teams, selectGroupAmount);
    console.log(showGroupPreview);
    localStorage.setItem(
      "addTeam",
      JSON.stringify({
        teamAmount: teams.length,
        totalGroups: selectGroupAmount,
      })
    );
  }

  function validateApprovedGroups(totalTeams: number): number[] {
    const maxGroups = [];

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
      maxGroups.push(i);
    }

    return maxGroups;
  }

  const numberOfGroupsToChoice = validateApprovedGroups(teams.length);

  return (
    <CardRuleLayout title="Antal lag">
      <form onSubmit={handleOnSubmit} action="" className="addTeam-form">
        <label
          htmlFor="teams"
          className="addTeam-form__label"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>Ange antalet lag</p>
          {/* <input
            type="number"
            id="teams"
            name="teams"
            min="2"
            max="32"
            defaultValue={teams.length}
            onChange={handleChangeTotalTeams}
          /> */}
          <select name="team" id="" onChange={handleChangeTotalTeams}>
            {Array.from({ length: 31 }, (_, i) => {
              return (
                <option key={i + 2} value={i + 2}>
                  {i + 2}
                </option>
              );
            })}
          </select>
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
            onChange={handleSelectAmountOfGroups}
          >
            {numberOfGroupsToChoice.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            // marginTop: "5rem",
          }}
        >
          <h3> Exempel på grupper:</h3>
          <Group data={showGroupPreview} />
        </section>

        <input
          type="submit"
          value="Nästa"
          className="addTeam-form__submit-btn"
        />
      </form>
    </CardRuleLayout>
  );
}

export default AddTeam;
