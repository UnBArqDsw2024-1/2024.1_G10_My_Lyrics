import { useEffect } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  setCurrentTime: (currentTime: number) => void;
  setPlayerRef: (playerRef: HTMLVideoElement) => void;
}

const YouTubePlayer = ({
  videoId,
  setCurrentTime,
  setPlayerRef,
}: YouTubePlayerProps) => {
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (typeof window !== 'undefined' && !window.YT) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = () => {
        const player = new YT.Player('player', {
          height: '315',
          width: '560',
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
          },
        });

        setPlayerRef(player);
      };
    };

    loadYouTubeAPI();
  }, [videoId]);

  const onPlayerReady = (event: any) => {
    setPlayerRef(event.target);
    console.log('onPlayerReady');

    setInterval(() => {
      setCurrentTime(event.target.getCurrentTime() * 1000);
    }, 100);
  };

  return <div id="player" />;
};

export default YouTubePlayer;
