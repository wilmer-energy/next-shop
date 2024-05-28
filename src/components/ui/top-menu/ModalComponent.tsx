"use client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { ReactNode } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    p: 4,
};
interface Props {
    open: boolean,
    title: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    content: ReactNode
}
function ModalComponent(props: Props) {
    const { open, setOpen, title, content } = props;
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Modal
                disableEnforceFocus
                className='z-10'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {title}
                    <div className="content mt-12">
                        {content}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalComponent;