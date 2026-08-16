import { memo } from 'react';
//import {Image ,ImageProps} from 'next/image';
//import Image, { ImageProps } from 'next/image';
import eq from 'lodash/eq';

interface MyImageProps  {
  //[key: string]: any;
}

const MyImage = ({ ...props }: MyImageProps) => {
  console.log('MyImage rendered');
  return <img {...props}></img>;
};

export default memo(MyImage, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
