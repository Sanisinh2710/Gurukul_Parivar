import React, {useMemo} from 'react';
import {Image, View} from 'react-native';
import {style} from './styles';
import {Snail} from './snailIndicator';

type PagerViewProps = {
  currentPage: number;
};

export const PagerView = ({currentPage}: PagerViewProps): React.JSX.Element => {
  console.log(currentPage);
  const image = useMemo(() => {
    return currentPage === 1
      ? require('../../../../assets/images/Rectangle.png')
      : currentPage === 2
      ? require('../../../../assets/images/Rectangle2.jpg')
      : require('../../../../assets/images/Rectangle3.png');
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
