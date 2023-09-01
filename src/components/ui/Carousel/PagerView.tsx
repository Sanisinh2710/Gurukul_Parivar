import React from 'react';

import {BASE_URL} from '@env';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {Snail} from './SnailIndicator';
import {style} from './styles';

type PagerViewProps = {
  currentPage: number;
  setCurrentPage: any;
  images: any[];
};

export const PagerView = React.memo(
  ({
    currentPage,
    setCurrentPage,
    images,
  }: PagerViewProps): React.JSX.Element => {
    const {width, height} = Dimensions.get('window');

    const scrollRef = React.useRef<FlatList>(null);

    const handlePageChange = () => {
      if (currentPage < images.length - 1) {
        scrollRef.current?.scrollToIndex({
          animated: true,
          index: currentPage + 1,
        });
      } else {
        scrollRef.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      }
    };

    React.useEffect(() => {
      const timer = setTimeout(() => {
        handlePageChange();
      }, 2000);

      return () => clearTimeout(timer);
    }, [currentPage, images]);

    return (
      <View style={style().pagerViewMainView}>
        <FlatList
          ref={scrollRef}
          horizontal={true}
          data={images}
          contentContainerStyle={{
            paddingBottom: '5%',
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentPage(parseInt((x / width).toFixed(0)));
          }}
          renderItem={({item, index}) => {
            return (
              <>
                <View style={[style().pagerViewImageView, {width: width}]}>
                  <Image
                    source={{uri: `${BASE_URL}${images[currentPage]}`}}
                    style={style().pagerViewImage}
                  />
                </View>
              </>
            );
          }}
        />

        <Snail snailLength={images.length} activeTabIndex={currentPage + 1} />
      </View>
    );
  },
);
