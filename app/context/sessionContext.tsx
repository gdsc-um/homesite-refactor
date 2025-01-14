"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  refreshSession: (userData: { name: string; email: string }) => void; // Menggabungkan updateProfile dalam refreshSession
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(status === "loading");

  useEffect(() => {
    setIsLoading(status === "loading");
  }, [status]);

  // Fungsi untuk me-refresh data sesi dan memperbarui profil
  const refreshSession = (userData: { name: string; email: string }) => {
    try {
      // Gabungkan data profil yang diperbarui dengan data sesi yang ada
      const updatedSession = { 
        ...session, 
        user: { 
          ...session?.user, 
          name: userData.name, 
          email: userData.email 
        }
      };

      // Menampilkan nilai atau isi data yang diperbarui
      console.log("Updated Session Data: ", updatedSession);

      // Perbarui sesi dengan data yang telah digabungkan
      update(updatedSession);

      // Menampilkan sesi yang telah diperbarui setelah update
      console.log("Session refreshed with updated profile:", updatedSession);
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  return (
    <SessionContext.Provider value={{ session, isLoading, refreshSession }}>
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
