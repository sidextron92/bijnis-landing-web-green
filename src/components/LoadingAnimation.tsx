'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Loading animation that plays only on first visit (not on refresh)
 */
export function LoadingAnimation() {
  const [showLoading, setShowLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userInteractionTriggered = useRef(false);

  useEffect(() => {
    // Check if this is a first visit (not a refresh)
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setShowLoading(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (!showLoading) return;

    const video = videoRef.current;
    if (!video) return;

    let progressInterval: NodeJS.Timeout;
    let loadTimeout: NodeJS.Timeout;

    // Simulate loading progress
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // Hold at 90% until video actually loads
        }
        return prev + 10;
      });
    }, 100);

    // Fallback: If video doesn't load within 5 seconds, skip it
    loadTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setShowLoading(false);
          }
        });
      }
    }, 5000);

    // Video ready to play event
    const handleVideoCanPlay = () => {
      clearTimeout(loadTimeout);
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setVideoLoaded(true);

        // Small delay to ensure state update
        setTimeout(() => {
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setNeedsUserInteraction(false);
              })
              .catch(() => {
                // iOS autoplay blocked (Low Power Mode, Reduce Motion, or autoplay policy)
                // Show visual indicator for user to tap
                setNeedsUserInteraction(true);
              });
          }
        }, 100);
      }, 100);
    };

    // Video ended event
    const handleVideoEnded = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setShowLoading(false);
          }
        });
      }
    };

    // Error event
    const handleVideoError = () => {
      clearTimeout(loadTimeout);
      clearInterval(progressInterval);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setShowLoading(false);
          }
        });
      }
    };

    video.addEventListener('canplaythrough', handleVideoCanPlay, { once: true });
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('error', handleVideoError);

    // Force load the video
    video.load();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadTimeout);
      video.removeEventListener('canplaythrough', handleVideoCanPlay);
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('error', handleVideoError);
    };
  }, [showLoading]);

  // Handle iOS autoplay restriction - play video on first user interaction
  // This handles Low Power Mode, Reduce Motion, and other iOS restrictions
  useEffect(() => {
    if (!showLoading || !videoLoaded || !needsUserInteraction) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const playVideo = (e: Event) => {
      if (userInteractionTriggered.current) return;

      e.preventDefault();
      e.stopPropagation();
      userInteractionTriggered.current = true;

      if (video.paused) {
        video.play()
          .then(() => {
            setNeedsUserInteraction(false);
          })
          .catch(() => {
            // If video still can't play, skip the animation
            if (container) {
              gsap.to(container, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                  setShowLoading(false);
                }
              });
            }
          });
      } else {
        setNeedsUserInteraction(false);
      }
    };

    // Add click handler directly to the container for better UX
    container.addEventListener('click', playVideo, { once: true });
    container.addEventListener('touchend', playVideo, { once: true, passive: false });

    return () => {
      container.removeEventListener('click', playVideo);
      container.removeEventListener('touchend', playVideo);
    };
  }, [showLoading, videoLoaded, needsUserInteraction]);

  if (!showLoading) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#020D06] flex flex-col items-center justify-center ${
        needsUserInteraction ? 'cursor-pointer' : ''
      }`}
    >
      {!videoLoaded ? (
        // Loading Progress Bar
        <div className="w-full max-w-md px-6">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">bijnis</h2>
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#0A1B10] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#03B044] to-[#078236] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="mt-2 text-center">
            <span className="text-[#03B044] font-semibold">{progress}%</span>
          </div>
        </div>
      ) : null}

      {/* Tap to play indicator - shows when iOS blocks autoplay */}
      {needsUserInteraction && videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center animate-pulse">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#03B044] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#03B044]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold mb-2">Tap to Play</p>
            <p className="text-gray-400 text-sm">iOS playback restrictions detected</p>
          </div>
        </div>
      )}

      {/* Video Animation */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        } ${needsUserInteraction ? 'brightness-50' : ''}`}
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
        autoPlay={false}
      >
        <source src="/videos/logo_animation.webm" type="video/webm" />
        <source src="/videos/logo_animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
