// src/hooks/useActivityTracker.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/operations/apiconnector';
import { profileEndpoints } from '../services/operations/apis';

export const useActivityTracker = () => {
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) return;

        const updateActivity = () => {
            try {
                // This call is "fire and forget" - we don't need to wait for it
                apiConnector("POST", profileEndpoints.UPDATE_USER_ACTIVITY_API, null, {
                    Authorization: `Bearer ${token}`
                });
            } catch (error) {
                // Fails silently in the console
                console.error("Failed to update user activity heartbeat.");
            }
        };

        // Send a heartbeat immediately on load
        updateActivity(); 

        // And then send a heartbeat every 30 seconds
        const intervalId = setInterval(updateActivity, 30000);

        // Cleanup function to stop the interval when the user leaves
        return () => clearInterval(intervalId);

    }, [token]);

    return null; // This hook does not render anything
};