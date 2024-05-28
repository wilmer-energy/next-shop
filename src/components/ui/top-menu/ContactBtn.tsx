"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import ModalComponent from './ModalComponent';
import ContactForm from './ContactForm';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        }
    },
});
export default function ContactBtn() {
    const [open, setOpen] = React.useState(false);
    const form = React.useRef();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        setTimeout(() => {
            handleOpen();
        }, 5000);
    }, []);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button onClick={handleOpen} color="primary">Contact me</Button>
            </ThemeProvider>
            <ModalComponent open={open} title="Contact the website creator" setOpen={setOpen} content={
                <ContactForm setOpen={setOpen} />
            } />
        </div>
    );
}
