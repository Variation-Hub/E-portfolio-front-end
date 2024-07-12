import { showMessage } from 'app/store/fuse/messageSlice';
import { getLearnerDetails } from 'app/store/learnerManagement';
import jsonData from 'src/url.json';

const SERVER_URL = jsonData.SOCKER_LINK

let socket;

export const connectToSocket = async (dispatch) => {
    console.log("conneciton")
    socket = await new WebSocket(SERVER_URL);

    setTimeout(() => {
        socket.send("123456")
    }, 5000)

    socket.onmessage = (message) => {
        console.log('Received message:', message);
        // dispatch(showMessage({ message: message.message, variant:"success"}));
        // dispatch(getLearnerDetails())
    };

    // return socket;
};

export const disconnectFromSocket = () => {
    // if (socket) {
    //     socket.disconnect();
    // }
};
