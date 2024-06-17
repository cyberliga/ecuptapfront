import { UIActivityIndicator } from 'react-native-indicators';

const Loader = ({size, color}:{ size?: number, color?: string}) => {

  return (
    <>
      <UIActivityIndicator color={color ?  color : '#4EF2FF' } size={size? size : 50} style={{zIndex: 2}}
       animationDuration={2000}  count={8}/>
    </>
  );
};

export default Loader;