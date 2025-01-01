"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import { Session } from "next-auth";

interface SessionContextType {
    session: Session | null;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(status === "loading");

    useEffect(() => {
        setIsLoading(status === "loading");
    }, [status]);

    return (
        <SessionContext.Provider value={{ session, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
};
