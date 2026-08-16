import React, { memo } from 'react';
import eq from 'lodash/eq';

const MyLogo = () => {
  return <img src="/logo192.png" width={50} height={50} alt="logo" />;
};

export default memo(MyLogo, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
