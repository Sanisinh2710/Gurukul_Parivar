Change theme :-------------------------------------------------(Future References)

<PrimaryButton
title={t('common:Light')}
onPress={() => changeYourTheme('light')}
/>
<PrimaryButton
title={t('common:Dark')}
onPress={() => changeYourTheme('dark')}
/>
<PrimaryButton
title={t('common:Default')}
onPress={() => changeYourTheme('default')}
/>

// const changeYourTheme = (themeMode: string) => {
// if (themeMode === 'default') {
// if (deviceColorScheme) {
// dispatch(
// TOGGLE_THEME({
// themeMode: 'default',
// variant: deviceColorScheme,
// }),
// )                                                                            ;
// }
// } else {
// dispatch(
// TOGGLE_THEME({
// themeMode: themeMode,
// variant: themeMode === 'dark' ? 'dark' : 'light',
// }),
// )                                                                            ;
// }
// }                                                                            ;




/* ----Memo takes second callback to determine whether previos and new state is same or not..!
 (prev, next) => {
  if (prev.headerRight?.icon === next.headerRight?.icon) {
    return true;
  }
  return false;
},
*/



//Always use this
 new Date(`${currentYear}-${currentMonth + 1}-${day}`),




  // const onBackPress = React.useCallback(() => {
  //   if (activeTrack) {
  //     storage.set('currMusic', JSON.stringify({...activeTrack}));
  //     navigation.goBack();
  //   }

  //   // Return true to stop default back navigaton
  //   // Return false to keep default back navigaton
  //   return true;
  // }, [activeTrack]);

  // const onBlurScreen = React.useCallback(() => {
  //   if (activeTrack) {
  //     storage.set('currMusic', JSON.stringify({...activeTrack}));
  //   }

  //   // Return true to stop default back navigaton
  //   // Return false to keep default back navigaton
  //   return true;
  // }, [activeTrack]);

  // const ExitCallBack = React.useCallback(() => {
  //   // Add Event Listener for hardwareBackPress
  //   BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   const blurListner = AppState.addEventListener('blur', onBlurScreen);

  //   return () => {
  //     // Once the Screen gets blur Remove Event Listener
  //     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     blurListner.remove();
  //   };
  // }, [activeTrack]);

  // Platform.OS === 'ios' ? null : useFocusEffect(ExitCallBack);