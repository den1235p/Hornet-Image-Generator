import React, { useState, useCallback } from 'react';
import { generateHornetImage, STYLES } from './services/geminiService';
import Button from './components/Button';
import Spinner from './components/Spinner';
import HornetIcon from './components/HornetIcon';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0]);

  const handleGenerateImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null); // Clear previous image
    try {
      const url = await generateHornetImage(selectedStyle);
      setImageUrl(url);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStyle]);

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-hornet-${selectedStyle.toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans">
      <div className="w-full max-w-xl text-center">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 tracking-tight">
            Hornet Image Generator
          </h1>
          <p className="text-gray-400 mt-2">
            Select a style, then click the button to summon a new image of Hornet!
          </p>
        </header>

        <main className="mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-3">Choose a Style</h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out border-2
                    ${selectedStyle === style 
                      ? 'bg-red-600 border-red-500 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square bg-gray-800/50 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden border-2 border-gray-700">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
                <Spinner />
                <p className="mt-4 text-gray-300">Generating your Hornet...</p>
              </div>
            )}
            {error && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/50 p-4">
                 <svg xmlns="http://www.w.3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 font-semibold">{error}</p>
              </div>
            )}
            {!imageUrl && !isLoading && !error && (
              <div className="text-gray-500 flex flex-col items-center">
                <HornetIcon className="w-24 h-24 mb-4" />
                <p>Your generated image will appear here.</p>
              </div>
            )}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`Art of Hornet from Hollow Knight in a ${selectedStyle} style`}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                onError={() => {
                  setError("Failed to load the generated image.");
                  setImageUrl(null);
                }}
              />
            )}
          </div>
        </main>
        
        <footer>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleGenerateImage} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Get New Hornet'}
            </Button>
            {imageUrl && !isLoading && (
              <Button onClick={handleDownloadImage} variant="secondary">
                Download
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;