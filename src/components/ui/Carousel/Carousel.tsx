import React from 'react';

import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import { style } from './styles';

export type FlatListItemProps<ItemT> = {
  item: any;
  index: number;
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  };
};

export interface CarouselProps<ItemT> {
  /**
   * An array (or array-like list) of items to render.
   */
  data: ArrayLike<ItemT>;
  /**
   * Takes an item from data and renders it into the list. Typical usage:
   * ```
   * _renderItem = ({item}) => (
   *   <TouchableOpacity onPress={() => this._onPress(item)}>
   *     <Text>{item.title}</Text>
   *   </TouchableOpacity>
   * );
   * ...
   * <Carousel data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />
   * ```
   * Provides additional metadata like `index` if you need it.
   */
  renderItem: (info: FlatListItemProps<ItemT>) => React.ReactElement;
  /**
   * Key extractor...
   */
  keyExtractor?: (item: ItemT, index: number) => string;
  /**
   * Maximum width of the item...
   */
  itemWidth: number;
  /**
   * Maximum height of the item...
   */
  itemHeight?: number;
  /**
   * Gap or space between the item...
   */
  itemGap?: number;
  /**
   * To provide the additional style to the carousel content container...
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * To provide the additional style to your item...
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * Instead of starting at the top with the first item, start at initialScrollIndex
   */
  initialScrollToIndex?: number;
  /**
   * This method provides you the callback to use with the current index...
   */
  onSnapToItem?(slideIndex: number): void;
}

export type CarouselRef = {
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
  <ItemT,>(
    props: CarouselProps<ItemT>,
    ref: React.ForwardedRef<CarouselRef>,
  ) => {
    const [currentScrollIndex, setCurrentScrollIndex] = React.useState(0);

    const {
      data,
      renderItem,
      keyExtractor,
      contentContainerStyle,
      itemWidth,
      itemHeight,
      itemGap,
      itemStyle,
      initialScrollToIndex,
      onSnapToItem,
    } = props;

    const scrollRef = React.useRef<FlatList>(null);
    const styles = style();

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
        style={styles.carouselMainView}>
        <FlatList
          ref={scrollRef}
          horizontal={true}
          keyExtractor={keyExtractor}
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
          style={{ width: itemWidth }}
          renderItem={({ item, index, separators }: FlatListItemProps<ItemT>) => {
            return (
              <View
                key={index.toString()}
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
                  itemGap ? { paddingHorizontal: itemGap } : {},
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
