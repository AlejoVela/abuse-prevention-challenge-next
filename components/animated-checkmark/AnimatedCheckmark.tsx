import { FC, useEffect, useState, useCallback } from 'react';
import style from './AnimatedCheckmark.module.scss';

interface AnimatedCheckmarkProps {
  size?: 'small' | 'medium' | 'large';
  duration?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

const AnimatedCheckmark: FC<AnimatedCheckmarkProps> = ({
  size = 'medium',
  duration = 1000,
  onComplete,
  autoStart = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setIsComplete(false);
    
    setTimeout(() => {
      setIsComplete(true);
      setIsAnimating(false);
      onComplete?.();
    }, duration);
  }, [duration, onComplete]);

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart, startAnimation]);

  return (
    <div className={`${style['animated-checkmark']} ${style[`animated-checkmark--${size}`]}`}>
      <div className={`${style['checkmark-circle']} ${isAnimating ? style['checkmark-circle--animating'] : ''}`}>
        <div className={`${style['checkmark-background']} ${isComplete ? style['checkmark-background--complete'] : ''}`}>
          <svg 
            className={`${style['checkmark-svg']} ${isComplete ? style['checkmark-svg--complete'] : ''}`}
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              className={style['checkmark-circle-outline']}
              cx="26" 
              cy="26" 
              r="25" 
              fill="none"
            />
            <path 
              className={`${style['checkmark-check']} ${isComplete ? style['checkmark-check--complete'] : ''}`}
              fill="none" 
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        
        {/* Efectos de partículas */}
        {isComplete && (
          <div className={style['particles-container']}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`${style['particle']} ${style[`particle--${i + 1}`]}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Ondas de expansión */}
      {isAnimating && (
        <>
          <div className={`${style['ripple']} ${style['ripple--1']}`} />
          <div className={`${style['ripple']} ${style['ripple--2']}`} />
          <div className={`${style['ripple']} ${style['ripple--3']}`} />
        </>
      )}
    </div>
  );
};

export default AnimatedCheckmark;