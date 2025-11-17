"use client";

import { Counter } from "../components/Counter";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <motion.h1 initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-semibold leading-loose tracking-tight">
        Next.js App
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeIn' }}>
        <Counter onIncrement={handleIncrement} />
        <p className="text-center">Count: {count}</p>
      </motion.div>
    </main>
  );
}
