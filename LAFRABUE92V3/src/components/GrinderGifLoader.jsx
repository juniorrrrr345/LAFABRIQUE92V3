import React from 'react';

// 🌿 Loader avec un GIF de grinder qui charge
export default function GrinderGifLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-lime-300 relative overflow-hidden">
      {/* Arrière-plan avec effet de fumée verte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/70 to-black animate-pulse" />
      <div className="absolute inset-0 bg-[url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm9xZmZmemFudHAybmFpYzgyamcxbHh2cDBlOXcxdXdteTRyc3ZlYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AU7rlbC0TIA5Iok1ay/giphy.gif')] bg-center bg-no-repeat bg-contain" />

      {/* Contenu principal */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(0,255,120,0.7)]">
          Préparation du menu...
        </h1>
        <p className="text-lime-200/80 text-sm">Veuillez patienter, le menu charge 🌿</p>
      </div>
    </div>
  );
}