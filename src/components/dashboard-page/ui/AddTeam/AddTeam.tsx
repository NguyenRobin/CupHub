"use client";

import "./AddTeam.scss";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import CardRule from "../CardRule/CardRule";
import useFormContext from "../../../../hooks/useFormContext";
import Group from "../Group/Group";

function AddTeam() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    description,
    startDate,
    endDate,
    win,
    draw,
    loss,
    teams,
    rounds,
    teamsPerGroupAdvancing,
    total_groups,
    validTotalGroupsBasedOnTotalTeams,
    exampleGroupPreview,
    handleSelectAmountOfGroups,
    handleChangeTotalTeams,
    handleChangeTeamName,
    handleOnSelect,
    setPage,
  } = useFormContext();

  const validAmountOfTeamsPerGroupToPlayOff =
    teams.length % total_groups! === 0
      ? teams.length / total_groups!
      : (teams.length - (teams.length % total_groups!)) / total_groups!;

  const handlePrev = () => setPage((prev) => prev - 1);

  const onSubmit = async () => {
    setIsLoading(true);

    const tournament = {
      name,
      description,
      location: "stockholm, Sweden",
      startDate,
      endDate,
      teams_participating: teams.map((team) => team.name),
      total_teams: teams.length,
      status: "scheduled",
      total_groups,
      points_system: {
        win,
        draw,
        loss,
        numberOfMeetings: rounds,
        teamsPerGroupAdvancing,
      },
      tournament_format: "group_stage_with_knockout",
      groups: exampleGroupPreview.map((group) => {
        return {
          group: group.group,
          teams: group.teams.map((team) => team.name),
        };
      }),
    };
    console.log(tournament);
    const response = await fetch(
      "http://localhost:3000/api/tournaments?userId=66d564dc6e9fec281eb76625",
      {
        method: "POST",
        body: JSON.stringify(tournament),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await response.json();

    if (result) {
      setIsLoading(false);
    }
  };
  console.log(exampleGroupPreview);
  return (
    <CardRule title="Antal lag">
      <div className="add-team">
        <form action="" className="add-team__form">
          <label
            htmlFor="teams"
            className="add-team__form--label"
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

          <label className="add-team__form--teams">
            {teams?.map((team) => {
              return (
                <input
                  key={team?.id}
                  type="text"
                  name={team.name}
                  id={String(team.id)}
                  defaultValue={team?.name}
                  onChange={(e) => handleChangeTeamName(e, team.id)}
                />
              );
            })}
          </label>

          <label className="add-team__form--group">
            <p>Antal grupper</p>
            <select
              name="total_groups"
              id="total_groups"
              value={total_groups}
              onChange={handleSelectAmountOfGroups}
            >
              {Array.from(Array(validTotalGroupsBasedOnTotalTeams).keys()).map(
                (value, i) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="add-team__form--group" htmlFor="">
            <p>Antal lag per grupp vidare till slutspel</p>
            <select
              name="teamsPerGroupAdvancing"
              id="teamsPerGroupAdvancing"
              value={teamsPerGroupAdvancing}
              onChange={handleOnSelect}
            >
              {Array.from(
                Array(validAmountOfTeamsPerGroupToPlayOff).keys()
              ).map((value, i) => (
                <option key={value + 1} value={value + 1}>
                  {value + 1}
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
            <Group data={exampleGroupPreview} />
          </section>
        </form>

        <div className="add-team__buttons">
          <button
            className="add-team__buttons--back btn"
            disabled={isLoading}
            onClick={handlePrev}
          >
            <IoIosArrowRoundBack size={25} />
            Tillbaka
          </button>

          <button
            className="add-team__buttons--next btn"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? (
              <AiOutlineLoading className="loading" size={20} />
            ) : (
              "Skapa"
            )}
          </button>
        </div>
      </div>
    </CardRule>
  );
}

export default AddTeam;
