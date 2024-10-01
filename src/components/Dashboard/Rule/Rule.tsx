import { useState } from "react";

type Props = {
  label: string;
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

function Rule({ label, value, handleIncrement, handleDecrement }: Props) {
  return (
    <label className="tournament-form__label">
      <p>{label}</p>
      <section>
        <button type="button" onClick={handleDecrement}>
          <span>-</span>
        </button>
        <span>{value}</span>
        <button type="button" onClick={handleIncrement}>
          <span>+</span>
        </button>
      </section>
    </label>
  );
}

export default Rule;
