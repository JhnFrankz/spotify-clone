import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player";

export function CardPlayButton({ id }) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    // promises
    fetch(`/api/get-info-playlist.json?id=${id}`) // return promise
      .then(res => res.json()) // recovery json from promise
      .then(data => { // data is the json
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });
        // We already have the songs of the playlist selected in the global state
      });

    // async await
    // const res = await fetch(`/api/get-info-playlist.json?id=${id}`);
    // const data = await res.json();
    // const { songs, playlist } = data;
  }

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}