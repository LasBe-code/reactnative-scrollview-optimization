import { ScrollView, View } from 'react-native';
import { MyImage } from './MyImage';
import { useRef, useState } from 'react';

const dataList = [
  {
    url: 'https://cdn.pixabay.com/photo/2014/04/05/11/39/biology-316571_1280.jpg',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2014/04/05/11/39/biology-316571_1280.jpg',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2014/04/05/11/39/biology-316571_1280.jpg',
  },
];

export default function App() {
  const scrollViewRef = useRef(null);
  const targetRefList = useRef([]);
  const [isRenderList, setIsRenderList] = useState(dataList.map(() => true));

  const handleOnScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (!offsetY || !scrollViewRef?.current) return;

    // ref list 반복
    targetRefList.current.forEach((targetRef, index) => {
      targetRef?.measureLayout(scrollViewRef.current, (x, y, width, height) => {
        const range = 700;
        const isOutsideUpDiff = Math.abs(y - offsetY) > range;
        const isOutSideDownDiff = Math.abs(y + height - offsetY) > range;
        const isInContent = offsetY >= y && offsetY <= y + height;

        // isRenderList에서 해당 index로 set
        if (!isOutsideUpDiff || !isOutSideDownDiff) {
          setIsRenderList((prev) => {
            const temp = [...prev];
            temp[index] = true;
            return temp;
          });
        }

        if (!isInContent && isOutsideUpDiff && isOutSideDownDiff) {
          setIsRenderList((prev) => {
            const temp = [...prev];
            temp[index] = false;
            return temp;
          });
        }
      });
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView ref={scrollViewRef} onScroll={handleOnScroll}>
        <View ref={(element) => (targetRefList.current[0] = element)}>
          <MyImage
            width={300}
            height={1000}
            url={dataList[0].url}
            isRender={isRenderList[0]}
          />
        </View>
        <View ref={(element) => (targetRefList.current[1] = element)}>
          <MyImage
            width={300}
            height={1000}
            url={dataList[1].url}
            isRender={isRenderList[1]}
          />
        </View>
        <View ref={(element) => (targetRefList.current[2] = element)}>
          <MyImage
            width={300}
            height={1000}
            url={dataList[2].url}
            isRender={isRenderList[2]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
