import React, { useState, useEffect, useRef } from 'react';
import {
  PlayerContainer,
  DisplayWindow,
  ControlPanel,
  DisplaySection,
  TimeDisplay,
  InfoDisplay,
  Visualizer,
  Controls,
  ControlButton,
  PlayButton,
  Progress,
  GlobalStyle
} from './VideoPlayer.styles';
import OptimizedImage from '../UI/OptimizedImage';

interface VideoPlayerProps {
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title }) => {
  const [displayTime, setDisplayTime] = useState('00:00');
  const [statusText, setStatusText] = useState(title);
  const [animationState, setAnimationState] = useState<'play' | 'pause' | 'stop' | 'forward' | 'backward'>('stop');
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gifRef = useRef<HTMLImageElement>(null);

  // 预加载 GIF
  useEffect(() => {
    const preloadGif = new Image();
    preloadGif.src = '/video-cover.gif';
  }, []);

  const updateProgress = (clientX: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const handleWidth = 14; // 滑块的宽度
    const x = clientX - rect.left;
    const width = rect.width - handleWidth; // 减去滑块宽度
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setProgress(percentage);
    return percentage;
  };

  // 处理进度条拖动
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgress(e.clientX, e.currentTarget);
  };

  const handleProgressMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const element = document.querySelector('.progress-bar') as HTMLDivElement;
    if (element) {
      const newProgress = updateProgress(e.clientX, element);
      if (audioRef.current) {
        const newTime = (newProgress / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    updateProgress(touch.clientX, e.currentTarget);
  };

  const handleProgressTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const element = document.querySelector('.progress-bar') as HTMLDivElement;
    if (element) {
      updateProgress(touch.clientX, element);
    }
  };

  const handleProgressTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleProgressMove);
      window.addEventListener('mouseup', handleProgressMouseUp);
      window.addEventListener('touchmove', handleProgressTouchMove);
      window.addEventListener('touchend', handleProgressTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleProgressMove);
        window.removeEventListener('mouseup', handleProgressMouseUp);
        window.removeEventListener('touchmove', handleProgressTouchMove);
        window.removeEventListener('touchend', handleProgressTouchEnd);
      };
    }
  }, [isDragging]);

  // 模拟时间变化效果
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let time = 0;

    const updateTime = () => {
      switch (animationState) {
        case 'play':
          time = (time + 1) % 3600;
          break;
        case 'forward':
          time = (time + 5) % 3600;
          break;
        case 'backward':
          time = Math.max(0, time - 5);
          break;
        case 'stop':
          time = 0;
          break;
      }
      
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setDisplayTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    if (animationState !== 'pause' && animationState !== 'stop') {
      timer = setInterval(updateTime, 1000);
    }

    return () => clearInterval(timer);
  }, [animationState]);

  const handlePlay = () => {
    setStatusText('正在播放 - ' + title);
    setAnimationState('play');
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const handlePause = () => {
    setStatusText('已暂停 - ' + title);
    setAnimationState('pause');
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const handleStop = () => {
    setDisplayTime('00:00');
    setStatusText('已停止 - ' + title);
    setAnimationState('stop');
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePrevious = () => {
    setStatusText('快退中 - ' + title);
    setAnimationState('backward');
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const handleNext = () => {
    setStatusText('快进中 - ' + title);
    setAnimationState('forward');
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
    }
  };

  // 监听音频时间更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const percentage = (currentTime / duration) * 100;
      
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      setDisplayTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const handleEnded = () => {
      handleStop();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <PlayerContainer>
      <GlobalStyle />
      <audio ref={audioRef} src="/music.m4a" />
      <DisplayWindow>
        {isPlaying ? (
          <img 
            ref={gifRef}
            src="/video-cover.gif" 
            alt="Video Cover"
            loading="eager"
            style={{
              transform: `scale(${1 + (progress / 100)})`,
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <OptimizedImage 
            src="/video-cover.webp" 
            alt="Video Cover" 
            style={{
              transform: `scale(${1 + (progress / 100)})`,
              transition: 'transform 0.3s ease'
            }}
          />
        )}
      </DisplayWindow>
      
      <ControlPanel>
        <DisplaySection>
          <TimeDisplay>{displayTime}</TimeDisplay>
          <InfoDisplay animationState={animationState}>
            <span>{statusText}</span>
          </InfoDisplay>
          <Visualizer />
        </DisplaySection>
        
        <Controls>
          <ControlButton 
            aria-label="Previous" 
            onClick={handlePrevious}
          >|◀◀</ControlButton>
          <PlayButton 
            aria-label="Play" 
            onClick={handlePlay}
          >▶</PlayButton>
          <ControlButton 
            aria-label="Pause" 
            onClick={handlePause}
          >||</ControlButton>
          <ControlButton 
            aria-label="Stop" 
            onClick={handleStop}
          >■</ControlButton>
          <ControlButton 
            aria-label="Next"
            onClick={handleNext}
          >▶▶|</ControlButton>
          
          <Progress
            className="progress-bar"
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
            <div 
              className="progress-handle" 
              style={{ left: `calc(${progress}% - ${progress === 100 ? 14 : 0}px)` }}
            />
          </Progress>
        </Controls>
      </ControlPanel>
    </PlayerContainer>
  );
};

export default VideoPlayer; 