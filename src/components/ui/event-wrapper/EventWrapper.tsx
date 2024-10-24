'use client';
import React from 'react';
import './EventWrapper.scss';
import { RxShare2 } from 'react-icons/rx';

type Props = {
  children: React.ReactNode;
};
function EventWrapper({ children }: Props) {
  return (
    <div className="event-wrapper">
      <div className="event-wrapper__icon">
        <div className="event-wrapper__icon-overlay"></div>
        <span>
          <RxShare2 onClick={() => console.log('hej')} />
        </span>
      </div>

      <div className="event-wrapper__children">{children}</div>

      <div>
        <p>12-10-2025</p>
        <p>Min Turnering</p>
        <p>Lötens konstgräs</p>
        <p>30 anmälda lag</p>
      </div>
      <div className="event-wrapper__register">
        <button>
          <span></span>Visa mer
        </button>
      </div>
    </div>
  );
}

export default EventWrapper;
