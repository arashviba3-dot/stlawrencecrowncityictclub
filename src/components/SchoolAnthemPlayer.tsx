import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";

/**
 * Floating school anthem player.
 * Replace AUDIO_SRC with the actual St Lawrence Crown City school song file
 * (drop an mp3 in src/assets/ and import it here, or host it and paste the URL).
 */
const AUDIO_SRC =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=inspiring-cinematic-ambient-116199.mp3";

const SchoolAnthemPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.muted = true;
    // Attempt autoplay (muted is allowed by browsers)
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (!next && !playing) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />
      <div
        className={`flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 shadow-lg shadow-primary/20 transition-all duration-300 ${
          expanded ? "px-3 py-2" : "p-2"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause school anthem" : "Play school anthem"}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {expanded && (
          <>
            <div className="flex flex-col px-1 animate-fade-in">
              <span className="text-[10px] uppercase tracking-widest text-glow font-semibold">
                Now Playing
              </span>
              <span className="text-xs font-medium text-foreground flex items-center gap-1">
                <Music size={12} className="text-pink-pop" />
                St Lawrence Anthem
              </span>
            </div>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute anthem" : "Mute anthem"}
              className="w-9 h-9 rounded-full border border-primary/30 text-foreground hover:bg-primary/10 flex items-center justify-center transition-colors"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolAnthemPlayer;
