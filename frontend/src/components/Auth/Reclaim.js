import { Auth } from 'aws-amplify';
import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Route from '../Nav/Route';

export default function Reclaim({ setUser, setStatus }) {
    const [clientError, setClientError] = useState(null);
    const usernameRef = useRef();

    async function sendCode() {
        try {
            console.log('Sending code...');
        } catch (error) {
            setClientError(error.message);
            console.log('[ERR]: Failure to sign in.', error);
        }
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to furspect!
            </h2>

            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="username" className="sr-only">
                        Username
                    </label>
                    <input
                        ref={usernameRef}
                        id="username"
                        type="username"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                    />
                </div>
            </div>

            {clientError && (
                <div className="flex flex-row w-full justify-around font-medium bg-red-300 p-2 rounded">
                    {clientError}
                </div>
            )}

            <div>
                <button
                    onClick={sendCode}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    Send code
                </button>
            </div>
            <div className="flex items-center justify-around">
                <div className="text-sm">
                    <Route
                        route="/enter"
                        name="enter"
                        style="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
        </>
    );
}

Reclaim.propTypes = {
    setStatus: PropTypes.function,
    setUser: PropTypes.function,
};
