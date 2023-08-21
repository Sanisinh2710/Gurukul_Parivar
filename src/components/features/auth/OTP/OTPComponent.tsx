import React from 'react';

import {TextInput, View} from 'react-native';
import {COLORS} from '../../../../utils';
import {useOtpStyle} from './otpStyle';

type otpTypeProps = {
  num: string[];
  setNum: React.Dispatch<React.SetStateAction<string[]>>;
};
export const OtpComponent = React.memo(({num, setNum}: otpTypeProps) => {
  const style = useOtpStyle();
  const [focus, setFocus] = React.useState(false);
  const refs = React.useRef<Array<TextInput | null>>([]);

  const changeFocus = (index: number) => {
    refs.current[index]?.focus();
  };

  React.useEffect(() => {
    for (let i = 0; i < num.length; i++) {
      if (num[i] !== '') {
        refs.current[i]?.setNativeProps(
          num.length === 6
            ? {
                text: num[i].toString(),
                maxLength: 1,
                style: {
                  borderColor: COLORS.primaryColor,
                },
              }
            : {
                style: {
                  borderColor: COLORS.primaryColor,
                },
              },
        );
      } else {
        refs.current[i]?.setNativeProps({
          maxLength: 6,
        });
      }
    }
  }, [num, focus]);

  const handleText = (value: any, index?: any) => {
    if (value.length === 6) {
      const copiedOTP = value.split('');

      let newOtpValue = [...num];
      copiedOTP.map((val, index) => {
        newOtpValue[index] = val;
      });

      setNum(newOtpValue);
    } else {
      const newOtpValue = [...num];
      newOtpValue[index] = value.trim();
      setNum(newOtpValue);
    }
  };

  return (
    <View style={{justifyContent: 'center', gap: 10, flexDirection: 'row'}}>
      <View style={style.otpWrapper}>
        {num.map((item, index) => (
          <TextInput
            key={index}
            value={item}
            onSubmitEditing={() => {
              return (
                num[index] === '' &&
                refs.current[index]?.setNativeProps({
                  style: {borderColor: 'rgba(172, 43, 49, 0.18)'},
                })
              );
            }}
            onFocus={() => {
              setFocus(prev => !prev);
            }}
            onChangeText={val => handleText(val, index)}
            keyboardType="number-pad"
            ref={el => (refs.current[index] = el)}
            style={
              refs.current[index]?.isFocused()
                ? [style.textInput, {borderColor: COLORS.primaryColor}]
                : [style.textInput]
            }
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                changeFocus(index - 1);
              } else {
                changeFocus(index + 1);
              }
            }}
          />
        ))}
      </View>
    </View>
  );
});
