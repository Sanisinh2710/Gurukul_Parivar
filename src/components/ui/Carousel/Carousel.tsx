import React from 'react';

import {FlatList, View} from 'react-native';
import {CarouselProps, CarouselRef} from '../../../types/Carousel';

export const Carousel = React.forwardRef(
  (
    props: CarouselProps,
    ref: React.ForwardedRef<CarouselRef>,
  ): React.JSX.Element => {
    const [currentScrollIndex, setCurrentScrollIndex] = React.useState(0);

    const {
      data,
      renderItem,
      contentContainerStyle,
      itemWidth,
      itemHeight,
      itemGap,
      itemStyle,
      initialScrollToIndex,
      onSnapToItem,
    } = props;

    const scrollRef = React.useRef<FlatList>(null);

    const handlePageChange = (index: number) => {
      if (data.length > 0) {
        if (index <= data.length - 1) {
          scrollRef.current?.scrollToIndex({
            animated: true,
            index: index,
          });
          if (onSnapToItem) {
            onSnapToItem(index);
          }
        }
      }
    };

    React.useEffect(() => {
      if (initialScrollToIndex !== undefined && initialScrollToIndex !== null) {
        handlePageChange(initialScrollToIndex);
      }
    }, []);

    const ChildMethods = (): CarouselRef => {
      return {
        handleNext() {
          if (currentScrollIndex < data.length - 1) {
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
        },
        handlePrev() {
          if (currentScrollIndex > 0) {
            scrollRef.current?.scrollToIndex({
              animated: true,
              index: currentScrollIndex - 1,
            });
          }
        },
      };
    };

    React.useImperativeHandle(ref, ChildMethods, [currentScrollIndex]);

    return (
      <View
        style={{
          flexShrink: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          ref={scrollRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          getItemLayout={(data, index) => {
            return {
              length: itemWidth,
              offset: itemWidth * index,
              index,
            };
          }}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            if (itemWidth !== null && itemWidth !== undefined) {
              setCurrentScrollIndex(parseInt((x / itemWidth).toFixed(0)));
            }
          }}
          onMomentumScrollEnd={() => {
            if (itemWidth !== null && itemWidth !== undefined) {
              if (
                onSnapToItem &&
                currentScrollIndex !== undefined &&
                currentScrollIndex !== null
              ) {
                onSnapToItem(currentScrollIndex);
              }
            }
          }}
          data={data}
          contentContainerStyle={[contentContainerStyle]}
          renderItem={({item, index, separators}) => {
            return (
              <View
                key={item.toString() + index}
                style={[
                  itemStyle,
                  {
                    width: itemWidth,
                  },
                  itemHeight
                    ? {
                        height: itemHeight,
                      }
                    : {},
                  itemGap ? {paddingHorizontal: itemGap} : {},
                ]}>
                {renderItem({
                  item,
                  index,
                  separators,
                })}
              </View>
            );
          }}
        />
      </View>
    );
  },
);
