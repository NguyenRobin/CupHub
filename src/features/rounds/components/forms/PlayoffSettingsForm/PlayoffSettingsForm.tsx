import React, { useState } from 'react';
import './PlayoffSettingsForm.scss';
import FormSettingLabel from '../../../../../components/dashboard-page/ui/FormSettingLabel/FormSettingLabel';
import FormSettingsWrapper from '../../../../../components/dashboard-page/ui/FormSettingsWrapper/FormSettingsWrapper';

type Form = {
  elimination: 'single' | 'double';
  final: number;
  semifinal: number;
  quarterfinal: number;
  roundOf16: number;
  roundOf32: number;
  roundOf64: number;
};

export type KeyValue =
  | 'final'
  | 'semifinal'
  | 'quarterfinal'
  | 'roundOf16'
  | 'roundOf32'
  | 'roundOf64';

function PlayoffSettingsForm() {
  const [form, setForm] = useState<Form>({
    elimination: 'single',
    final: 1,
    semifinal: 2,
    quarterfinal: 4,
    roundOf16: 8,
    roundOf32: 16,
    roundOf64: 32,
  });

  function handleIncrement(key: KeyValue) {
    if (form[key] === 9) return;

    setForm((prev) => {
      if (typeof prev[key] === 'number') {
        return {
          ...prev,
          [key]: Number(prev[key]) + 1,
        };
      }
      return prev;
    });
  }

  function handleDecrement(key: KeyValue) {
    if (form[key] === 0) return;

    setForm((prev) => {
      if (typeof prev[key] === 'number') {
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
      elimination: 'single',
      final: 1,
      semifinal: 2,
      quarterfinal: 4,
      roundOf16: 8,
      roundOf32: 16,
      roundOf64: 32,
    });
  }

  return (
    <FormSettingsWrapper title="Slutspelsinställningar - Antalet matcher">
      <form className="playoff-settings-form" onSubmit={handleOnSubmit}>
        <p>Enkel eliminering</p>
        <FormSettingLabel
          label="Final"
          value={form.final}
          handleIncrement={() => handleIncrement('final')}
          handleDecrement={() => handleDecrement('final')}
        />
        <FormSettingLabel
          label="Semifinal"
          value={form.semifinal}
          handleIncrement={() => handleIncrement('semifinal')}
          handleDecrement={() => handleDecrement('semifinal')}
        />
        <FormSettingLabel
          label="Kvartsfinal"
          value={form.quarterfinal}
          handleIncrement={() => handleIncrement('quarterfinal')}
          handleDecrement={() => handleDecrement('quarterfinal')}
        />
        <FormSettingLabel
          label="Åttondelsfinal"
          value={form.roundOf16}
          handleIncrement={() => handleIncrement('roundOf16')}
          handleDecrement={() => handleDecrement('roundOf16')}
        />
        <FormSettingLabel
          label="Sextonsdelsfinal"
          value={form.roundOf32}
          handleIncrement={() => handleIncrement('roundOf32')}
          handleDecrement={() => handleDecrement('roundOf32')}
        />
        <FormSettingLabel
          label="64-delsfinal"
          value={form.roundOf64}
          handleIncrement={() => handleIncrement('roundOf64')}
          handleDecrement={() => handleDecrement('roundOf64')}
        />

        <input
          type="submit"
          value="Nästa"
          className="tournament-form__submit-btn"
        />
      </form>
    </FormSettingsWrapper>
  );
}

export default PlayoffSettingsForm;
