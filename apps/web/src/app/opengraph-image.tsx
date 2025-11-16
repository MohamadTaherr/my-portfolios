import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Edmond Haddad - Award-Winning Scriptwriter & Creative Producer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
        }}
      >
        {/* Top Border */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
            opacity: 0.5,
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: '#f5f5dc',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Edmond Haddad
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 36,
              color: '#d4af37',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.05em',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            Award-Winning Scriptwriter
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#d4af37',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.05em',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginTop: -15,
            }}
          >
            & Creative Producer
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#f5f5dc',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.85,
              marginTop: 30,
              textAlign: 'center',
            }}
          >
            Crafting Stories That Move People
          </div>

          {/* Decorative Dots */}
          <div
            style={{
              display: 'flex',
              gap: 500,
              marginTop: 20,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#d4af37',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#d4af37',
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Bottom Border */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
            opacity: 0.5,
          }}
        />

        {/* Film Reel Decorations */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 100,
            display: 'flex',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 100,
            display: 'flex',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '2px solid #d4af37',
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
