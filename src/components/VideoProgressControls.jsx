import React from 'react';

const VideoProgressControls = ({ 
  slides, 
  videoId, 
  isLastVideo, 
  isPlaying, 
  videoDivRef,
  videoSpanRef,
  onControlClick,
  isMobile,
  playImg,
  pauseImg,
  replayImg
}) => {
  return (
    <div className={`flex-center ${isMobile ? 'w-full' : 'mt-10'}`}>
      <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
        {slides.map((_, i) => (
          <span
            key={i}
            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            ref={(el) => (videoDivRef.current[i] = el)}
          >
            <span
              className="absolute h-full w-full rounded-full"
              ref={(el) => (videoSpanRef.current[i] = el)}
            />
          </span>
        ))}
      </div>

      <button className="control-btn">
        <img
          src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
          alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          onClick={() => {
            if (isLastVideo) {
              onControlClick("video-reset");
            } else if (!isPlaying) {
              onControlClick("play");
            } else {
              onControlClick("pause");
            }
          }}
        />
      </button>
    </div>
  );
};

export default VideoProgressControls;