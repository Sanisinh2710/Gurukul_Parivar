import React, {useMemo} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {Snail} from './SnailIndicator';
import {style} from './styles';
import {AllImages} from '../../../../assets/images';
import {BASE_URL} from '@env';

type PagerViewProps = {
  currentPage: number;
  images: any[];
};

export const PagerView = ({
  currentPage,
  images,
}: PagerViewProps): React.JSX.Element => {
  const image = useMemo(() => {
    return images[currentPage];
  }, [currentPage]);

  return (
    <View style={style().pagerViewMainView}>
      <View style={style().pagerViewImageView}>
        <Image
          source={{uri: `${BASE_URL}${image}`}}
          style={style().pagerViewImage}
        />
      </View>

      <Snail snailLength={images.length} activeTabIndex={currentPage + 1} />
    </View>
  );
};
