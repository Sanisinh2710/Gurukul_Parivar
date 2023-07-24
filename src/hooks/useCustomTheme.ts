import {useMemo, useState} from 'react';
import {Theme} from '../types';
import {GurukulTheme} from '../utils/constants';
import {useColorScheme} from './useColorScheme';

export const useCustomTheme = () => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<Theme>(GurukulTheme[colorScheme]);

  const [themeMode, setThemeMode] = useState<string>();

  useMemo(() => {
    if (themeMode !== 'default' && themeMode) {
      setTheme(GurukulTheme[themeMode]);
    } else {
      setTheme(GurukulTheme[colorScheme]);
    }
  }, [themeMode, colorScheme]);

  return {theme, themeMode, setThemeMode};
};
