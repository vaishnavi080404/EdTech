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

                apiConnector("POST", profileEndpoints.UPDATE_USER_ACTIVITY_API, null, {
                    Authorization: `Bearer ${token}`
                });
            } catch (error) {
                
                console.error("Failed to update user activity heartbeat.");
            }
        };

        
        updateActivity(); 

        const intervalId = setInterval(updateActivity, 30000);

        return () => clearInterval(intervalId);

    }, [token]);

    return null; 
};