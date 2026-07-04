import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      {/* Black hole: fixed to viewport so zoom/resize never shifts it */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="rotate-180 w-full h-full object-cover scale-150"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      </div>

      <HeroContent />
    </div>
  );
};
