import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const beforeAfterMetaAdWidth = 1080;
export const beforeAfterMetaAdHeight = 1920;
export const beforeAfterMetaAdFps = 30;

const caseFrames = 72;
const outroFrames = 60;

export type BeforeAfterCase = {
  beforeSrc: string;
  afterSrc: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
};

export type BeforeAfterMetaAdProps = {
  cases: BeforeAfterCase[];
  beforeLabel: string;
  afterLabel: string;
  outroTitle: string;
  outroButton: string;
};

export const beforeAfterMetaAdDefaults: Omit<BeforeAfterMetaAdProps, 'cases'> = {
  beforeLabel: 'Antes',
  afterLabel: 'Depois',
  outroTitle: 'Seu proximo retrato pode ser esse.',
  outroButton: 'Agende seu ensaio',
};

export const beforeAfterMetaAdDurationInFrames = 6 * caseFrames + outroFrames;

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const textSans = '"Avenir Next", "Helvetica Neue", sans-serif';
const textSerif = '"Iowan Old Style", "Baskerville", "Times New Roman", serif';

const imageStyle = (scale: number, objectPosition = 'center center'): React.CSSProperties => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition,
  transform: `scale(${scale})`,
});

const darkOverlay: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(6,6,6,0.18) 0%, rgba(6,6,6,0.05) 26%, rgba(6,6,6,0.12) 56%, rgba(6,6,6,0.64) 100%)',
};

const Tag: React.FC<{label: string; light?: boolean}> = ({label, light = false}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 20px',
        borderRadius: 999,
        fontFamily: textSans,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: light ? '#fff8f0' : '#fff8f0',
        background: light ? 'rgba(255,248,240,0.14)' : 'rgba(6,6,6,0.52)',
        border: '1px solid rgba(255,248,240,0.14)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: '#dcc09f',
        }}
      />
      {label}
    </div>
  );
};

const CaseScene: React.FC<{
  sceneFrame: number;
  item: BeforeAfterCase;
  beforeLabel: string;
  afterLabel: string;
}> = ({sceneFrame, item, beforeLabel, afterLabel}) => {
  const inOpacity = interpolate(sceneFrame, [0, 6], [0, 1], clamp);
  const outOpacity = interpolate(sceneFrame, [caseFrames - 8, caseFrames], [1, 0], clamp);
  const sceneOpacity = inOpacity * outOpacity;

  const beforeOpacity = interpolate(sceneFrame, [0, 18, 28], [1, 1, 0], clamp);
  const splitOpacity = interpolate(sceneFrame, [20, 24, 46, 52], [0, 1, 1, 0], clamp);
  const afterOpacity = interpolate(sceneFrame, [44, 50, caseFrames], [0, 1, 1], clamp);
  const reveal = interpolate(sceneFrame, [22, 46], [0, 1], clamp);

  const beforeScale = interpolate(sceneFrame, [0, caseFrames], [1.02, 1.08], clamp);
  const afterScale = interpolate(sceneFrame, [0, caseFrames], [1.03, 1.1], clamp);

  return (
    <AbsoluteFill style={{opacity: sceneOpacity}}>
      <AbsoluteFill style={{opacity: beforeOpacity}}>
        <Img
          src={item.beforeSrc}
          style={imageStyle(beforeScale, item.beforeObjectPosition ?? 'center center')}
        />
        <div style={darkOverlay} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: splitOpacity}}>
        <Img
          src={item.beforeSrc}
          style={imageStyle(1.05, item.beforeObjectPosition ?? 'center center')}
        />
        <div style={darkOverlay} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: `${reveal * 100}%`,
            overflow: 'hidden',
          }}
        >
          <Img
            src={item.afterSrc}
            style={{
              ...imageStyle(1.05, item.afterObjectPosition ?? 'center center'),
              position: 'absolute',
              inset: 0,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${(1 - reveal) * 100}%`,
            width: 5,
            marginLeft: -2.5,
            background: 'rgba(255,248,240,0.92)',
            boxShadow: '0 0 26px rgba(255,248,240,0.28)',
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: afterOpacity}}>
        <Img
          src={item.afterSrc}
          style={imageStyle(afterScale, item.afterObjectPosition ?? 'center center')}
        />
        <div style={darkOverlay} />
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 64,
          opacity: beforeOpacity + splitOpacity * 0.7,
        }}
      >
        <Tag label={beforeLabel} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 64,
          right: 64,
          opacity: afterOpacity + splitOpacity * 0.7,
        }}
      >
        <Tag label={afterLabel} light />
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<{
  title: string;
  button: string;
  images: string[];
}> = ({title, button, images}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = beforeAfterMetaAdDurationInFrames - outroFrames;
  const localFrame = frame - start;

  const cardRise = spring({
    frame: localFrame,
    fps,
    config: {damping: 200},
    durationInFrames: 22,
  });
  const opacity = interpolate(localFrame, [0, 5], [0, 1], clamp);

  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at top, rgba(220,192,159,0.14), transparent 34%), linear-gradient(180deg, #15120f 0%, #060606 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '120px 0 480px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          transform: `translateY(${interpolate(cardRise, [0, 1], [36, 0])}px)`,
        }}
      >
        {images.slice(0, 3).map((src, index) => (
          <div
            key={src}
            style={{
              width: 280,
              borderRadius: 34,
              overflow: 'hidden',
              background: '#111',
              boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
              transform: `translateY(${index === 1 ? -18 : 24}px) rotate(${index === 0 ? -5 : index === 2 ? 5 : 0}deg)`,
            }}
          >
            <Img src={src} style={imageStyle(1.05, 'center 18%')} />
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 110,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: textSerif,
            fontSize: 86,
            lineHeight: 0.94,
            color: '#fff8f0',
            textAlign: 'center',
            maxWidth: 920,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '22px 34px',
            borderRadius: 999,
            background: '#fff8f0',
            color: '#0c0c0c',
            fontFamily: textSans,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '0.03em',
          }}
        >
          {button}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BeforeAfterMetaAd: React.FC<BeforeAfterMetaAdProps> = ({
  cases,
  beforeLabel,
  afterLabel,
  outroTitle,
  outroButton,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: '#060606'}}>
      {cases.map((item, index) => {
        const sceneStart = index * caseFrames;
        const sceneFrame = frame - sceneStart;
        if (sceneFrame < 0 || sceneFrame > caseFrames) {
          return null;
        }

        return (
          <CaseScene
            key={index}
            sceneFrame={sceneFrame}
            item={item}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        );
      })}

      {frame >= beforeAfterMetaAdDurationInFrames - outroFrames ? (
        <OutroScene
          title={outroTitle}
          button={outroButton}
          images={cases.map((item) => item.afterSrc)}
        />
      ) : null}
    </AbsoluteFill>
  );
};
