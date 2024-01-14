import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../assets/json//home_Loader_believer.json'; // Replace with your animation file
import { loaderStyle } from '../../../Theme/modal.style';
import "../App-Loader/index.css"

const SplashScreen = ({ onFinish }) => {
  const [animationIsFinished, setAnimationIsFinished] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimationIsFinished(true);
    }, 3500); 
  }, []);

  useEffect(() => {
    if (animationIsFinished) {
      onFinish();
    }
  }, [animationIsFinished, onFinish]);

  return (
    <div className='splash-screen' >
      <Lottie animationData={animationData} />
    </div>
  );
};

export default SplashScreen