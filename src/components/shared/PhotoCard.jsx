import { Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { ArrowChevronDown, CardHeart } from "@gravity-ui/icons";
import { Separator } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Button } from "@heroui/react";

const PhotoCard = ({ photo }) => {
  return (
    <Card className="border rounded-xl">
      <div className="relative w-full aspect-square">
        <Image
          src={photo.imageUrl}
          alt={photo.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
        />
        <Chip className="absolute top-2 right-2 bg-purple-200">{photo.category}</Chip>
      </div>
      <div className="font-medium">{photo.title}</div>

      <div className="flex justify-between">
        <div className="flex gap-3 items-center ">
          <CardHeart />
          {photo.likes}
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-3 items-center ">
          <ArrowChevronDown />
          {photo.downloads}
        </div>
        
      </div>

      <Button variant="outline"  className="w-full hover:bg-purple-700 hover:text-white">
          View
        </Button>
    </Card>
  );
};

export default PhotoCard;
