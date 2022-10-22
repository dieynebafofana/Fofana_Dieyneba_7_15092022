import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className={"btnConnexion"}
       type={props.type} 
       value={props.value}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
