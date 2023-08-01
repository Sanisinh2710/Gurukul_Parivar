import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {style} from './styles';

type SnailProps = {
  snailLength: number;
  activeTabIndex: number;
};

export const Snail = ({
  snailLength,
  activeTabIndex,
}: SnailProps): React.JSX.Element => {
  const [snailNumList, setSnailNumList] = useState<number[]>([]);

  useMemo(() => {
    let temp: number[] = [];
    for (let i = 1; i <= snailLength; i++) {
      temp.push(i);
    }
    setSnailNumList(temp);
  }, []);

  return (
    <View style={style().snailMainView}>
      {snailNumList.map((_item, index) =>
        activeTabIndex === index + 1 ? (
          <View key={index + 1} style={style().activeSnail} />
        ) : (
          <View key={index + 1} style={style().inactiveSnail} />
        ),
      )}
    </View>
  );
};
