import React, { useState } from 'react';
import Layout from '../components/Layout/layout';
import SignIn from '../components/Auth/SignIn';
import logo from './tora.jpg';
const EnterPage = () => {
    const [user, setUser] = useState(null);
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="flex flex-row justify-around">
                            <img src={logo} alt="Default Logo" />
                        </div>
                    </div>

                    <SignIn setUser={setUser} />
                </div>
            </div>
        </>
    );
};

export default EnterPage;
