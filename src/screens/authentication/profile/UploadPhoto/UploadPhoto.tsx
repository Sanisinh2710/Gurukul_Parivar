import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import {PrimaryButton, ScreenHeader} from '../../../../components';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import {COLORS} from '../../../../utils/colors';
import {captureImage, chooseFile} from '../../../../utils/helper';
import {styles} from './styles';

const data = [
  {item: 'hello'},
  {item: 'jsid'},
  {item: 'hiii'},
  {item: 'sdgzsd'},
];
export const UploadPhoto = () => {
  const {t, i18n} = useTranslation();
  const commonStyle = CommonStyle();
  const style = styles();

  const [width1, setWidth] = useState<any>({
    height: 5,
    width: '20%',
    backgroundColor: COLORS.primaryColor,
  });

  const [filePath, setFilePath] = useState<{uri: string | undefined}>({
    uri: '',
  });

  console.log(filePath.uri);

  const [selectedItem, setselectedItem] = useState('');

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <View style={{height: 5, backgroundColor: '#E5E5E5'}}>
        <View style={width1} />
      </View>
      <ScreenHeader
        theme={undefined}
        showLeft={true}
        headerTitle={t('uploadPhoto:HederText')}
        headerTitleAlign="center"
      />
      <View style={commonStyle.commonContentView}>
        <View style={style.FirstSubtitleView}>
          <Text style={style.FirstSubtitle}>
            {t('uploadPhoto:FirstSubtitle')}
          </Text>
          <Text style={style.SecondSubtitle}>
            {t('uploadPhoto:SecondSubtitle')}
          </Text>
        </View>
        <View
          style={style.photoMainView}
          onTouchEnd={() => {
            Alert.alert('Select Image', 'From', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'From Gallery',
                onPress: async () => {
                  let path = await chooseFile('photo');
                  console.log(path);

                  if (path) {
                    setFilePath(path);
                  }
                },
              },
              {
                text: 'Capture Photo',
                onPress: async () => {
                  let path = await captureImage('photo');
                  if (path) {
                    setFilePath(path);
                  }
                },
              },
            ]);
          }}>
          <View style={style.photOutSideView}>
            <View style={style.photoView}>
              {filePath.uri !== '' && filePath.uri !== undefined ? (
                <Image source={{uri: filePath.uri}} style={style.image} />
              ) : (
                <Image
                  source={require('../../../../../assets/images/avtar.png')}
                  style={style.avtar}
                />
              )}
            </View>
          </View>
          <Text style={style.photoBottomText}>
            {t('uploadPhoto:PickPhotoBTN')}
          </Text>
        </View>
        <View style={style.BottomView}>
          <Text style={style.BottomSubtitle1}>
            {t('uploadPhoto:BottomSubtitle1')}
          </Text>
          <Text style={style.BottomSubtitle2}>
            {t('uploadPhoto:BottomSubtitle2')}
          </Text>
          <Text style={style.DropdownTitle}>
            {t('uploadPhoto:DropdownTitle')}
          </Text>
          <Dropdown
            dataObject={data}
            selectedItem={selectedItem}
            setselectedItem={setselectedItem}
            placeholder={'Select gurukul branch'}
          />
        </View>
        <PrimaryButton
          title={t('uploadPhoto:NextBtn')}
          onPress={() => {
            let previousWidth = width1.width;
            if (parseInt(previousWidth) < 100) {
              let newWidth = parseInt(previousWidth) + parseInt('20%');
              setWidth({...width1, width: newWidth.toString() + '%'});
            }
          }}
          buttonStyle={style.NextBtn}
        />
      </View>
    </SafeAreaView>
  );
};
