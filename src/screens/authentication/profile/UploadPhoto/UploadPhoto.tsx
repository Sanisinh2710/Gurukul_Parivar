import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  PrimaryButton,
  RadioLable,
  ScreenHeader,
  SecondaryButton,
} from '../../../../components';
import {COLORS, GuruKulList, captureImage, chooseFile} from '../../../../utils';
import {styles} from './styles';

export const UploadPhoto = () => {
  const {t, i18n} = useTranslation();
  const commonStyle = CommonStyle();
  const style = styles();

  const [width, setwidth] = React.useState(20);

  const [modelVisible, setModelVisible] = React.useState(false);
  const [filePath, setFilePath] = React.useState<{uri: string | undefined}>({
    uri: '',
  });

  const [selectedItem, setselectedItem] = React.useState('');

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <Progress.Bar
        progress={width / 100}
        width={Dimensions.get('window').width}
        borderRadius={0}
        color={COLORS.primaryColor}
        unfilledColor={COLORS.unfilledProgressbar}
        borderWidth={0}
      />
      <ScreenHeader
        showLeft={true}
        headerTitle={t('uploadPhoto:HederText')}
        headerTitleAlign="center"
        leftOnPress={() => {
          if (width > 20) {
            setwidth(width - 20);
          }
        }}
      />
      <ScrollView nestedScrollEnabled={false}>
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
                    source={require('../../../../../assets/icons/Avtar.png')}
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.contentView}
              onPress={() => {
                setModelVisible(!modelVisible);
              }}>
              <Text style={style.placeholderFonts}>
                {selectedItem == ''
                  ? t('uploadPhoto:DropdownLable')
                  : selectedItem}
              </Text>
              {modelVisible ? (
                <MaterialCommunityIcon
                  name="chevron-up-circle-outline"
                  size={25}
                  color={COLORS.primaryColor}
                />
              ) : (
                <MaterialCommunityIcon
                  name="chevron-down-circle-outline"
                  size={25}
                  color={COLORS.primaryColor}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={style.NextBtn}>
            <PrimaryButton
              title={t('uploadPhoto:NextBtn')}
              onPress={() => {
                if (width < 100) {
                  setwidth(width + 20);
                }
              }}
            />
          </View>
        </View>
        <DropDownModel
          inputList={[...GuruKulList]}
          selectedItem={selectedItem}
          setSelectedItem={setselectedItem}
          label={t('uploadPhoto:DropdownLable')}
          wantSearchBar={true}
          modalHeight="95%"
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          type={'none'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
