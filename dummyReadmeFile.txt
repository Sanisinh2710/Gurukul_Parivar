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



-----------------------------------------------Vishwa Task :- -----------------------------------------------------
1) To create exporter file for icons and images from assets,
2) Do not wrap your screens with memo, wrap only components with the memo.
3) tsx file  name should be in capital
4) style files or any other files can't be tsx.
5) Update frontDesk menu cards with proper coloring