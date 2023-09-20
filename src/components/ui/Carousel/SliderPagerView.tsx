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
  currentIndex: number;
  images: any[];
};

export const PagerView = React.memo(
  ({currentIndex, images}: PagerViewProps): React.JSX.Element => {
    const {width} = Dimensions.get('window');

    const scrollRef = React.useRef<FlatList>(null);

    const [imgLoad, setimgLoad] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (images.length > 0) {
          if (currentIndex < images.length - 1) {
            scrollRef.current?.scrollToIndex({
              animated: true,
              index: currentIndex + 1,
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
    }, [currentIndex]);

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
          getItemLayout={(data, index) => {
            return {
              length: width,
              offset: width * index,
              index,
            };
          }}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            if (currentIndex !== parseInt((x / width).toFixed(0))) {
              dispatch(
                CHANGE_PAGE({nextPage: parseInt((x / width).toFixed(0))}),
              );
            }
          }}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={[style().pagerViewImageView, {width: width}]}>
                {imgLoad && (
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
                  source={{uri: `${BASE_URL}${images[currentIndex]}`}}
                  style={style().pagerViewImage}
                  onLoadStart={() => setimgLoad(true)}
                  onLoadEnd={() => setimgLoad(false)}
                />
              </View>
            );
          }}
        />

        <Snail snailLength={images.length} activeTabIndex={currentIndex + 1} />
      </View>
    );
  },
);
