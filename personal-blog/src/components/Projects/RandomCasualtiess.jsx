import React from "react";
import FirstPageRC from "./FirstPageRC";
import SecondPageRC from "./SecondPageRC";
import './RandomCasualtiess.css';
const RandomCasualtiess = () => {
  return (
    <div className="containerRandomCas">
      <FirstPageRC/>
      <SecondPageRC/>
      {/* <p>scroll down</p> */}
    </div>
  );
};

export default RandomCasualtiess;