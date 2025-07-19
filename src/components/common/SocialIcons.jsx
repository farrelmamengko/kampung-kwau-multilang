import React from "react";
import SocialMediaIcons from "./SocialMediaIcons";

export default function SocialIcons() {
  return (
    <>
      <div className="col-lg-3 px-5">
        <div className="d-inline-flex align-items-center py-2">
            <SocialMediaIcons className="me-3 text-white" containerClass="d-inline-flex" />
        </div>
      </div>
    </>
  );
}
