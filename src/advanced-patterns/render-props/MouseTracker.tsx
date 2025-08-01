/**
 * Common use cases: Mouse tracking, data fetching, form validation
 * When Component doesn't care about the UI but only the state. It let Parent component call it.
 * This pattern is not preferred anymore, use hooks is more preferable way
 */
import React, { useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: Position) => React.JSX.Element;
}

const MouseTracker = ({ render }: MouseTrackerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative bg-gray-100 w-screen h-screen"
      onMouseMove={(event) => {
        setPosition({ x: event.clientX, y: event.clientY });
      }}
    >
      {render(position)}
    </div>
  );
};

export const MouseTrackerExample = () => {
  return (
    <MouseTracker
      render={({ x, y }) => {
        return (
          <div
            className="absolute rounded-full bg-red-950 p-8"
            style={{ top: y, left: x }}
          />
        );
      }}
    />
  );
};
