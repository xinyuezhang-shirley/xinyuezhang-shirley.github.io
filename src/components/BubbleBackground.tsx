import React from 'react';
import { motion } from 'framer-motion';

const BubbleBackground: React.FC = () => {
  return (
    <>
      <style>
        {`
          .bubble {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.25);
            animation: animate_4010 8s ease-in-out infinite;
          }

          .bubble:nth-child(2) {
            position: relative;
            zoom: 0.45;
            left: -10px;
            top: -100px;
            animation-delay: -4s;
          }

          .bubble:nth-child(3) {
            position: relative;
            zoom: 0.45;
            right: -80px;
            top: -300px;
            animation-delay: -6s;
          }

          .bubble:nth-child(4) {
            position: relative;
            zoom: 0.35;
            left: -120px;
            bottom: -200px;
            animation-delay: -3s;
          }

          .bubble:nth-child(5) {
            position: relative;
            zoom: 0.5;
            left: 0px;
            top: 200px;
            animation-delay: -5s;
          }

          @keyframes animate_4010 {
            0%,100% {
              transform: translateY(-20px);
            }

            50% {
              transform: translateY(20px);
            }
          }

          .bubble::before {
            content: '';
            position: absolute;
            top: 50px;
            left: 45px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #fff;
            z-index: 10;
            filter: blur(2px);
          }

          .bubble::after {
            content: '';
            position: absolute;
            top: 80px;
            left: 80px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            z-index: 10;
            filter: blur(2px);
          }

          .bubble span {
            position: absolute;
            border-radius: 50%;
          }

          .bubble span:nth-child(1) {
            inset: 10px;
            border-left: 15px solid #0fb4ff;
            filter: blur(8px);
          }

          .bubble span:nth-child(2) {
            inset: 10px;
            border-right: 15px solid #ff4484;
            filter: blur(8px);
          }

          .bubble span:nth-child(3) {
            inset: 10px;
            border-top: 15px solid #ffeb3b;
            filter: blur(8px);
          }

          .bubble span:nth-child(4) {
            inset: 30px;
            border-left: 15px solid #ff4484;
            filter: blur(12px);
          }

          .bubble span:nth-child(5) {
            inset: 10px;
            border-bottom: 10px solid #fff;
            filter: blur(8px);
            transform: rotate(330deg);
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bubble" style={{ top: '10%', left: '10%' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="bubble" style={{ top: '20%', right: '15%' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="bubble" style={{ bottom: '20%', left: '20%' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="bubble" style={{ top: '60%', right: '10%' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="bubble" style={{ bottom: '10%', right: '30%' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default BubbleBackground; 