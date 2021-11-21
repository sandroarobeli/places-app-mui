// Third party imports
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from "@mui/material/Avatar";

const AvatarWrapper = (props) => {
    const [thumb, setThumb] = useState();

    useEffect(() => {
        let reader = new FileReader();

        reader.onload = () => {
            setThumb(reader.result);
        };
        if (props.image) {
            reader.readAsDataURL(props.image);
        }

    }, [props.image])

    return (
        <Avatar
            variant='square'
            alt={props.image ? props.image.name : ''}
            src={thumb}
            sx={{
                margin: 'auto',
                border: '2px dashed lightgray',
                padding: '0.25rem',
                marginBottom: '0.75rem',
                backgroundColor: 'white',
                color: '#f50057',      
                width: 150,    
                height: 150
            }}
        />
    )
}

const ImageUpload = (props) => {
    return (
        <React.Fragment>
            <label htmlFor='image'>
                <input
                    id='image'
                    name='image'
                    accept=".jpg, .png, .jpeg"
                    type='file'
                    style={{ display: 'none' }}
                    multiple
                    onChange={props.handleImageUpload}  
                />
                <AvatarWrapper image={props.image} />   {/* image={values.image} goes to Formik  */}
                <Button
                    fullWidth
                    color='secondary'
                    variant="contained"
                    component="span"
                    endIcon={<PhotoCamera />}
                >
                    Upload Image
                </Button>
            </label>
        </React.Fragment>
    )
}

export default ImageUpload

