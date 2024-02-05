import React from "react";

const Card = ({ day, img, textoimg, cel, far }) => {
  return (
    <div className="mt-10 sm:flex sm:ml-[40px]">
      <div className="w-[120px]  h-[177px] m-auto m bg-[#1E213A]">
        <h5>{day}</h5>
        <img src={img} alt={textoimg} />
        <div className="flex justify-between mx-4 ">
          <p>{cel}</p>
          <p>{far}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
