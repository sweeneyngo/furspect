import React, { useState } from 'react';
import Register from '../components/Auth/Register';

export default function RegisterPage() {
    const [status, setStatus] = useState('register');
    const [user, setUser] = useState(null);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="flex flex-row justify-around">
                            <img
                                src="/favicon.svg"
                                alt="Default Logo"
                                width="80"
                                height="80"
                            />
                        </div>
                    </div>

                    {status === 'register' && (
                        <Register
                            setStatus={setStatus}
                            setUser={setUser}
                            user={user}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
