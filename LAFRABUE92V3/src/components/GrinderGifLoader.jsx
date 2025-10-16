import React from 'react';

// 🌿 Loader avec un GIF de grinder qui charge
export default function GrinderGifLoader() {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black overflow-hidden">
      {/* GIF en plein écran */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng0ZHk5MWs0dG95bWhhc3VzZHp2YTd5Ym5rdGY1NTl5cTZ0aXp4NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R66d5xrLScxeEUJYer/giphy.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu principal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
            Préparation du menu...
          </h1>
          <div className="bg-black/70 backdrop-blur-md rounded-xl px-8 py-4 inline-block shadow-2xl">
            <p className="text-white text-lg font-medium">Veuillez patienter, le menu charge 🌿</p>
          </div>
        </div>
      </div>
    </div>
  );
}