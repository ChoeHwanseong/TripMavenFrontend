import React from 'react';
import styles from '../../styles/infopage/SiteInfo.module.css';

const SiteIntroduction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerImage}>
        <img
          src="../../images/siteInfoHeader.png"
          alt="Background"
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.content}>
        <img className={styles.logoImgage} alt="TripMavenLogo" src="../../images/TripMavenLogo.png"/>
        <p className={styles.description}>
          은 여행 가이드와 여행객 모두를 위한 사이트 입니다.<br />
          가이드 평가 및 여행 계획 등 여러가지 기능을 사용할 수 있습니다.
        </p>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <p className={styles.featureText}>
            AI 기술을 활용하여 가이드 평가를 받을 수 있습니다.<br />
            가이드의 말투, 행동, 대본 등을 평가 받을 수 있습니다.
          </p>
          <img
            src="../../images/AI_Image.png"
            alt="AI 평가"
            className={styles.AI_Image}
          />
        </div>

        <div className={styles.feature}>
          <img
            src="../../images/tripImage.png"
            alt="여행 계획"
            className={styles.featureImage}
          />
          <p className={styles.featureText}>
            여행 계획을 세우는 것을 힘들어 하는 사람을 위해<br />
            가이드가 올려놓은 여행 상품을 보고<br />
            여행 계획을 편하게 세울 수 있습니다.
          </p>
        </div>
        <div className={styles.feature}>
          <p className={styles.text}>
            최적의 여행 루트로 최고의 트립을 즐기고 싶은 분들을 위해<br />
            현재 최고 가이드들이 지역별로 여행 상품을 공개합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteIntroduction;
