'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const SessionWrapper = ({ children }) => {
    return (
        <div>
            <div>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </div>
        </div>
    );
}

export default SessionWrapper;