export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const SocketDomain = {
    Notification: "notification",
    Message: "message",
    CourseAllocation: "Course Allocation",
    MessageSend: "Message Send",
    MessageUpdate: "Message Update",
    MessageDelete: "Message Delete",
}