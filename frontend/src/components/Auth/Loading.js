import React from 'react';
import logo from './temp.png';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-row justify-around">
                    <img src={logo} alt="Default Logo" width="80" height="80" />
                </div>
                <p className="font-medium mt-10 text-center">Loading</p>
            </div>
        </div>
    );
}
