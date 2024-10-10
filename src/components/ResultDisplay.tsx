import React from 'react';

interface ResultDisplayProps {
  result: string | null;
  loading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading, error }) => {
  return (
    <div className="mt-6">
      <div className="bg-gray-100 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500">Analyzing image...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : result ? (
          <p className="text-gray-800">{result}</p>
        ) : (
          <p className="text-gray-500">Upload an image to see results</p>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;