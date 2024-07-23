import { LayoutAnimation } from "react-native";

export const customAnimation = {
  duration: 100, 
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
  }
};

export const customAnimationSlow = {
  duration: 300, 
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
  }
};