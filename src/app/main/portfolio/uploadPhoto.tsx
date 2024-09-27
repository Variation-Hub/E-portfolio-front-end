import React, { useState } from 'react';
import { Button, Box, Avatar, Typography } from '@mui/material';

const UploadPhoto = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        // Handle the image upload logic here (e.g., send the image to a server)
        alert('Photo uploaded successfully!');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {/* Image Preview */}
            <Avatar
                alt="Awaiting Photo"
                src={selectedImage ? selectedImage : '/path-to-placeholder-image.png'}
                sx={{ width: 150, height: 200, mb: 2, border: '1px solid #ccc', borderRadius: 0 }}
            >
                {!selectedImage && (
                    <Typography variant="caption" color="textSecondary">
                        Awaiting Photo
                    </Typography>
                )}
            </Avatar>

            <div className='flex items-center justify-between w-full'>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#00bcd4', color: '#fff' }}
                >
                    Browse
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                {/* Upload Button */}
                <Button
                    variant="contained"
                    color="warning"
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
