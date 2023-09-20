import React from 'react';

import {
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

type DataType = ArrayLike<{[key: string]: any}>;

type CarouselProps = {
  data: DataType;
  renderItem: ListRenderItem<any>;
  itemWidth: number;
  itemHeight?: number;
  itemGap?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  initialScrollToIndex?: number;
  onSnapToItem?(slideIndex: number): void;
};

export type CarouselMethodsType = {
  /**
   * Use This method to skip to the next index...
   */
  handleNext(): void;
  /**
   * Use this method to skip to the previous index...
   */
  handlePrev(): void;
};

export const Carousel = React.forwardRef(
  (
    {
      data,
      renderItem,
      contentContainerStyle,
      itemWidth,
      itemHeight,
      itemGap,
      itemStyle,
      initialScrollToIndex,
      onSnapToItem,
    }: CarouselProps,
    ref: React.ForwardedRef<CarouselMethodsType>,
  ): React.JSX.Element => {
    const [currentScrollIndex, setCurrentScrollIndex] = React.useState(0);

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

    const ChildMethods = (): CarouselMethodsType => {
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
          onMomentumScrollEnd={e => {
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
