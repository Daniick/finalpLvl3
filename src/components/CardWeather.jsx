import React from "react";
import Card from "./Card";

const CardWeather = () => {
  return (
    <section className=" px-[60px] pt-10  grid grid-rows-3  grid-flow-col-dense lg:flex">
      <Card day={"lunes"} img={"im"} textoimg={"imgan"} cel={1} far={1} />
      <Card day={"martes"} img={"im"} textoimg={"imgan"} cel={1} far={1} />
      <Card day={"miercoles"} img={"im"} textoimg={"imgan"} cel={1} far={1} />
      <Card day={"jueves"} img={"im"} textoimg={"imgan"} cel={1} far={1} />
      <Card day={"viernes"} img={"im"} textoimg={"imgan"} cel={1} far={1} />
    </section>
  );
};

export default CardWeather;
