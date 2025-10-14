import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";

type SidebarContextType = {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarProviderProps = {
    children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = useCallback(() => setIsOpen(true), []);
    const closeSidebar = useCallback(() => setIsOpen(false), []);
    const toggleSidebar = useCallback(() => setIsOpen((v) => !v), []);

    return (
        <SidebarContext.Provider
            value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar(): SidebarContextType {
    const ctx = useContext(SidebarContext);
    if (!ctx) {
        throw new Error("useSidebar must be used inside SidebarProvider");
    }
    return ctx;
}
