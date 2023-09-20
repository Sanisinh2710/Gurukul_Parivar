import {ListRenderItem, StyleProp, ViewStyle} from 'react-native';

export interface CarouselProps {
  /**
   * An array (or array-like list) of items to render.
   */
  data: ArrayLike<any>;
  /**
   * Takes an item from data and renders it into the list. Typical usage:
   * ```
   * _renderItem = ({item}) => (
   *   <TouchableOpacity onPress={() => this._onPress(item)}>
   *     <Text>{item.title}</Text>
   *   </TouchableOpacity>
   * );
   * ...
   * <MyCarousel data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />
   * ```
   * Provides additional metadata like `index` if you need it.
   */
  renderItem: ListRenderItem<any>;
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
