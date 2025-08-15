import React from "react";
import styled from "styled-components";
import RotatingBubbles from "./components/RotatingBubbles";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #0c0c0c 0%,
    #1a1a2e 25%,
    #16213e 50%,
    #0f3460 75%,
    #0c0c0c 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  /* Add subtle animated stars in the background */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(
        2px 2px at 40px 70px,
        rgba(255, 255, 255, 0.8),
        transparent
      ),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(
        1px 1px at 130px 80px,
        rgba(255, 255, 255, 0.6),
        transparent
      ),
      radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: twinkle 4s ease-in-out infinite;
    opacity: 0.3;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <RotatingBubbles />
    </AppContainer>
  );
};

export default App;
