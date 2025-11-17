'use client';
import { Button } from "@heroui/react";

 // This is a client component because it uses state and interactivity

interface CounterProps {
    onIncrement: () => void
}

export const Counter = ({ onIncrement }: CounterProps) => {

  return (
    <div>
      <Button color="primary" onPress={() => onIncrement()}>Increment</Button>
    </div>
  );
};