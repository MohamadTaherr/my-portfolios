'use client';

interface VideoPlayerProps {
  url: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  posterImage?: string;
  className?: string;
}

/**
 * Universal VideoPlayer component that supports:
 * - Vimeo embeds
 * - YouTube embeds
 * - Direct video files (MP4, WebM, etc.)
 */
export default function VideoPlayer({
  url,
  title = 'Video',
  autoPlay = false,
  controls = true,
  posterImage,
  className = '',
}: VideoPlayerProps) {
  // Extract Vimeo video ID from various URL formats
  const getVimeoId = (url: string): string | null => {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/video\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^?&\s]+)/,
      /youtube\.com\/v\/([^?&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Determine video type and render appropriate player
  const vimeoId = getVimeoId(url);
  const youtubeId = getYouTubeId(url);

  // Vimeo player
  if (vimeoId) {
    const vimeoParams = new URLSearchParams({
      autoplay: autoPlay ? '1' : '0',
      title: '0',
      byline: '0',
      portrait: '0',
      controls: controls ? '1' : '0',
    });

    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?${vimeoParams.toString()}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  // YouTube player
  if (youtubeId) {
    const youtubeParams = new URLSearchParams({
      autoplay: autoPlay ? '1' : '0',
      controls: controls ? '1' : '0',
      rel: '0',
      modestbranding: '1',
    });

    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?${youtubeParams.toString()}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  // Direct video file (MP4, WebM, etc.)
  return (
    <video
      controls={controls}
      autoPlay={autoPlay}
      poster={posterImage}
      className={`w-full h-full ${className}`}
      title={title}
    >
      <source src={url} type="video/mp4" />
      <source src={url} type="video/webm" />
      <p className="text-ivory/60 text-center p-8">
        Your browser does not support the video tag.
        <br />
        <a href={url} className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
          Download the video instead
        </a>
      </p>
    </video>
  );
}
