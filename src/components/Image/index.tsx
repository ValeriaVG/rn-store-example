import React from 'react';
import {ImageProps, Image as RNImage} from 'react-native';
import defaultImage from './no-image.png';

export default function Image({
  src,
  source,
  ...props
}: Partial<ImageProps> & {src?: string}) {
  return <RNImage source={{uri: src || defaultImage}} {...props} />;
}
