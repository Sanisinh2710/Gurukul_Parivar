import React, {useMemo} from 'react';
import {Image, View} from 'react-native';
import {Snail} from './SnailIndicator';
import {style} from './styles';
import {AllImages} from '../../../../assets/images';

type PagerViewProps = {
  currentPage: number;
};

export const PagerView = ({currentPage}: PagerViewProps): React.JSX.Element => {
  const image = useMemo(() => {
    return currentPage === 1
      ? AllImages.Rectangle
      : currentPage === 2
      ? AllImages.Rectangle2
      : AllImages.Rectangle3;
  }, [currentPage]);

  return (
    <View style={style().pagerViewMainView}>
      <View style={style().pagerViewImageView}>
        <Image source={image} style={style().pagerViewImage} />
      </View>

      <Snail snailLength={3} activeTabIndex={currentPage} />
    </View>
  );
};
