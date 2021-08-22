import { Auth } from 'aws-amplify';
import { navigate } from 'gatsby';
import React from 'react';

export default function Leave() {
    async function signOut() {
        try {
            await Auth.signOut();
            navigate('/enter');
        } catch (error) {
            console.log('[ERR] Failure to sign out: ', error);
        }
    }

    return (
        <button
            className="py-1 px-2 ml-2 font-semibold text-gray-500 rounded border border-gray-400 hover:text-white hover:bg-gray-400"
            onClick={signOut}
        >
            Sign out
        </button>
    );
}
