import { useEffect } from "react";

interface YouTubePlayerProps {
  videoId: string;
  setCurrentTime: (currentTime: number) => void;
  setPlayerRef: (playerRef: YT.Player) => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
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
        const windowWidth = window.innerWidth;

        const player = new YT.Player("player", {
          height: windowWidth > 1500 ? "315" : "200",
          width: windowWidth > 1500 ? "560" : "370",
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
          },
        });

        setPlayerRef(player);
      };

      if (window.YT && window.YT.Player) {
        window.onYouTubeIframeAPIReady?.();
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
