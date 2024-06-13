declare module 'react-native-progress/Bar' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface ProgressBarProps {
      progress?: number;
      indeterminate?: boolean;
      color?: string;
      unfilledColor?: string;
      borderColor?: string;
      borderWidth?: number;
      width?: number | null;
      height?: number;
      borderRadius?: number;
      useNativeDriver?: boolean;
      style?: ViewStyle | TextStyle;
    }
  
    export default class ProgressBar extends Component<ProgressBarProps> {}
  }