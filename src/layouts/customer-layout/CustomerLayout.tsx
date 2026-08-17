import React, {memo} from "react";
import { Outlet } from "react-router-dom";
import _ from 'lodash'

import { forwardRef, useCallback, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TreeItemContent, TreeItemIconContainer, TreeItemRoot, TreeItemGroupTransition } from '@mui/x-tree-view';
import { useTreeItem, UseTreeItemParameters } from '@mui/x-tree-view';
import { TreeItemProvider } from '@mui/x-tree-view';
import { TreeItemIcon } from '@mui/x-tree-view';
//import { useCookies } from 'react-cookie';
import MyAppBar from '../../custom-components/MyAppBar';
import MyBox from '../../custom-components/MyBox';
import MyToolbar from '../../custom-components/MyToolbar';
import MyIconButton from '../../custom-components/MyIconButton';
import MyMenuIcon from '../../custom-components/MyMenuIcon';

import MyPerfectScrollbar from '../../custom-components/MyPerfectScrollbar ';
import MyDrawer from '../../custom-components/MyDrawer';
import MyCard from '../../custom-components/MyCard';
import MyLogo from '../../custom-components/MyLogo';
import MyLink from '../../custom-components/MyLink';
import MyAccountCircle from '../../custom-components/MyAccountCircle';
import MyMenu from '../../custom-components/MyMenu';
import MyMenuItem from '../../custom-components/MyMenuItem';
import MyTypography from '../../custom-components/MyTypography';
import MyMailIcon from '../../custom-components/MyMailIcon';
import MyHomeIcon from '../../custom-components/MyHomeIcon';
import MyBadge from '../../custom-components/MyBadge';
//import MyLabelIcon from '.../../custom-components/MyLabelIcon';
import MySupervisorAccountIcon from '../../custom-components/MySupervisorAccountIcon';
//import MyInfoIcon from '.../../custom-components/MyInfoIcon';
//import MyForumIcon from '.../../custom-components/MyForumIcon';
import MyNotificationsIcon from '../../custom-components/MyNotificationsIcon';
import MyMoreVertIcon from '../../custom-components/MyMoreVertIcon';
//import MyLocalOfferIcon from '.../../custom-components/MyLocalOfferIcon';
import MyArrowDropDownIcon from '../../custom-components/MyArrowDropDownIcon';
import MyArrowRightIcon from '../../custom-components/MyArrowRightIcon';
import MySimpleTreeView from '../../custom-components/MySimpleTreeView';
import { useFirstRender } from '../../hooks/useFirstRender';
//import AuthGuard from '.../../auth-guard';
//import { useDispatch } from '.../../store';
//import { setToken } from '.../../store/slices/globalState';

import MyPersonOutlineIcon from '../../custom-components/MyFlagIcon';

import MyWhatsAppIcon from '../../custom-components/MyWhatsAppIcon';

  declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

interface StyledTreeItemProps extends Omit<UseTreeItemParameters, 'rootRef'>, React.HTMLAttributes<HTMLLIElement> {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
}

const CustomTreeItemRoot = styled(TreeItemRoot)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.fontWeightRegular
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateX(5px)'
  },
  '&.focused, &.selected, &.selected.focused': {
    backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    color: 'var(--tree-view-color)'
  },  		
}));

const CustomTreeItemIconContainer = styled(TreeItemIconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#fff'
}));

const CustomTreeItemGroupTransition = styled(TreeItemGroupTransition)(({ theme }) => ({
  marginLeft: 0,
  [`& .content`]: {
    paddingLeft: theme.spacing(2)
  }
}));

const CustomTreeItem = forwardRef(function CustomTreeItem(props: StyledTreeItemProps, ref: React.Ref<HTMLLIElement>) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const { getRootProps, getContentProps, getIconContainerProps, getLabelProps, getGroupTransitionProps, status } = useTreeItem({
    id,
    itemId,
    children,
    label,
    disabled,
    rootRef: ref
  });

  const style = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color': theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    'color': theme.palette.mode !== 'dark' ? '#fff' : bgColorForDarkMode
  
  };

  return (
    <TreeItemProvider id={itemId} itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused
            })
          })}
          status={{expandable: true, focused: false, selected: false, expanded: true, disabled: false, editing: false, editable: false,loading: false, error: false }}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()} >
            <TreeItemIcon status={status}  />
          </CustomTreeItemIconContainer>
          <MyBox
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0,
              pr: 0,
              color: '#fff'
            }}
          >
            <MyBox component={LabelIcon} color="inherit" sx={{ mr: 1, ml: -2 }} />
            <MyTypography
              {...getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 }
              })}
            />
            <MyTypography variant="caption" color="inherit">
              {labelInfo}
            </MyTypography>
          </MyBox>
        </CustomTreeItemContent>
        {children && <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />}
      </CustomTreeItemRoot>
    </TreeItemProvider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}
