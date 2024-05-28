"use client";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

interface Props {
    closeFn: Function,
    saveFn: Function,
    closeLabel?: string,
    saveLabel?: string,
    disabled?: boolean,
    renderCancelButton?: boolean
    loading?: boolean
}
const theme = createTheme({
    palette: {
        secondary: {
            main: '#bbdefb',
            light: '#e3f2fd',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#0d47a1',
        },
    },
});
export default function SaveCancelBtn(props: Props) {
    const {
        closeFn,
        saveFn,
        closeLabel = "Close",
        saveLabel = "Save",
        disabled = false,
        renderCancelButton = true,
        loading = false
    } = props;
    return (
        <div className="flex flex-col sm:flex-row space-y-0 sm:space-y-0 flex-1 w-full items-center justify-end py-1 md:px-16">
            {renderCancelButton &&
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                >
                    <Button
                        className={"whitespace-nowrap closed"}
                        variant="outlined"
                        onClick={() => { closeFn() }}
                    >
                        {closeLabel}
                    </Button>
                </motion.div>
            }
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                <ThemeProvider theme={theme}>
                    <LoadingButton
                        className="whitespace-nowrap"
                        color="secondary"
                        disabled={disabled}
                        onClick={() => { saveFn() }}
                        loading={loading}
                        variant="contained"
                    >
                        {saveLabel}
                    </LoadingButton>
                </ThemeProvider>
            </motion.div>
        </div >
    );
}