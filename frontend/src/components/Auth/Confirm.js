import { Auth } from 'aws-amplify';
import { useRef, useState } from 'react';
import { navigate } from 'gatsby';

export default function Confirm({ user, setUser, setStatus }) {
    const codeRef = useRef();
    const passwordRef = useRef();
    const [clientError, setClientError] = useState(null);
    const [isVerificationCodeStale, setIsVerificationCodeStale] =
        useState(true);

    // if no user then go back to sign up
    if (!user) {
        setStatus('register');
    }

    if (isVerificationCodeStale) {
        var sendNewCodeButton = (
            <button
                onClick={resendConfirmationCode}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Send a new verification code
            </button>
        );
    } else {
        var sendNewCodeButton = (
            <button className="cursor-default group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 focus:outline-none ">
                New verification code sent!
            </button>
        );
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(user.username);
            console.log('Resending code went successfully!');
            setIsVerificationCodeStale(false);
        } catch (err) {
            setClientError(error.message);
            console.log('[ERR]: Failure to resend code: ', err);
        }
    }

    async function confirmSignUp() {
        try {
            setClientError(null);
            setIsVerificationCodeStale(true);
            console.log('confirm function ' + user);
            console.log('code: ' + codeRef.current.value);
            await Auth.confirmSignUp(user.username, codeRef.current.value);
            console.log('gets here?');

            const { attributes } = await Auth.signIn(
                user.username,
                passwordRef.current.value
            );

            console.log(attributes);
            setUser(attributes);

            navigate('/');
        } catch (error) {
            setClientError(error.message);
            console.log('error confirming sign up', error);
        }
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Email Verification
            </h2>

            <div className="flex flex-row w-full bg-gray-200 rounded justify-around font-medium p-2">
                A verification code has been sent to {user.username}, enter it
                and your password below.
            </div>

            {clientError && (
                <div className="flex flex-row w-full justify-around font-medium bg-red-300 p-2 rounded">
                    {clientError}
                </div>
            )}

            <div>
                <div>
                    <label htmlFor="code" className="sr-only">
                        Verification Code
                    </label>
                    <input
                        ref={codeRef}
                        id="code"
                        type="number"
                        required
                        className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Verification Code"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Re-enter Password
                    </label>
                    <input
                        ref={passwordRef}
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button
                    onClick={confirmSignUp}
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
                    Confirm
                </button>
            </div>

            {sendNewCodeButton}
        </>
    );
}
