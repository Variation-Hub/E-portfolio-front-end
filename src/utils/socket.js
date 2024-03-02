import { showMessage } from 'app/store/fuse/messageSlice';
import { getLearnerDetails } from 'app/store/learnerManagement';
import io from 'socket.io-client';
import jsonData from 'src/url.json';

const SERVER_URL = jsonData.SOCKER_LINK

let socket;

export const connectToSocket = (dispatch) => {
    socket = io(SERVER_URL);

    socket.on('message', (message) => {
        console.log('Received message:', message);
        dispatch(showMessage({ message: message.message, variant:"success"}));
        dispatch(getLearnerDetails())
    });

    socket.on('connect_user', (message) => {
        console.log('Received user:', message);
    })

    return socket;
};

export const disconnectFromSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
