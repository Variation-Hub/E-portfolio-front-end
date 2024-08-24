import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import Notification from './notification';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import UserMenu from '../../shared-components/UserMenu';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';
function ToolbarLayout1(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      {
        autoDisplay: false,
        pageLanguage: "en",
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? toolbarTheme.palette.background.navbar
              : toolbarTheme.palette.background.default,
        }}
        position="static"
      >

        <Toolbar className="p-0 min-h-64 md:min-h-64" >

          <Typography className='ml-12' variant='h6'>Welcome</Typography>

          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {(config.navbar.style === 'style-3' ||
                    config.navbar.style === 'style-3-dense') && (
                      <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                    )}

                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}

          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <div id="google_translate_element" style={{ borderBottom: "1px solid lightgray", padding: 0, fontSize: "14px", width: "100px" }}></div>

            {/* <LanguageSwitcher /> */}
            <AdjustFontSize />
            {/* <NotificationPanelToggleButton /> */}
            <Notification />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
