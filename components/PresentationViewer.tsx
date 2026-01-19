
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Layout, Play } from 'lucide-react';
import { PresentationData, Slide } from '../types.ts';

interface PresentationViewerProps {
  data: PresentationData;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextSlide = () => {
    if (currentIndex < data.slides.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const currentSlide = data.slides[currentIndex];

  const getThemeStyles = (slide: Slide) => {
    const accent = slide.accentColor || '#3b82f6';
    switch (slide.theme) {
      case 'accent':
        return {
          container: `bg-zinc-950 border-l-8`,
          border: { borderColor: accent },
          title: `text-white`,
          bullets: `text-zinc-300`
        };
      case 'glass':
        return {
          container: 'bg-white/[0.03] backdrop-blur-3xl border border-white/10',
          title: 'text-cyan-400',
          bullets: 'text-zinc-400'
        };
      case 'modern':
      default:
        return {
          container: 'bg-[#09090b] border border-white/5',
          title: 'text-white',
          bullets: 'text-zinc-400'
        };
    }
  };

  const styles = getThemeStyles(currentSlide);

  return (
    <div className={`mt-8 w-full transition-all duration-500 ${isFullScreen ? 'fixed inset-0 z-[1000] bg-black p-12' : 'relative rounded-[2.5rem] overflow-hidden'}`}>
      
      {/* Presentation Container */}
      <div className={`h-[500px] w-full p-12 flex flex-col justify-center relative transition-all duration-700 ${styles.container}`} style={styles.border}>
        
        {/* Header/Title */}
        <div className="absolute top-8 left-12 right-12 flex justify-between items-center opacity-40">
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{data.title}</span>
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Slide {currentIndex + 1} / {data.slides.length}</span>
        </div>

        {/* Slide Content */}
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
           <h2 className={`text-4xl font-black tracking-tighter mb-8 ${styles.title}`}>
             {currentSlide.title}
           </h2>
           <ul className="space-y-4">
             {currentSlide.content?.map((item, i) => (
               <li key={i} className={`flex items-start gap-4 text-xl font-medium leading-relaxed ${styles.bullets}`}>
                 <div className="mt-2.5 w-2 h-2 rounded-full shrink-0 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                 {item}
               </li>
             ))}
           </ul>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center">
           <div className="flex gap-2">
             <button 
               onClick={prevSlide} 
               disabled={currentIndex === 0}
               className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl disabled:opacity-20 transition-all"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={nextSlide} 
               disabled={currentIndex === data.slides.length - 1}
               className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl disabled:opacity-20 transition-all"
             >
               <ChevronRight size={20} />
             </button>
           </div>

           <div className="flex gap-2">
             <button 
               onClick={() => setIsFullScreen(!isFullScreen)}
               className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20"
             >
               {isFullScreen ? <X size={16} /> : <Maximize2 size={16} />}
               {isFullScreen ? 'Exit' : 'Present'}
             </button>
           </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/5 w-full">
         <div 
           className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-500" 
           style={{ width: `${((currentIndex + 1) / data.slides.length) * 100}%` }} 
         />
      </div>
    </div>
  );
};

export default PresentationViewer;
