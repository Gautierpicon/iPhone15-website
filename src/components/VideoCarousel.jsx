import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import VideoProgressControls from "./VideoProgressControls";
import { playImg, pauseImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  const [loadedData, setLoadedData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 760);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(isMobile ? "#image" : "#video", {
      scrollTrigger: {
        trigger: isMobile ? "#image" : "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId, isMobile]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    let anim;
    let animUpdate;

    if (!span[videoId]) return;

    const resetIndicator = () => {
      if (isPlaying) {
        gsap.to(videoDivRef.current[videoId], { width: "12px" });
        gsap.to(span[videoId], { backgroundColor: "#afafaf" });
      }
    };

    if (isMobile) {
      anim = gsap.to(span[videoId], {
        duration: hightlightsSlides[videoId].videoDuration,
        onUpdate: function () {
          const progress = Math.ceil(this.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? "10vw" : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          resetIndicator();
          if (videoId !== hightlightsSlides.length - 1) {
            setVideo((prev) => ({ ...prev, videoId: videoId + 1 }));
          } else {
            setVideo((prev) => ({ ...prev, isLastVideo: true }));
          }
        },
      });
    } else {
      anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: resetIndicator,
      });

      if (videoId === 0) anim.restart();

      animUpdate = () => {
        if (videoRef.current[videoId]) {
          anim.progress(
            videoRef.current[videoId].currentTime /
              hightlightsSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
        resetIndicator();
      }
    }

    return () => {
      if (anim) {
        anim.kill();
      }
      if (animUpdate) {
        gsap.ticker.remove(animUpdate);
      }
    };
  }, [videoId, startPlay, isPlaying, isMobile]);

  useEffect(() => {
    if (!isMobile && loadedData.length > 3) {
      isPlaying
        ? videoRef.current[videoId].play()
        : videoRef.current[videoId].pause();
    }
  }, [startPlay, videoId, isPlaying, loadedData, isMobile]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: true }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) =>
    setLoadedData((prev) => [...prev, e]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-auto flex-center rounded-3xl overflow-hidden bg-black">
                {isMobile ? (
                  <img
                    id="image"
                    className="pointer-events-none w-full h-auto"
                    src={list.image}
                    alt={`slide ${i}`}
                  />
                ) : (
                  <video
                    id="video"
                    playsInline
                    className="pointer-events-none w-full h-auto"
                    preload="auto"
                    muted
                    ref={(el) => (videoRef.current[i] = el)}
                    onEnded={() =>
                      i !== hightlightsSlides.length - 1
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last")
                    }
                    onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                    onPause={() => setVideo((prev) => ({ ...prev, isPlaying: false }))}
                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                )}
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, idx) => (
                  <p key={idx} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <VideoProgressControls 
          slides={hightlightsSlides}
          videoId={videoId}
          isLastVideo={isLastVideo}
          isPlaying={isPlaying}
          videoDivRef={videoDivRef}
          videoSpanRef={videoSpanRef}
          onControlClick={handleProcess}
          isMobile={isMobile}
          playImg={playImg}
          pauseImg={pauseImg}
          replayImg={replayImg}
        />
      </div>
    </div>
  );
};

export default VideoCarousel;