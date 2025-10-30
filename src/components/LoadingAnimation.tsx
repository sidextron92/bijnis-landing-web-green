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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    // Fallback: If video doesn't load within 2 seconds, skip it
    loadTimeout = setTimeout(() => {
      console.log('Video loading timeout - skipping animation');
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
    }, 2000);

    // Video loaded event
    const handleVideoLoaded = () => {
      clearTimeout(loadTimeout);
      clearInterval(progressInterval);
      setProgress(100);
      setVideoLoaded(true);

      // Small delay before trying to play
      setTimeout(() => {
        // Try to play the video
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Video playing successfully');
          }).catch((error) => {
            console.log('Video autoplay failed:', error);
            // Skip to main content if autoplay fails
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
          });
        }
      }, 100);
    };

    // Video ended event
    const handleVideoEnded = () => {
      // Fade out the loading screen
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
      console.log('Video loading error - skipping animation');
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

    video.addEventListener('loadeddata', handleVideoLoaded);
    video.addEventListener('canplaythrough', handleVideoLoaded);
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('error', handleVideoError);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadTimeout);
      video.removeEventListener('loadeddata', handleVideoLoaded);
      video.removeEventListener('canplaythrough', handleVideoLoaded);
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('error', handleVideoError);
    };
  }, [showLoading]);

  if (!showLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020D06] flex flex-col items-center justify-center"
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

      {/* Video Animation */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
        autoPlay={false}
      >
        <source src="/videos/logo_animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
