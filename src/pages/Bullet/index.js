import React, { useState, useRef,useEffect } from 'react';

import { observer } from "mobx-react-lite"
const DEFAULT_RATIO = 260.67; // 默认的弹幕速度
// function generateRandomString(length) {
//     let result = '';
//     const characters = '阿斯利康等哈是老客户大剌剌我当前偶尔哈维爱唯欧的武器和科维奇金额和冷酷无情和';
//     const charactersLength = characters.length;

//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result;
//   }

// const bullets = new Array(10).fill().map((item,idx) => generateRandomString(Math.random() * 10))
const BulletScreen = ({ bulletList }) => {
  const [bulletTracks, setBulletTracks] = useState([]);
  const [animationTime, setAnimationTime] = useState(12);
  const trackRef = useRef(null);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    const random = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = random(0, i);
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const shuffleTracks = new Array(3).fill().map((item) => shuffleArray(bulletList));
    setBulletTracks(shuffleTracks);
  }, [bulletList]);

  useEffect(() => {
    const trackElement = trackRef.current;
    if (trackElement) {
      const trackLength = trackElement.offsetWidth;
      const newAnimationTime = trackLength / DEFAULT_RATIO;
      setAnimationTime(newAnimationTime);
    }
  }, [bulletTracks]);

  return (
    <div className="bullet_container">
      {bulletTracks.map((track, trackIndex) => (
        <div className="double_track" key={trackIndex}>
          <div
            ref={trackRef}
            className="bullet_track"
            style={{
              top: `${trackIndex * 2}rem`,
              animationDuration: `${animationTime}s`,
            }}
          >
            {[...track, ...track].map((bullet, index) => (
              <span key={index} className="bullet" style={{ marginRight: 100 }}>
                {bullet}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

 
// const Demo = () => {
//   return (
//   <div style={{height:'100%'}}>
//      <BulletScreen bulletList={bullets}/>
//     </div>
//   )
// }
export default observer(BulletScreen)