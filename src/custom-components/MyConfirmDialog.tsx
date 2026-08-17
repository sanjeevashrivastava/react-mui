import { memo, useRef } from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import MyButton from './MyButton';
import MyDangerButton from './MyDangerButton';
import MyGrid from './MyGrid';
import MyCardContent from './MyCardContent';

//import MyCloseIcon from './MyCloseIcon';
import eq from 'lodash/eq';
//import MyIconButton from './MyIconButton';
import MyCard from './MyCard';
import MyIconButton from './MyIconButton';
import MyCloseIcon from './MyCloseIcon';
import MyNotInterestedIcon from './MyNotInterestedIcon';
import MyCheckIcon from './MyCheckIcon';

interface MyConfirmDialogProps {
  title: string;
  onNoClick(e: React.MouseEvent): void;
  onYesClick(e: React.MouseEvent): void;
}

const MyConfirmDialog = ({ children, ...props }: ModalProps & MyConfirmDialogProps) => {
  const rootRef = useRef(null);
  console.log('MyConfirmDialog rendered');
  return (
    <Modal
      open
      //disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableScrollLock
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      sx={{
        display: 'flex',
        position: 'absolute',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //verticalAlign: 'top',
        zIndex: 9999
      }}
      container={() => rootRef.current}

    >
      <MyCard
        sx={{
          width: 450,
          zIndex: 1
        }}
        title={props.title}
        secondary={
          <MyIconButton size="large">
            <MyCloseIcon fontSize="small" onClick={props.onNoClick} />
          </MyIconButton>
        }
      >
        <MyCardContent>{children}</MyCardContent>
        <Divider />
        <CardActions>
          <MyGrid container //display="flex" justifyContent="flex-end"
          >
            <MyButton startIcon={<MyNotInterestedIcon/>} onClick={props.onNoClick} style={{ marginRight: '20px' }}>
              No
            </MyButton>
            <MyDangerButton startIcon={<MyCheckIcon/>} onClick={props.onYesClick}>Yes</MyDangerButton>
          </MyGrid>
        </CardActions>
      </MyCard>
    </Modal>
  );
};

export default memo(MyConfirmDialog, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
