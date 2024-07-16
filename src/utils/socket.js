import { showMessage } from 'app/store/fuse/messageSlice';
import { getLearnerDetails } from 'app/store/learnerManagement';
import { fetchNotifications } from 'app/store/notification';
import jsonData from 'src/url.json';
import { SocketDomain } from './randomColor';
import { slice } from 'app/store/forum';
// import slice from ''
const SERVER_URL = jsonData.SOCKER_LINK

let socket;

export const connectToSocket = async (id, dispatch) => {
    socket = await new WebSocket(`${SERVER_URL}?id=${id}`);

    socket.onmessage = (Data) => {
        const { data, domain, } = JSON.parse(Data.data);

        if (domain === SocketDomain.CourseAllocation) {
            dispatch(showMessage({ message: data.message, variant: "success" }));
            dispatch(getLearnerDetails())
            dispatch(fetchNotifications())
        } else if (domain === SocketDomain.MessageSend) {
            dispatch(slice.newMassageHandler(data))
        }
    };

    return socket;
};

export const disconnectFromSocket = () => {
    // if (socket) {
    //     socket.disconnect();
    // }
};
