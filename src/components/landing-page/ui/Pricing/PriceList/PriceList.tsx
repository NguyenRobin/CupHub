import React from "react";
import { FaCheck } from "react-icons/fa6";
import "./PriceList.scss";

type Props = {
  text: string;
};

function PriceList({ text }: Props) {
  return (
    <li>
      <FaCheck className="check-icon" />
      {text}
    </li>
  );
}

export default PriceList;
