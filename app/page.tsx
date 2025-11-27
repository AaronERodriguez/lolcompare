'use client'

import NavBar from "./NavBar";
import Comparison from "./Comparison";

export default function Home() {

  

  return (
    <div className="flex flex-col gap-4">
      <NavBar />
      <Comparison />
    </div>
  );
}
