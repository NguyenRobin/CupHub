import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import "./LoadingSpinner.scss";
function LoadingSpinner({ size = 20 }: { size?: number }) {
  return <AiOutlineLoading className="loading-spinner" size={size} />;
}

export default LoadingSpinner;
