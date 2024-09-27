"use client";

import "./AddTeam.scss";
import Group from "../Group/Group";
import useFormContext from "@/hooks/useFormContext";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";

function AddTeam() {
  const {
    teams,
    teamsPerGroupAdvancing,
    total_groups,
    validTotalGroupsBasedOnTotalTeams,
    exampleGroupPreview,
    handleSelectAmountOfGroups,
    handleChangeTotalTeams,
  } = useFormContext();

  return (
    <CardRuleLayout title="Antal lag">
      <form action="" className="addTeam-form">
        <label className="group-settings-form__label" htmlFor="lost">
          <p>Antal lag per grupp vidare till slutspel</p>
          <section className="">
            <button
              type="button"
              // onClick={() => {
              //   if (form.teamsPerGroupAdvancing <= 1) return;
              //   handleDecrement("teamsPerGroupAdvancing");
              // }}
            >
              <span>-</span>
            </button>
            <span>{teamsPerGroupAdvancing}</span>
            <button
              type="button"
              // onClick={() => handleIncrement("teamsPerGroupAdvancing")}
            >
              <span>+</span>
            </button>
          </section>
        </label>
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
                // onChange={handleChangeTeamName}
              />
            );
          })}
        </label>

        <label className="addTeam-form__group">
          <p>Antal grupper</p>
          <select
            name="groups"
            id="groupAmount"
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
