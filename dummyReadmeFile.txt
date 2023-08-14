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