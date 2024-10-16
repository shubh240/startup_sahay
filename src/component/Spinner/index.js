import React from "react";
import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={style.loader}>
      <div className={style.spinnerDual}>
        <div className={style.spinnerDual}></div>
      </div>
    </div>
  );
};

export default Spinner;