// type StateType = {
//   open: boolean;
//   open1: boolean;
//   value: string;
//   groups: string[];
//   groupCounts: number[];
//   items: GlobalSearchDTO[];
//   queryItems: any[];
//   checkAll: boolean;
//   isLoading: boolean;
// };
const CustomerLayout = (//{ children: any }

) => {
   const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const [, , removeCookie] = useCookies();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //const anchorRef1 = useRef<any>(null);
  // const [state, setState] = useState<StateType>({
  //   open: false,
  //   open1: false,
  //   value: '',
  //   groups: [],
  //   groupCounts: [],
  //   items: [],
  //   queryItems: [
  //     { id: 0, name: 'Order # - Orders', checked: true },
  //     { id: 1, name: 'Quote # - Quotes', checked: true },
  //     { id: 2, name: 'Quote # - Orders', checked: true },
  //     { id: 3, name: 'Job # - Jobs', checked: true },
  //     { id: 4, name: 'Job # - Heat Treat', checked: true },
  //     { id: 5, name: 'Job # - Purchase Orders', checked: true },
  //     { id: 6, name: 'Part # - Inventory (Part List)', checked: true },
  //     { id: 7, name: 'Part # - Jobs', checked: true },
  //     { id: 8, name: 'Part # - Purchase Orders', checked: true },
  //     { id: 9, name: 'Purchase Order # - Purchase Orders', checked: true },
  //     { id: 10, name: 'Purchase Order # - Orders', checked: true },
  //     { id: 11, name: 'Invoice # - Invoices', checked: true },
  //     { id: 12, name: 'Customer Company Name - Customers', checked: true },
  //     { id: 13, name: 'Customer Company Name - Orders', checked: true },
  //     { id: 14, name: 'Customer Company Name - Quotes', checked: true },
  //     { id: 15, name: 'Customer Company Name - Invoices', checked: true },
  //     { id: 16, name: 'Heat Treat # - Heat Treat', checked: true },
  //     { id: 17, name: 'Heat Treat # - Jobs', checked: true },
  //     { id: 18, name: 'Bin - Inventory', checked: true },
  //     { id: 19, name: 'Bin - Job Materials', checked: true },
  //     { id: 20, name: 'Bin - Jobs', checked: true },
  //     { id: 21, name: 'Customer Contact Name - Contacts', checked: true },
  //     { id: 22, name: 'Customer Contact Name - Orders', checked: true },
  //     { id: 23, name: 'Customer Contact Name - Quotes', checked: true },
  //     { id: 24, name: 'Vendor Name - Vendors', checked: true },
  //     { id: 25, name: 'Vendor Name - Purchase Orders', checked: true },
  //     { id: 26, name: "Hide Empty Part #'s", checked: true }
  //   ],
  //   checkAll: true,
  //   isLoading: false
  // });
  // const onQSettingsClick = useCallback(async (event: any) => {
  //   setState((prevState: StateType): StateType => {
  //     return {
  //       ...prevState,
  //       open1: !prevState.open1
  //     };
  //   });
  // }, []);

  // const handleClose1 = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
  //     if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
  //       return;
  //     }

  //     setState((prevState: StateType): StateType => {
  //       return {
  //         ...prevState,
  //         open1: false
  //       };
  //     });
  //   },
  //   [anchorRef1.current]
  // );
  // const onQueryItemClick = useCallback(async (event: any) => {
  //   setState((prevState: StateType): StateType => {
  //     return {
  //       ...prevState,
  //       checkAll: !prevState.checkAll
  //     };
  //   });
  // }, []);
  // const handleToggle = useCallback(
  //   async (id: number) => {
  //     const queryItems = [...state.queryItems];
  //     for (let i = 0; i < queryItems.length; i++) {
  //       if (queryItems[i].id == id) {
  //         queryItems[i].checked = !queryItems[i].checked;
  //         break;
  //       }
  //     }
  //     setState((prevState: StateType): StateType => {
  //       return {
  //         ...prevState,
  //         queryItems: queryItems
  //       };
  //     });
  //   },
  //   [state.queryItems]
  // );
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuProfile = useCallback(async () => {
    //navigate('/profile');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [//navigate, 
  handleMobileMenuClose
]);

  const handleMenuChangePassword = useCallback(async () => {
    //navigate('/change-password');
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [//navigate, 
   handleMobileMenuClose
  ]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // const logout = useCallback(async () => {
  //  // removeCookie('biz-comrade-token', { path: '/' });
  //  /// dispatch(setToken(''));
  // }, [removeCookie, dispatch]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <MyMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MyMenuItem onClick={handleMenuProfile}>Profile</MyMenuItem>
      <MyMenuItem onClick={handleMenuChangePassword}>Change Password</MyMenuItem>
      <MyMenuItem onClick={handleMenuClose}>My account</MyMenuItem>
      {/* <MyMenuItem onClick={logout}>Logout</MyMenuItem> */}
    </MyMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <MyMenu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MyMenuItem>
        <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MyBadge badgeContent={4} color="error">
            <MyMailIcon />
          </MyBadge>
        </MyIconButton>
        <p>Messages</p>
      </MyMenuItem>
      <MyMenuItem>
        <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <MyBadge badgeContent={17} color="error">
            <MyNotificationsIcon />
          </MyBadge>
        </MyIconButton>
        <p>Notifications</p>
      </MyMenuItem>
      <MyMenuItem onClick={handleProfileMenuOpen}>
        <MyIconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MyAccountCircle />
        </MyIconButton>
        <p>Profile</p>
      </MyMenuItem>
    </MyMenu>
  );
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const theme = useTheme();
  //const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const firstRender = useFirstRender();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };
  const toggleDrawer1 = () => {
    if (matchDownMd) {
      setOpen(false);
    }
  };
  return (
    <>
     <MyBox>
        <MyAppBar position="fixed" elevation={0} sx={{ background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)', color: '#fff' }}>
          <MyToolbar>
            <MyBox sx={{ width: 290, display: 'flex' }}>
              <MyIconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer()}>
                <MyMenuIcon />
              </MyIconButton>
              {/* <MyTypography
              variant="h1"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            > */}
              <MyBox
                sx={{
                  textShadow: '2px 2px 5px black',
                  fontWeight: 'bold',
                  fontSize: '26px',
                  paddingTop: '5px',
                  width: '96px'
                }}
              >
                <MyLink to="/dashboard">
                  <MyLogo />
                </MyLink>
              </MyBox>
              {/* </MyTypography> */}
            </MyBox>
           
            <MyBox sx={{ flexGrow: 1 }} />
            <MyBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
                <MyBadge badgeContent={10} color="error">
                  <MyWhatsAppIcon  />
                </MyBadge>
              </MyIconButton>
              <MyIconButton size="large" aria-label="show 4 new mails" color="inherit">
                <MyBadge badgeContent={4} color="error">
                  <MyMailIcon />
                </MyBadge>
              </MyIconButton>
              <MyIconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <MyBadge badgeContent={17} color="error">
                  <MyNotificationsIcon />
                </MyBadge>
              </MyIconButton>
              <MyIconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <MyAccountCircle />
              </MyIconButton>
            </MyBox>
            <MyBox sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MyIconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MyMoreVertIcon />
              </MyIconButton>
            </MyBox>
          </MyToolbar>
        </MyAppBar>
        {renderMobileMenu}
        {renderMenu}
        <Offset></Offset>
      </MyBox>

      <MyBox sx={{ display: 'flex', backgroundColor: '#f9fafb', borderRadius: 8 }}>
        <MyBox component="nav" sx={{ background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)', width: firstRender ? 250 : open && matchUpMd ? 250 : 0 }}>
          <MyDrawer
            variant={firstRender ? 'persistent' : matchUpMd ? 'persistent' : 'temporary'}
            open={open}
            onClose={toggleDrawer()}
            sx={{
              width: 250,
              //position: 'relative', //imp
              '& .MuiDrawer-paper': {
                mt: firstRender ? 11 : open && matchUpMd ? 11 : 0,
                zIndex: 1099,
                //width: firstRender? 250: ( open && matchUpMd? 250: 0),
                background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)',
                color: theme.palette.text.primary,
                borderRight: 'none'
              }
            }}
            ModalProps={{ keepMounted: false }}
          >
            <MyPerfectScrollbar
              component="div"
              style={{
                overflowY: 'hidden',
                width: 250,
                height: 'calc(100vh - ' + (matchUpMd ? 89 : 20) + 'px)',
                maxHeight: 'calc(100vh - ' + (matchUpMd ? 89 : 20) + 'px)',
                //position: "fixed",
                //left: 0,
                marginTop: 0
              }}
            >
              <MySimpleTreeView
                aria-label="gmail"
                defaultExpandedItems={['3']}
                defaultSelectedItems="5"
                slots={{
                  expandIcon: MyArrowRightIcon,
                  collapseIcon: MyArrowDropDownIcon,
                  endIcon: EndIcon
                }}
                sx={{ flexGrow: 1, maxWidth: 250 }}
              >
                <CustomTreeItem itemId="3000" label="Core" labelIcon={MyPersonOutlineIcon}>
                  <CustomTreeItem
                    itemId="1"
                    label="Dashboard"
                    labelIcon={MyHomeIcon}
                    onClick={() => {
                      toggleDrawer1();
                      navigate('/dashboard');
                    }}
                  />
                 
                  <CustomTreeItem
                    itemId="2"
                    label="Users"
                    labelIcon={MySupervisorAccountIcon}
                    onClick={() => {
                      toggleDrawer1();
                      navigate('/users/list');
                    }}
                  />
                
                </CustomTreeItem>
            
        
               
              </MySimpleTreeView>
            </MyPerfectScrollbar>
          </MyDrawer>
        </MyBox>

        <MyCard
          component="div"
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            backgroundColor: '#fff  !important',
            position: 'relative',
            left: 0,
            width: 'calc(100vw - ' + (firstRender ? 250 : matchUpMd ? 250 : 0) + 'px'            
          }}
        >
          <MyBox
            sx={{
              flexGrow: 1,
              p: 0,
              m: 1.5,
              borderRadius: 2,
              //backgroundColor: '#f9fafb !important',
              minHeight: 'calc(100vh - 96px)'
            }}
          >
            <Outlet/>
          </MyBox>
        </MyCard>
      </MyBox>
    </>
  );
};

export default memo(CustomerLayout, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps); // Don't re-render!
});