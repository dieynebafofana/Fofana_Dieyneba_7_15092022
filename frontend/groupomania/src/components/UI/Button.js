import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        className="btnConnexion "
        id={props.id}
        type={props.type}
        onClick={props.onClick}
        value={props.value}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
