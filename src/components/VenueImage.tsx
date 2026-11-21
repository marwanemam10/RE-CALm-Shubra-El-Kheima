import React, { useState } from 'react';
import { ImageOff, Sparkles, Utensils, Coffee, Salad, IceCream, Flame, CupSoda } from 'lucide-react';

interface VenueImageProps {
  folderName: string;
  type: 'exterior' | 'interior' | 'product';
  index?: number; // 1, 2, 3 (for interior and product)
  alt: string;
  className?: string;
  categoryIconId?: string;
  onClick?: () => void;
}

export const getVenueImageCandidates = (
  folderName: string,
  type: 'exterior' | 'interior' | 'product',
  index: number = 1
): string[] => {
  const encFolder = folderName; // standard browser resolves spaces and arabic cleanly
  if (type === 'exterior') {
    return [
      `/new image/${encFolder}/خارجي.png`,
      `/new image/${encFolder}/خارجي.jpg`,
      `/new image/${encFolder}/خارجي.jpeg`,
      `/new image/${encFolder}/خارجي.webp`,
      `/new image/${encFolder}/exterior.png`,
      `/new image/${encFolder}/exterior.jpg`
    ];
  }

  if (type === 'interior') {
    const list = [
      `/new image/${encFolder}/داخلي${index}.png`,
      `/new image/${encFolder}/داخلي ${index}.png`,
      `/new image/${encFolder}/داخلي${index}.jpg`,
      `/new image/${encFolder}/داخلي ${index}.jpg`,
      `/new image/${encFolder}/داخلي${index}.jpeg`,
      `/new image/${encFolder}/داخلي${index}.webp`
    ];
    if (index === 2) {
      list.push(`/new image/${encFolder}/دخلي2.png`);
      list.push(`/new image/${encFolder}/دخلي 2.png`);
    }
    list.push(`/new image/${encFolder}/interior${index}.png`);
    list.push(`/new image/${encFolder}/interior${index}.jpg`);
    return list;
  }

  // product
  return [
    `/new image/${encFolder}/منتج${index}.jpg`,
    `/new image/${encFolder}/منتج ${index}.jpg`,
    `/new image/${encFolder}/منتج${index}.png`,
    `/new image/${encFolder}/منتج ${index}.png`,
    `/new image/${encFolder}/منتج${index}.jpeg`,
    `/new image/${encFolder}/منتج${index}.webp`,
    `/new image/${encFolder}/product${index}.jpg`,
    `/new image/${encFolder}/product${index}.png`
  ];
};

export const VenueImage: React.FC<VenueImageProps> = ({
  folderName,
  type,
  index = 1,
  alt,
  className = '',
  categoryIconId,
  onClick
}) => {
  const candidates = getVenueImageCandidates(folderName, type, index);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  const getFallbackIcon = () => {
    switch (categoryIconId) {
      case 'brew-district':
        return <Coffee className="w-8 h-8 text-amber-600/70 dark:text-amber-400/70" />;
      case 'green-bowl':
        return <Salad className="w-8 h-8 text-emerald-600/70 dark:text-emerald-400/70" />;
      case 'sweet-avenue':
        return <IceCream className="w-8 h-8 text-rose-600/70 dark:text-rose-400/70" />;
      case 'urban-bites':
        return <Flame className="w-8 h-8 text-orange-600/70 dark:text-orange-400/70" />;
      case 'juice-lab':
        return <CupSoda className="w-8 h-8 text-teal-600/70 dark:text-teal-400/70" />;
      default:
        return <Utensils className="w-8 h-8 text-[#8e8672]/70" />;
    }
  };

  if (hasFailedAll) {
    return (
      <div 
        onClick={onClick}
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 text-neutral-400 select-none p-4 text-center ${className}`}
      >
        <div className="p-3 rounded-2xl bg-white/60 dark:bg-black/30 backdrop-blur-sm shadow-sm mb-2">
          {getFallbackIcon()}
        </div>
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {alt}
        </span>
        <span className="text-[10px] text-neutral-400 mt-0.5">
          {type === 'exterior' ? 'صورة الواجهة' : type === 'interior' ? `صورة داخلية ${index}` : `منتج مميز ${index}`}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      <img
        src={candidates[candidateIndex]}
        alt={alt}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
      {!isLoaded && !hasFailedAll && (
        <div className="absolute inset-0 bg-neutral-200/70 dark:bg-neutral-800/70 animate-pulse flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-neutral-400 animate-spin" />
        </div>
      )}
    </div>
  );
};
