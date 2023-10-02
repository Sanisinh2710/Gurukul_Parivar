import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {NoData} from '../../ui';

export const ErrorFunc = () => {
  const {t} = useTranslation();

  return (
    <NoData title={t('NoData.ErrorTitle')} content={t('NoData.ErrorContent')} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
