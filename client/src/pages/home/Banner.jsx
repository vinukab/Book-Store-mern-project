import React from "react";
import bannerImg from "../../assets/banner.png";

export const Banner = () => {
  return (
    <div className="px-8 flex flex-col md:flex-row-reverse justify-between items-center py-16 gap-12">
      <div className="flex items-center md:justify-end ">
        <img src={bannerImg} alt="" className="max-w-full h-auto" />
      </div>
      <div className="md:w-1/2 w-full ">
        <h1 className="font-medium mb-7 md:text-5xl text-2xl">
          New Releases This Week
        </h1>
        <p className="mb-10 text-justify">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>

        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
