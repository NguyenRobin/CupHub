"use client";

import React, { use, useEffect, useState } from "react";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import "./AddTeam.scss";
import Group from "../Group/Group";
import { useRouter } from "next/navigation";
type Team = {
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
  teams: Team[];
};

function validateApprovedGroups(totalTeams: number): number[] {
  const maxGroups = [];
  let numberOfGroups = 0;

  for (let i = 1; i <= totalTeams; i++) {
    if (i % 3 === 0) {
      numberOfGroups++;
      maxGroups.push(numberOfGroups);
    }
  }
  return maxGroups;
}

function generateRandomIndexByArraySize(size: number) {
  return Math.floor(Math.random() * size);
}

function AddTeam() {
  const router = useRouter();
  const [selectTotalGroups, setSelectTotalGroups] = useState([1]);
  const [selectedGroupValue, setSelectedGroupValue] = useState(1);
  const [showGroupPreview, setShowGroupPreview] = useState<ShowGroupPreview[]>(
    []
  );
  const [teams, setTeams] = useState<Team[]>([
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

  useEffect(() => {
    if (selectTotalGroups !== null) {
      divideTeamsByGroup(teams.length, selectedGroupValue);
    }
  }, [teams.length, selectedGroupValue]);

  function divideTeamsByGroup(totalTeams: number, totalGroups: number) {
    const totalTeamPerGroup = Math.floor(totalTeams / totalGroups);
    const leftOverTeams = totalTeams % totalGroups; // if totalTeamPerGroup is not even. we need to add it to some of the groups

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

    let usedIndexes: number[] = [];
    for (let i = 0; i < leftOverTeams; i++) {
      if (usedIndexes.length === totalGroups) {
        usedIndexes = []; // restore it if all indexes been used once
      }
      let index = generateRandomIndexByArraySize(totalGroups);

      while (usedIndexes.includes(index)) {
        index = generateRandomIndexByArraySize(totalGroups); // generate until a non used index is found.
      }
      usedIndexes.push(index);

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
    const numberOfGroupsToPick = validateApprovedGroups(currentValue);
    const index = numberOfGroupsToPick[selectedGroupValue - 1]
      ? numberOfGroupsToPick[selectedGroupValue - 1]
      : 1;

    if (currentValue > teams.length) {
      Array.from(Array(difference).keys()).forEach((team) => {
        const id = teams.length + (team + 1);
        console.log(selectedGroupValue - 1);
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

        setSelectTotalGroups(numberOfGroupsToPick);

        setSelectedGroupValue(index);

        setShowGroupPreview((prev) =>
          prev.map((group) => ({
            ...group,
            teams: [...group.teams, newTeam],
          }))
        );
      });
    } else if (currentValue < teams.length && currentValue >= 2) {
      setTeams((prev) => prev.slice(0, currentValue));

      const numberOfGroupsToPick = validateApprovedGroups(currentValue);

      if (!numberOfGroupsToPick.length) {
        setSelectTotalGroups([1]);
        divideTeamsByGroup(teams.length, 1);
      } else {
        setSelectTotalGroups(numberOfGroupsToPick);
        setSelectedGroupValue(numberOfGroupsToPick.length);
        divideTeamsByGroup(teams.length, numberOfGroupsToPick.length);
      }
    }
  }

  function handleChangeTeamName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target;

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

    setSelectedGroupValue(value);
    divideTeamsByGroup(teams.length, value);
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/dashboard/create-tournament/group-settings");

    localStorage.setItem(
      "addTeam",
      JSON.stringify({
        teamAmount: teams.length,
        totalGroups: selectTotalGroups.length,
      })
    );
  }

  console.log("selectedGroupValue", selectedGroupValue);
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

          <select name="team" id="" onChange={handleChangeTotalTeams}>
            {Array.from({ length: 31 }, (_, i) => {
              return (
                <option key={i} value={i + 2}>
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
            id="groupAmount"
            value={selectedGroupValue}
            onChange={handleSelectAmountOfGroups}
          >
            {selectTotalGroups.map((value, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
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

// {
//   id: 1,
//   name: "Lag 1",
//   played: 0,
//   won: 0,
//   drawn: 0,
//   lost: 0,
//   goals_for: 0,
//   goals_against: 0,
//   points: 0,
// },
// {
//   id: 2,
//   name: "Lag 2",
//   played: 0,
//   won: 0,
//   drawn: 0,
//   lost: 0,
//   goals_for: 0,
//   goals_against: 0,
//   points: 0,
// },
// {
//   id: 3,
//   name: "Lag 3",
//   played: 0,
//   won: 0,
//   drawn: 0,
//   lost: 0,
//   goals_for: 0,
//   goals_against: 0,
//   points: 0,
// },
// {
//   id: 4,
//   name: "Lag 4",
//   played: 0,
//   won: 0,
//   drawn: 0,
//   lost: 0,
//   goals_for: 0,
//   goals_against: 0,
//   points: 0,
// },

// {
//   group: "A",
//   teams: [
//     {
//       id: 1,
//       name: "Lag 1",
//       played: 0,
//       won: 0,
//       drawn: 0,
//       lost: 0,
//       goals_for: 0,
//       goals_against: 0,
//       points: 0,
//     },
//     {
//       id: 2,
//       name: "Lag 2",
//       played: 0,
//       won: 0,
//       drawn: 0,
//       lost: 0,
//       goals_for: 0,
//       goals_against: 0,
//       points: 0,
//     },
//     {
//       id: 3,
//       name: "Lag 3",
//       played: 0,
//       won: 0,
//       drawn: 0,
//       lost: 0,
//       goals_for: 0,
//       goals_against: 0,
//       points: 0,
//     },
//     {
//       id: 4,
//       name: "Lag 4",
//       played: 0,
//       won: 0,
//       drawn: 0,
//       lost: 0,
//       goals_for: 0,
//       goals_against: 0,
//       points: 0,
//     },
//   ],
// },
