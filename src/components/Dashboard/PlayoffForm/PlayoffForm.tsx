import React, { useState } from "react";
import "./PlayoffForm.scss";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";
import Rule from "../Rule/Rule";
// import { KeyValue } from "@/types";

type Form = {
  elimination: "single" | "double";
  final: number;
  semifinal: number;
  quarterfinal: number;
  roundOf16: number;
  roundOf32: number;
  roundOf62: number;
};

export type KeyValue =
  | "final"
  | "semifinal"
  | "quarterfinal"
  | "roundOf16"
  | "roundOf32"
  | "roundOf62";

function PlayoffForm() {
  const [form, setForm] = useState<Form>({
    elimination: "single",
    final: 1,
    semifinal: 1,
    quarterfinal: 1,
    roundOf16: 1,
    roundOf32: 1,
    roundOf62: 1,
  });

  function handleIncrement(key: KeyValue) {
    if (form[key] === 9) return;

    setForm((prev) => {
      if (typeof prev[key] === "number") {
        return {
          ...prev,
          [key]: Number(prev[key]) + 1,
        };
      }
      return prev;
    });
  }

  function handleDecrement(key) {
    if (form[key] === 0) return;

    setForm((prev) => {
      if (typeof prev[key] === "number") {
        return {
          ...prev,
          [key]: prev[key] - 1,
        };
      }
      return prev;
    });
  }

  function handleOnSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    // if (form.name === "") return;
    console.log(form);

    setForm({
      elimination: "single",
      final: 1,
      semifinal: 1,
      quarterfinal: 1,
      roundOf16: 1,
      roundOf32: 1,
      roundOf62: 1,
    });

    // console.log(form);
  }

  return (
    <CardRuleLayout title="Slutspelsinställningar - Antalet matcher">
      <form className="playoff-form" onSubmit={handleOnSubmit}>
        <p>{form.elimination}</p>
        <Rule
          label="Final"
          value={form.final}
          handleIncrement={() => handleIncrement("final")}
          handleDecrement={() => handleDecrement("final")}
        />
        <Rule
          label="Semifinal"
          value={form.semifinal}
          handleIncrement={() => handleIncrement("semifinal")}
          handleDecrement={() => handleDecrement("semifinal")}
        />
        <Rule
          label="Kvartsfinal"
          value={form.quarterfinal}
          handleIncrement={() => handleIncrement("quarterfinal")}
          handleDecrement={() => handleDecrement("quarterfinal")}
        />
        <Rule
          label="Åttondelsfinal"
          value={form.roundOf16}
          handleIncrement={() => handleIncrement("roundOf16")}
          handleDecrement={() => handleDecrement("roundOf16")}
        />
        <Rule
          label="Sextonsdelsfinal"
          value={form.roundOf32}
          handleIncrement={() => handleIncrement("roundOf32")}
          handleDecrement={() => handleDecrement("roundOf32")}
        />
        <Rule
          label="64-delsfinal"
          value={form.roundOf62}
          handleIncrement={() => handleIncrement("roundOf62")}
          handleDecrement={() => handleDecrement("roundOf62")}
        />

        <input
          type="submit"
          value="Nästa"
          className="tournament-form__submit-btn"
        />
      </form>
    </CardRuleLayout>
  );
}

export default PlayoffForm;
