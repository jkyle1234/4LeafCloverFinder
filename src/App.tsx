import React, { useState } from 'react';
import { Clover, Upload, Loader2 } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import ResultDisplay from './components/ResultDisplay';
import { processImage } from './utils/imageProcessing';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setImage(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    try {
      const processedResult = await processImage(file);
      setResult(processedResult);
    } catch (error: any) {
      console.error('Error processing image:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <Clover className="w-12 h-12 text-emerald-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Clover Detector</h1>
        </div>
        <ImageDisplay image={image} />
        <ImageUploader onImageUpload={handleImageUpload} loading={loading} />
        <ResultDisplay result={result} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;