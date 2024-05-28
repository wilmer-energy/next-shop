"use client";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface Props {
    message: { message: string, errors: string },
    setMessage: React.Dispatch<React.SetStateAction<{ message: string, errors: string }>>
}
function Message(props: Props) {
    const { message, setMessage } = props;
    React.useEffect(() => {
        if (message.errors.length > 0 || message.message.length > 0) {
            setTimeout(() => {
                setMessage({ message: '', errors: '' });
            }, 3000);
        }
    }, [message.message.length, message.errors.length]);
    return (<>
        {message.message.length > 0 && <Alert severity="success">{message.message}</Alert>}
        {message.errors.length > 0 && <Alert severity="error">{message.errors}</Alert>}
    </>);
}
export default Message;