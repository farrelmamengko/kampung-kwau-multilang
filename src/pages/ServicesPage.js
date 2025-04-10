import React from "react";
import Heading from "../components/common/Heading";
import Services from "../components/home/Service";
import Sliders from "../components/home/Slider";

export default function Service() {
  return (
    <>
      <Heading heading="Potensi Lokal" title="Home" subtitle="Potensi Lokal" />
      <Services />
      <Sliders />
    </>
  );
}
