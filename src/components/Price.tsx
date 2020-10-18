import React from 'react';
import {FormattedNumber} from 'react-intl';
export default function Price({value}: {value: number}) {
  return <FormattedNumber style="currency" currency="SEK" value={value} />;
}
