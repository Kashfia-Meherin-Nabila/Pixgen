import React from "react";
import PhotoCard from "../shared/PhotoCard";

const TopGeneration = async () => {
  const res = await fetch("https://pixgen-iota-kohl.vercel.app/data/data.json");
  const photos = await res.json();
  const topPhotos = photos.slice(0, 8);
  console.log(topPhotos);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center my-10">
        Top Generation
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {topPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </div>
    </div>
  );
};

export default TopGeneration;
