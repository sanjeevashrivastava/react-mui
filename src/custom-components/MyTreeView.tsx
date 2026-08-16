import { memo } from 'react';
import { SimpleTreeView, SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import eq from 'lodash/eq';

interface MyTreeViewProps extends SimpleTreeViewProps<boolean | undefined> {}

const MyTreeView = ({ ...props }: MyTreeViewProps) => {
  console.log('MyTreeView rendered');
  return <SimpleTreeView {...props} />;
};

export default memo(MyTreeView, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
