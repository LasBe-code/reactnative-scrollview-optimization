import { Image, View } from 'react-native';

export const MyImage = ({ url, width, height, isRender }) => {
  return (
    <View style={{ width, height }}>
      {isRender && <Image src={url} style={{ width, height }} />}
    </View>
  );
};
