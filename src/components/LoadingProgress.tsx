import { useEffect, useState } from "react";

interface LoadingProgressProps {
  isLoading: boolean;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100); // Meningkatkan progress setiap 100ms
    } else {
      setProgress(0); // Reset ketika tidak loading
    }
  }, [isLoading]);

  return (
    <div className="relative w-full h-1 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingProgress;
