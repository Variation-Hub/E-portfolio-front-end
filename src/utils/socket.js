import { showMessage } from 'app/store/fuse/messageSlice';
import { getLearnerDetails } from 'app/store/learnerManagement';
import { fetchNotifications } from 'app/store/notification';
import jsonData from 'src/url.json';

const SERVER_URL = jsonData.SOCKER_LINK

let socket;

export const connectToSocket = async (id, dispatch) => {
    socket = await new WebSocket(`${SERVER_URL}?id=${id}`);

    socket.onmessage = (data) => {
        const { title, domain, message, type } = JSON.parse(data.data);

        if (domain === "Course Allocation") {
            dispatch(showMessage({ message: message, variant: "success" }));
            dispatch(getLearnerDetails())
            dispatch(fetchNotifications())
        }
    };

    return socket;
};

export const disconnectFromSocket = () => {
    // if (socket) {
    //     socket.disconnect();
    // }
};
