import {Composition, staticFile} from 'remotion';
import {
  BeforeAfterMetaAd,
  beforeAfterMetaAdDefaults,
  beforeAfterMetaAdDurationInFrames,
  beforeAfterMetaAdFps,
  beforeAfterMetaAdHeight,
  beforeAfterMetaAdWidth,
  type BeforeAfterMetaAdProps,
} from './BeforeAfterMetaAd';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MetaAdsBeforeAfter"
      component={BeforeAfterMetaAd}
      durationInFrames={beforeAfterMetaAdDurationInFrames}
      fps={beforeAfterMetaAdFps}
      width={beforeAfterMetaAdWidth}
      height={beforeAfterMetaAdHeight}
      defaultProps={
        {
          ...beforeAfterMetaAdDefaults,
          cases: [
            {
              beforeSrc: staticFile('remotion-assets/case1-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case1-after.jpeg'),
              beforeObjectPosition: 'center center',
              afterObjectPosition: 'center 18%',
            },
            {
              beforeSrc: staticFile('remotion-assets/case2-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case2-after.jpeg'),
              beforeObjectPosition: 'center 24%',
              afterObjectPosition: 'center 18%',
            },
            {
              beforeSrc: staticFile('remotion-assets/case3-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case3-after.jpeg'),
              beforeObjectPosition: '58% 18%',
              afterObjectPosition: 'center 18%',
            },
            {
              beforeSrc: staticFile('remotion-assets/case4-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case4-after.jpeg'),
              beforeObjectPosition: 'center 22%',
              afterObjectPosition: '42% 18%',
            },
            {
              beforeSrc: staticFile('remotion-assets/case5-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case5-after.jpeg'),
              beforeObjectPosition: 'center 18%',
              afterObjectPosition: '58% 18%',
            },
            {
              beforeSrc: staticFile('remotion-assets/case6-before.jpeg'),
              afterSrc: staticFile('remotion-assets/case6-after.jpeg'),
              beforeObjectPosition: '50% 16%',
              afterObjectPosition: 'center 18%',
            },
          ],
        } satisfies BeforeAfterMetaAdProps
      }
    />
  );
};
