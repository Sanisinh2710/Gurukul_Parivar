import React from 'react';

import {BASE_URL} from '@env';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {CHANGE_PAGE} from '../../../redux/ducks/imageSliderslice';
import {useAppDispatch} from '../../../redux/hooks';
import {Snail} from './SnailIndicator';
import {style} from './styles';

type PagerViewProps = {
  currentPage: number;
  images: any[];
};

export const PagerView = React.memo(
  ({currentPage, images}: PagerViewProps): React.JSX.Element => {
    const {width, height} = Dimensions.get('window');

    const scrollRef = React.useRef<FlatList>(null);

    const dispatch = useAppDispatch();

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
            paddingBottom: '3%',
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            dispatch(CHANGE_PAGE({nextPage: parseInt((x / width).toFixed(0))}));
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
