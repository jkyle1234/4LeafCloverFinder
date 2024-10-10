import React from 'react';
import { Image } from 'lucide-react';

interface ImageDisplayProps {
  image: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image }) => {
  return (
    <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
      {image ? (
        <img src={image} alt="Uploaded or processed clover" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center text-gray-400">
          <Image className="w-16 h-16 mx-auto mb-2" />
          <p>No image uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;