import React from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  loading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, loading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="mt-6">
      <label
        htmlFor="image-upload"
        className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg cursor-pointer transition-colors ${
          loading ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
};

export default ImageUploader;