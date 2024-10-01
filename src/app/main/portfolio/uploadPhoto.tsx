import { useState } from 'react';
import { Button, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGlobalUser } from 'app/store/globalUser';
import { useDispatch } from 'react-redux';
import { uploadLearnerAvatar } from 'app/store/userManagement';
import { getRandomColor } from 'src/utils/randomColor';

const UploadPhoto = () => {

    const dispatch: any = useDispatch();
    const globalUser = useSelector(selectGlobalUser);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (selectedFile) {
            dispatch(uploadLearnerAvatar(selectedFile));
        }
        setSelectedFile(null)
        setSelectedImage(null)
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Avatar
                alt="Awaiting Photo"
                src={selectedImage ? selectedImage : globalUser.selectedUser.avatar}
                sx={{ width: 150, height: 200, mb: 2, border: '1px solid #ccc', borderRadius: 0, backgroundColor: getRandomColor(globalUser?.selectedUser?.user_name?.toLowerCase().charAt(0)) }}
            >
            </Avatar>

            <div className='flex items-center justify-between w-full'>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#007E84', color: '#fff' }}
                    className='hover:bg-[#007E84]'
                >
                    Browse
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                <Button
                    variant="contained"
                    className='bg-[#007E84] text-white hover:bg-[#007E84]'
                    disabled={!selectedImage}
                    onClick={handleUpload}
                >
                    Upload photo
                </Button>
            </div>
        </Box>
    );
};

export default UploadPhoto;
