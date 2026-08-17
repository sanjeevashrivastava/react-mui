import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '../../../custom-components/MyButton';
import useViewUser from './useViewUser';
import MyTypography from '../../../custom-components/MyTypography';
import MyBreadcrumbs from '../../../custom-components/MyBreadcrumbs';
import MyCard from '../../../custom-components/MyCard';
import MyCardContent from '../../../custom-components/MyCardContent';
import MyDivider from '../../../custom-components/MyDivider';
import MyCardActions from '../../../custom-components/MyCardActions';
import MyGrid from '../../../custom-components/MyGrid';
import MyArrowBackIcon from '../../../custom-components/MyArrowBackIcon';
import MyEditIcon from '../../../custom-components/MyEditIcon';

const ClientViewUser = () => {
  const { state, onEditClick, onCancelClick } = useViewUser();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">First Name:</MyTypography>
                  <MyTypography>{state.dtoUser.first_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Last Name:</MyTypography>
                  <MyTypography>{state.dtoUser.last_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">E-Mail:</MyTypography>
                  <MyTypography>{state.dtoUser.email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Mobile #:</MyTypography>
                  <MyTypography>{state.dtoUser.mobile_no}</MyTypography>
                </MyGrid>
                   <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Username:</MyTypography>
                  <MyTypography>{state.dtoUser.user_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Status:</MyTypography>
                  <MyTypography>{state.dtoUser.status}</MyTypography>
                </MyGrid>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyCardActions>
          <MyButton  startIcon={<MyEditIcon />} onClick={onEditClick}>Edit</MyButton>
          <MyButton startIcon={<MyArrowBackIcon />} onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
