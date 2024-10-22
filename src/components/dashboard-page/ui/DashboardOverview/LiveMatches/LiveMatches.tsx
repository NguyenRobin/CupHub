import React from 'react';
import CardWrapper from '../../../../ui/card-wrapper/CardWrapper';
import { RiLiveLine } from 'react-icons/ri';
import './LiveMatches.scss';

function LiveMatches() {
  return (
    <CardWrapper>
      <section className="live-matches__title">
        <RiLiveLine />
        <h2>Pågående matcher</h2>
      </section>

      <section className="live-matches__ongoing">
        <p>Inga pågående live matcher.</p>
      </section>

      <section className=""></section>
    </CardWrapper>
  );
}

export default LiveMatches;
