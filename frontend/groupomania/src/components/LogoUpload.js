import React from "react";

const LogoUpload = () => {
  return (
    <div>
      <div className="ImgUpload">
        <img className="Image" src="./upload-solid.svg" alt="Logo upload" />
        <div>
          <input className="ImgUploadFile" name="image" type="file" />
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
