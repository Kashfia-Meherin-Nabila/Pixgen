import React from 'react';
import Image from 'next/image';
import { 
  Chip, 
  Button, 
  Card, 
  Avatar 
} from "@heroui/react";

const PhotoDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  const res = await fetch('https://pixgen-iota-kohl.vercel.app/data/data.json', {
    next: { revalidate: 3600 } 
  });
  const photos = await res.json();
  const photo = photos.find((p) => p.id == id);

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-white text-xl">Photo not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(photo.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const categoryColorMap = {
    Realistic: 'primary',
    Fantasy: 'secondary',
    Abstract: 'warning',
    Nature: 'success',
    Architecture: 'danger',
  };
  const categoryColor = categoryColorMap[photo.category] ?? 'default';

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Chip color={categoryColor} variant="flat" size="sm">
              {photo.category}
            </Chip>
            <Chip variant="bordered" size="sm" className="text-gray-400 border-gray-700">
              {photo.model}
            </Chip>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{photo.title}</h1>
          <p className="text-gray-400 text-sm">
             Published on {formattedDate}
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Image panel ── */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-800">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                width={768}
                height={1024}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button isIconOnly size="sm" variant="flat" className="bg-black/50 text-xs text-white">
                  Save
                </Button>
                <Button isIconOnly size="sm" variant="flat" className="bg-black/50 text-xs text-white">
                  Share
                </Button>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="flat"
                className="flex-1 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
              >
                {photo.likes} Likes
              </Button>
              <Button
                color="primary"
                className="flex-1 font-bold"
              >
                Download HD ({photo.downloads})
              </Button>
            </div>
          </div>

          {/* ── Info panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            
            <Card className="bg-gray-900 border border-gray-800 shadow-none">
              <div className="p-5">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Prompt</h2>
                <p className="text-gray-200 text-sm leading-relaxed italic">
                  &ldquo;{photo.prompt}&rdquo;
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 shadow-none">
              <div className="p-5">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Specifications</h2>
                <div className="space-y-3">
                  <SpecRow label="Model" value={photo.model} />
                  <div className="h-px w-full bg-gray-800 my-1" />
                  <SpecRow label="Resolution" value={photo.resolution} />
                  <div className="h-px w-full bg-gray-800 my-1" />
                  <SpecRow label="Category" value={photo.category} />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 shadow-none">
              <div className="p-5">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      variant="flat" 
                      size="sm" 
                      className="bg-gray-800 text-gray-400"
                    >
                      #{tag}
                    </Chip>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 shadow-none">
              <div className="p-5">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Creator</h2>
                <div className="flex items-center gap-3">
                  <Avatar 
                    name="AI" 
                    size="md" 
                    className="bg-linear-to-br from-purple-600 to-blue-600 text-white" 
                  />
                  <div>
                    <p className="text-white font-medium text-sm">AI Studio</p>
                    <p className="text-gray-500 text-xs">Generated with {photo.model}</p>
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-white text-sm font-medium">{value}</span>
  </div>
);

export default PhotoDetailsPage;