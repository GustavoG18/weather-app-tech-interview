import { useState, useEffect } from 'react';

interface Coords {
    accuracy: number;
    latitude: number;
    longitude: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
}

interface GeolocationData {
    timestamp: number;
    coords: Coords;
}

interface LocationState {
    lat?: string;
    long?: string;
}

export const useLocation = () => {
    const [location, setLocation] = useState<LocationState>({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const handleSuccess = (position: GeolocationData) => {
            setLocation({
                lat: position.coords.latitude.toString(),
                long: position.coords.longitude.toString(),
            });
        };

        const handleError = (error: {
            message: string;
        }) => {
            setError(error.message);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return { location, error };
};
