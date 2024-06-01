import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import * as React from 'react';
import {
  Button,
  Grid,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Notification(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'info', title: 'Notification 1', description: 'This is the first notification', read: false },
    { id: 2, type: 'alert', title: 'Notification 2', description: 'This is the second notification', read: true },
    { id: 3, type: 'message', title: 'Notification 3', description: 'This is the third notification', read: false },
    { id: 4, type: 'info', title: 'Notification 4', description: 'This is the forth notification', read: false },
    { id: 5, type: 'info', title: 'Notification 5', description: 'This is the fifth notification', read: true },
    { id: 6, type: 'info', title: 'Notification 6', description: 'This is the sixth notification', read: false },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleReadAll = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleRemove = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleRemoveAll = () => {
    setNotifications([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log(notifications);

  return (
    <div>
      <Button aria-describedby={id} className='min-w-0 ' onClick={handleClick}>
        <NotificationsNoneIcon />
      </Button>
      <Popover
        className='top-24 '
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Grid className='flex flex-col items-center h-360 w-320 '>
          {notifications.length === 0 ? (
            <>
              <div className='flex flex-col items-center justify-center pt-44'>
                <div>
                  <img
                    className='pt-52 '
                    src="assets/images/svgImage/notification.svg"
                    alt="notification"
                  />
                </div>
                <div className="flex items-center justify-center p-16">
                  <Typography className="text-16 text-center" color="text.secondary">
                    You have no new notification now.
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <>
              <List className='p-0 pt-2'>
                {notifications.slice(0, 5).map((notification) => (
                  <ListItem key={notification.id} className='flex px-0 py-2 gap-24' divider>
                    <ListItemText>
                      <Typography style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                        {notification.title}
                      </Typography>
                      <Typography style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                        {notification.description}
                      </Typography>
                    </ListItemText>

                    <Grid className='flex content-center '>
                      <Button className='p-0 min-w-36' onClick={() => handleRead(notification.id)}>
                        <img
                          src="assets/images/svgImage/read.svg"
                          alt="read"
                        />
                      </Button>
                      <Button className='p-0 min-w-36' onClick={() => handleRemove(notification.id)}>
                        <img
                          src="assets/images/svgImage/remove.svg"
                          alt="remove"
                        />
                      </Button>
                    </Grid>
                  </ListItem>
                ))}
              </List>
              <Grid className='flex flex-col w-full text-center mt-auto'>
                <Grid className='w-full '>
                  <Link to="/notification">
                    <Button variant="text" className='text-[#5B718F] font-600 ' onClick={handleClose} >
                      View All
                    </Button>
                  </Link>
                </Grid>
                <Grid className='flex w-full '>
                  <Grid className='w-1/2 bg-[#5B718F33]'>
                    <Button variant="text" className='text-[#5B718F] font-600' onClick={handleReadAll}>
                      Mark as read all
                    </Button>
                  </Grid>
                  <Grid className='w-1/2 bg-[#5B718F]'>
                    <Button variant="text" className='text-[#ffffff] font-600' onClick={handleRemoveAll}>
                      Delete all
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Popover>
    </div >
  );
}

export default Notification;
