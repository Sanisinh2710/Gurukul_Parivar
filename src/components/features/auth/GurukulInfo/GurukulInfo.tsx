/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {RadioLable} from '../../../ui';

export const GurukulInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();

    console.log(initialValues);

    const [exstudent, setExstudent] = React.useState(
      initialValues.exGurukulStudent || '',
    );

    return (
      <ScrollView>
        <RadioLable
          wantFullSpace
          showHeading={false}
          value={exstudent}
          onChange={setExstudent}
          list={[{name: 'Yes'}, {name: 'No'}]}
        />
      </ScrollView>
    );
  },
);
