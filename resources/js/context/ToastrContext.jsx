import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';

const ToastrContext = createContext(null)

export const ToastrProvider = ({ children }) => {
    const toastRef = useRef(null)

    const toast = {
        success: ({
            title = 'Title',
            message = 'Message',
            duration = 3000
        }) => {
            toastRef.current.show({
                severity: 'success', 
                summary: title, 
                detail: message, 
                life: duration
            });
        },
        error: ({
            title = 'Title',
            message = 'Message',
            duration = 3000
        }) => {
            toastRef.current.show({
                severity: 'error', 
                summary: title, 
                detail: message, 
                life: duration
            });
        },
        warning: ({
            title = 'Title',
            message = 'Message',
            duration = 3000
        }) => {
            toastRef.current.show({
                severity: 'warn', 
                summary: title, 
                detail: message, 
                life: duration
            });
        },
        info: ({
            title = 'Title',
            message = 'Message',
            duration = 3000
        }) => {
            toastRef.current.show({
                severity: 'info', 
                summary: title, 
                detail: message, 
                life: duration
            });
        }
    }

    return (
        <ToastrContext.Provider value={{ toast }}>
            <Toast ref={toastRef} />
            {children}
        </ToastrContext.Provider>
    )
}

export const useToastr = () => useContext(ToastrContext)