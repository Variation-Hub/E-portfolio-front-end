import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Logo from '../../../../shared-components/Logo';
import NavbarToggleButton from '../../../../shared-components/NavbarToggleButton';
import Navigation from '../../../../shared-components/Navigation';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import { useSelector } from 'react-redux';
import LogoIcon from 'app/theme-layouts/shared-components/LogoIcon';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '& ::-webkit-scrollbar-thumb': {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
      }`,
  },
  '& ::-webkit-scrollbar-thumb:active': {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
      }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: 'contain',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  background:
    'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 10px',
  backgroundAttachment: 'local, scroll',
}));

function NavbarStyle2Content(props) {

  const navbar = useSelector(selectFuseNavbar);

  const { foldedOpen } = navbar
  return (
    <Root className={clsx('flex flex-auto flex-col overflow-hidden h-full', props.className)}>
      <div className="flex flex-row items-center shrink-0 h-64 md:h-64 px-12">
        <div className="flex flex-1 mx-4">

        {foldedOpen ?
          <Logo />
          :
          <LogoIcon />
        }

        </div>
        {foldedOpen &&
          <NavbarToggleButton className="w-40 h-40 p-0" />
        }
      </div>

      <StyledContent option={{ suppressScrollX: true, wheelPropagation: false }}>
        <Navigation layout="vertical" />
        <div style={{ height: "8rem" }}>
        </div>
      </StyledContent>
    </Root>
  );
}

export default memo(NavbarStyle2Content);
