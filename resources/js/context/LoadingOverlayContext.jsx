import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

const LoadingOverlayContext = createContext(null)

export const LoadingOverlayProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingOverlayContext.Provider value={{ isLoading, setIsLoading }}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingOverlayContext.Provider>
    )
}

export const useLoadingOverlay = () => useContext(LoadingOverlayContext)