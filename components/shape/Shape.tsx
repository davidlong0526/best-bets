import React from 'react';
import styles from './Shape.module.css';

interface Props {
  shape: string;
}

const getClassName = (letter: string) => {
  if (letter === 'W') {
    return 'victory';
  }
  if (letter === 'D') {
    return 'draw';
  }

  if (letter === 'L') {
    return 'lost';
  }
};

const Shape: React.FC<Props> = ({ shape }: Props) => (
  <span>
    {shape.split('').map((letter, i) => (
      <span className={styles[getClassName(letter)]} key={i}>
        {letter}
      </span>
    ))}
  </span>
);

export default React.memo(Shape);