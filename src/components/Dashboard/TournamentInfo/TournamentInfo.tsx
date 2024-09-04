import React, { useState } from "react";
import "./TournamentInfo.scss";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import AddTeam from "../AddTeam/AddTeam";
type Form = {
  name: string;
  description?: string;
  sport?: string;
  startDate: string;
  endDate: string;
};

function TournamentInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({
    name: "",
    description: "",
    sport: "",
    startDate: "",
    endDate: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleOnSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();

    router.push("/dashboard/create-tournament/add-team");
    console.log(form);
    localStorage.setItem("tournamentInfo", JSON.stringify(form));
  };

  return (
    <CardRuleLayout title="Information">
      <form onSubmit={handleOnSubmit} className="tournament-info">
        <label htmlFor="title" className="tournament-info__label">
          <p>Namn på turneringen</p>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="description" className="tournament-info__label">
          <p>Beskrivning</p>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="startDate" className="tournament-info__label">
          <p>Startdatum</p>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={form.startDate}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="endDate" className="tournament-info__label">
          <p>Slutdatum</p>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={form.endDate}
            onChange={handleOnChange}
          />
        </label>

        <input
          type="submit"
          value="Nästa"
          className="tournament-info__submit-btn"
        />
      </form>
      <AddTeam />
    </CardRuleLayout>
  );
}

export default TournamentInfo;
