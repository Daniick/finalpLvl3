import React from "react";

const HighLights = () => {
  return (
    <section className="text-center grid grid-cols-1 mt-10   sm:grid-cols-2 sm:ml-[75px] sm:mr-[110px]">
      <div className="w-[410px] sm:w-[328px] h-[204px] m-6  bg-[#1E213A]">
        <h5 className="align-top">Wind Status</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">7</span> mph
        </h1>
        <p className="align-">wsw</p>
      </div>

      <div className="w-[410px] sm:w-[328px] h-[204px] m-6  bg-[#1E213A]">
        <h5 className="align-top">humidity</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          {" "}
          <span className="text-[38px] font-bold">84%</span>
        </h1>
        <p>barra</p>
      </div>
      <div className="w-[410px] h-[159px] sm:w-[328px] m-6 bg-[#1E213A] ">
        <h5 className="align-top">Visibility</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">6,4</span> miles
        </h1>
      </div>
      <div className="w-[410px] h-[159px] sm:w-[328px] m-6 bg-[#1E213A]">
        <h5 className="align-top">Air pressure</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">998</span> mb
        </h1>
      </div>
    </section>
  );
};

export default HighLights;
