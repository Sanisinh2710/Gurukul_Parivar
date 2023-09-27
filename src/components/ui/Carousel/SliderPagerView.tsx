import React from 'react';

import {BASE_URL} from '@env';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  View,
} from 'react-native';
import {CHANGE_PAGE} from '../../../redux/ducks/imageSliderslice';
import {useAppDispatch} from '../../../redux/hooks';
import {COLORS} from '../../../utils';
import {Snail} from './SnailIndicator';
import {style} from './styles';

type PagerViewProps = {
  images: any[];
};

export const PagerView = ({images}: PagerViewProps): React.JSX.Element => {
  const {width} = Dimensions.get('window');

  const [currentScrollIndex, setCurrentScrollIndex] = React.useState(0);

  const scrollRef = React.useRef<FlatList>(null);

  const [imgLoad, setimgLoad] = React.useState<boolean[]>([]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (images.length > 0) {
        if (currentScrollIndex < images.length - 1) {
          scrollRef.current?.scrollToIndex({
            animated: true,
            index: currentScrollIndex + 1,
          });
        } else {
          scrollRef.current?.scrollToIndex({
            animated: true,
            index: 0,
          });
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentScrollIndex, images]);

  return (
    <View style={style().pagerViewMainView}>
      <FlatList
        ref={scrollRef}
        horizontal={true}
        data={images}
        contentContainerStyle={{
          paddingBottom: '3%',
        }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        style={{
          width: width,
        }}
        getItemLayout={(data, index) => {
          return {
            length: width,
            offset: width * index,
            index,
          };
        }}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          if (currentScrollIndex !== parseInt((x / width).toFixed(0))) {
            setCurrentScrollIndex(parseInt((x / width).toFixed(0)));
          }
        }}
        onMomentumScrollEnd={e => {
          if (width !== null && width !== undefined) {
            if (
              currentScrollIndex !== undefined &&
              currentScrollIndex !== null
            ) {
              dispatch(CHANGE_PAGE({nextPage: currentScrollIndex}));
            }
          }
        }}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={[style().pagerViewImageView, {width: width}]}>
              {imgLoad[index] && (
                <ActivityIndicator
                  size={30}
                  color={COLORS.primaryColor}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                />
              )}
              <Image
                source={{uri: `${BASE_URL}${images[index]}`}}
                style={style().pagerViewImage}
                onLoadStart={() => {
                  let clone = [...imgLoad];
                  clone[index] = true;
                  setimgLoad(clone);
                }}
                onLoadEnd={() => {
                  let clone = [...imgLoad];
                  clone[index] = false;
                  setimgLoad(clone);
                }}
              />
            </View>
          );
        }}
      />

      <Snail snailLength={images.length} activeTabIndex={currentScrollIndex} />
    </View>
  );
};
