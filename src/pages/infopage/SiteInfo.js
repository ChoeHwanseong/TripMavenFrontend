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
            AI 기술을 활용하여 인간의 주관적인 감정을 배제하고,<br/>
            데이터에 기반한 평가를 수행하여 보다 객관적인 평가를 받을 수 있습니다.<br />
            가이드의 말투, 행동, 대본 등을 평가 받을 수 있습니다. <br />
            또한 가이드의 장점들을 키워드로 뽑아내어 가이드 홍보 또한 가능합니다.<br/>
            
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
            가이드가 올려놓은 여행 상품을 보고 계획을 편하게 세울 수 있습니다.<br />
            가성비 좋은 숙소, 식당 추천, 효율적인 일정 짜기 등<br/>
            불필요한 지출을 줄이고 여행을 더욱 알차게 즐길 수 있도록 도와줍니다.
          </p>
        </div>
        <div className={styles.feature}>
          <p className={styles.featureText}>
            OpenAI ChatGPT 를 이용한 챗봇을 활용하여<br />
            실시간으로 사용자의 입력을 처리하고 빠르게 응답을 생성할 수 있어,<br />
            대화 흐름이 끊기지 않도록 지원합니다.<br/>
            또한 사용자와의 대화를 통해 얻은 데이터를 분석하여,<br/>
            사용자의 니즈와 행동 패턴을 파악할 수 있습니다.
          </p>
          <img
            src="../../images/openAI.jpg"
            alt="openAI"
            className={styles.AI_Image}
          />
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
