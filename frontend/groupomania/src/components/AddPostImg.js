import React from "react";

const AddPostImg = ({ imageUrl }) => {
  return (
    (
      <div>
      <img src={imageUrl} alt=""/>
      </div>
    )
    // (<input type="file" id="uploadImg " name="file" />)
  );
};

export default AddPostImg;
