import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import {
  
  useWindowDimensions,
} from 'react-native';
const BackgroundGradient = () => {
  const {width, height} = useWindowDimensions();
  return (
   <Svg
  width={width}
  height={height}
  viewBox={`0 0 ${width} ${height}`}
  preserveAspectRatio="none"
  style={StyleSheet.absoluteFill}
  pointerEvents="none"
>
      <Defs>
       
        <LinearGradient
          id="exactTopRightToBottomLeft"
          x1="1"
          y1="0"
          x2="0"
          y2="1"
        >
         
          <Stop offset="0%" stopColor="#D2DDFF" stopOpacity="0" />
          <Stop offset="15%" stopColor="#D2DDFF" stopOpacity="0.05" />
          
        
          <Stop offset="38%" stopColor="#ECE3FF" stopOpacity="0.45" />
          <Stop offset="50%" stopColor="#E2D4FF" stopOpacity="0.55" />
          <Stop offset="62%" stopColor="#ECE3FF" stopOpacity="0.45" />
          
         
          <Stop offset="85%" stopColor="#D5E0FF" stopOpacity="0.05" />
          <Stop offset="100%" stopColor="#C4D7FF" stopOpacity="0" />
        </LinearGradient>

       
        <RadialGradient
          id="skyBlueTopLeft"
          cx="0%"
          cy="0%"
          rx="130%"
          ry="130%"
        >
          <Stop offset="0%" stopColor="#DDF5FF" />
          <Stop offset="50%" stopColor="#B3CDFF" />
          <Stop offset="100%" stopColor="#D2DDFF" stopOpacity="0" />
        </RadialGradient>

        
        <RadialGradient
          id="skyBlueBottomRight"
          cx="100%"
          cy="100%"
          rx="130%"
          ry="130%"
        >
          <Stop offset="0%" stopColor="#CEEAFF" />
          <Stop offset="50%" stopColor="#B3CDFF" />
          <Stop offset="100%" stopColor="#D5E0FF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      
      <Rect width="100%" height="100%" fill="url(#skyBlueTopLeft)" />
      <Rect width="100%" height="100%" fill="url(#skyBlueBottomRight)" />
      
     
      <Rect width="100%" height="100%" fill="url(#exactTopRightToBottomLeft)" />
    </Svg>
  );
};

export default BackgroundGradient;
