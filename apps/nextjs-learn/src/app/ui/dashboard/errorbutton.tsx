"use client";

import { useState } from "react";

export default function ErrorButton(props: { title: string }) {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("custom error");
  }

  const handleClick = () => {
    setShouldThrow(true);
  };

  return <button onClick={handleClick}>throw {props.title} error</button>;
}
