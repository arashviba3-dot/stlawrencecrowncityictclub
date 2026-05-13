import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Download, Music as MusicIcon, Loader2 } from "lucide-react";
import anthem from "@/assets/school-anthem.mp3";
import crown from "@/assets/crown-city-wuuu.mp3";
import rise from "@/assets/we-rise-together.mp3";
import riseAnthem from "@/assets/we-rise-together-anthem.mp3";

const songs = [
  { title: "School Anthem", artist: "St Lawrence Crown City", src: anthem, file: "school-anthem.mp3" },
  { title: "Crown City Wuuu", artist: "ICT Club", src: crown, file: "crown-city-wuuu.mp3" },
  { title: "We Rise Together", artist: "ICT Club", src: rise, file: "we-rise-together.mp3" },
  { title: "We Rise Together (Anthem)", artist: "ICT Club", src: riseAnthem, file: "we-rise-together-anthem.mp3" },
];

const Music = () => {
  const { loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-full bg-primary/15 mb-4">
            <MusicIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-glow">Music</h1>
          <p className="text-muted-foreground mt-2">Listen to and download our club songs.</p>
        </div>

        <div className="space-y-4">
          {songs.map((s) => (
            <div key={s.file} className="glass-card rounded-2xl p-5 border border-primary/20 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="font-heading font-semibold text-lg">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.artist}</p>
                </div>
                <a href={s.src} download={s.file}>
                  <Button size="sm" variant="outline"><Download size={14} className="mr-1" /> Download</Button>
                </a>
              </div>
              <audio controls preload="metadata" src={s.src} className="w-full">
                Your browser does not support audio.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
