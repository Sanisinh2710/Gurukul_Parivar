import React from 'react';

import {
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

type ImagePagerViewProps = {
  data: ArrayLike<{[key: string]: any}>;
  renderItem: ListRenderItem<any>;
  itemWidth: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  onSnapToItem?(slideIndex: number): void;
  scrollByIndex?: number;
};

export const ImagePagerView = ({
  data,
  renderItem,
  contentContainerStyle,
  itemWidth,
  itemStyle,
  onSnapToItem,
  scrollByIndex,
}: ImagePagerViewProps): React.JSX.Element => {
  const scrollRef = React.useRef<FlatList>(null);

  const handlePageChange = (index: number) => {
    scrollRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  React.useEffect(() => {
    if (scrollByIndex !== null && scrollByIndex !== undefined) {
      handlePageChange(scrollByIndex);
    }
  }, [scrollByIndex]);

  return (
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
          console.log(parseInt((x / itemWidth).toFixed(0)));
          if (onSnapToItem) {
            onSnapToItem(parseInt((x / itemWidth).toFixed(0)));
          }
        }
      }}
      data={data}
      contentContainerStyle={contentContainerStyle}
      renderItem={({item, index, separators}) => {
        return (
          <View
            key={item.toString() + index}
            style={[
              itemStyle,
              {
                width: itemWidth,
              },
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
  );
};
