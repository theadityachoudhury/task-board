import React, { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-6 px-4">
                {children}
            </main>
            <footer className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
                Task Board App © {new Date().getFullYear()}
            </footer>
        </div>
    );
};