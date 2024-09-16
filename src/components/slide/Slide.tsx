import { useEffect, useState } from "react";
import styles from "./index.module.css";

const Slide = () => {
  const slideItems = [
    {
      id: 1,
      name: "First",
      color: "tomato",
    },
    {
      id: 2,
      name: "Second",
      color: "lightYellow",
    },
    {
      id: 3,
      name: "Third",
      color: "pink",
    },
    {
      id: 4,
      name: "Fourth",
      color: "green",
    },
  ];

  const [positionValue, setPositionValue] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // 슬라이드의 너비 (각 슬라이드가 100px이라고 가정)
  const slideWidth = 300;

  // 전체 슬라이드 길이 계산 (원본 슬라이드 배열의 총 길이)
  const totalSlides = slideItems.length;
  const totalWidth = slideWidth * totalSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionValue((prevValue) => {
        // 슬라이드가 복사된 슬라이드의 끝에 도달하면 원본 배열로 점프
        if (prevValue >= totalWidth) {
          setIsTransitioning(false); // 점프할 때 트랜지션을 없앰
          return 0; // 원본 슬라이드 위치로 점프
        }
        return prevValue + 1; // 1px씩 이동
      });
    }, 10);
    return () => clearInterval(interval);
  }, [totalWidth]);

  // 슬라이드가 다시 원본으로 돌아오면 트랜지션을 다시 켜기
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true); // 트랜지션을 다시 활성화
      }, 20); // 다음 렌더링 타이밍에 활성화

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div
      className={styles.root}
      style={{ overflow: "hidden", width: `${slideWidth * 3}px` }}
    >
      <div
        className={styles.slideTrack}
        style={{
          display: "flex",
          width: `${totalWidth * 2}px`, // 두 번 반복된 슬라이드 배열의 총 너비
          transform: `translateX(-${positionValue}px)`, // 위치에 따라 슬라이드를 이동
          transition: isTransitioning ? "transform 0.1s linear" : "none", // 점프할 때 트랜지션 없음
        }}
      >
        {[...slideItems, ...slideItems].map((item, index) => (
          <div
            key={index}
            className={styles.item}
            style={{
              width: `${slideWidth}px`, // 슬라이드의 고정된 너비
              backgroundColor: item.color,
            }}
          >
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
