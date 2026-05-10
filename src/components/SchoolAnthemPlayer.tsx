import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Pause, Play, SkipForward, SkipBack } from "lucide-react";
import schoolAnthem from "@/assets/school-anthem.mp3";
import weRiseTogetherAnthem from "@/assets/we-rise-together-anthem.mp3";
import weRiseTogether from "@/assets/we-rise-together.mp3";
import crownCityWuuu from "@/assets/crown-city-wuuu.mp3";

const PLAYLIST = [
  { title: "St Lawrence Anthem", src: schoolAnthem },
  { title: "Crown City Wuuuuu", src: crownCityWuuu },
  { title: "We Rise Together", src: weRiseTogether },
  { title: "We Rise Together — Uganda Youth Anthem", src: weRiseTogetherAnthem },
];

const SchoolAnthemPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.muted = true;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (playing || !muted) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [trackIdx]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (!next && !playing) audio.play().then(() => setPlaying(true)).catch(() => {});
  };

  const next = () => setTrackIdx((i) => (i + 1) % PLAYLIST.length);
  const prev = () => setTrackIdx((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  const onEnded = () => next();

  const current = PLAYLIST[trackIdx];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src={current.src} preload="auto" onEnded={onEnded} />
      <div
        className={`flex items-center gap-2 rounded-full bg-background/85 backdrop-blur-md border border-primary/40 shadow-lg shadow-primary/30 transition-all duration-300 ${
          expanded ? "px-3 py-2" : "p-2"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {expanded && (
          <button
            onClick={prev}
            aria-label="Previous track"
            className="w-8 h-8 rounded-full text-foreground hover:bg-primary/15 flex items-center justify-center transition-colors"
          >
            <SkipBack size={14} />
          </button>
        )}

        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-pop text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-md shadow-primary/40"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {expanded && (
          <>
            <button
              onClick={next}
              aria-label="Next track"
              className="w-8 h-8 rounded-full text-foreground hover:bg-primary/15 flex items-center justify-center transition-colors"
            >
              <SkipForward size={14} />
            </button>

            <div className="flex flex-col px-1 max-w-[180px] animate-fade-in">
              <span className="text-[10px] uppercase tracking-widest text-glow font-semibold">
                Now Playing · {trackIdx + 1}/{PLAYLIST.length}
              </span>
              <span className="text-xs font-medium text-foreground flex items-center gap-1 truncate">
                <Music size={12} className="text-pink-pop shrink-0" />
                <span className="truncate">{current.title}</span>
              </span>
            </div>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
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
