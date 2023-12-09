import React from 'react';
import Text from '../../Atoms/Text/Text';
import "./Bubble.css";

const Bubble = ({ text, type, propriety }) => {
  return (
  <div className="bubble">
    <Text text={text} type={type} propriety={propriety}/>
  </div>
  );
};

export default Bubble;