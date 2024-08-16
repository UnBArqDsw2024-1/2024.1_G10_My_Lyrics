import { useEffect } from "react";

interface YouTubePlayerProps {
  videoId: string;
  setCurrentTime: (currentTime: number) => void;
  setPlayerRef: (playerRef: YT.Player) => void;
}

const YouTubePlayer = ({
  videoId,
  setCurrentTime,
  setPlayerRef,
}: YouTubePlayerProps) => {
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (typeof window !== "undefined" && !window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = () => {
        const player = new YT.Player("player", {
          height: "315",
          width: "560",
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
          },
        });

        setPlayerRef(player);
      };

      if (window.YT && window.YT.Player) {
        window.onYouTubeIframeAPIReady();
      }
    };

    loadYouTubeAPI();
  }, [videoId]);

  const onPlayerReady = (event: YT.PlayerEvent) => {
    setPlayerRef(event.target);
    console.log("onPlayerReady");

    setInterval(() => {
      setCurrentTime(event.target.getCurrentTime() * 1000);
    }, 100);
  };

  return <div id="player" />;
};

export default YouTubePlayer;
