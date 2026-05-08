import PhotoCard from '@/components/shared/PhotoCard';
import React from 'react';

const AllPhotos = async () => {
    const res = await fetch("https://pixgen-iota-kohl.vercel.app/data/data.json");
  const photos = await res.json();
    return (
        <div>
      <h2 className="text-3xl font-semibold text-center my-10">
        Top Generation
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </div>
    </div>
    );
};

export default AllPhotos;