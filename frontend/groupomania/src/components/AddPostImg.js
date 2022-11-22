import React from "react";

const AddPostImg = ({ imageUrl }) => {
  return (
    (
      <div className="ImgPost">
      
      <img src={imageUrl} alt=""/>
      </div>
    )

  );
};

export default AddPostImg;
