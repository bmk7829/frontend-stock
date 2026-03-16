import { useState, useEffect } from 'react';

export function useMarketStatus() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            // Get time in IST
            const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            
            const day = istTime.getDay(); // 0 is Sunday, 6 is Saturday
            const hours = istTime.getHours();
            const minutes = istTime.getMinutes();
            
            const isWeekend = day === 0 || day === 6;
            
            // Market hours: 9:15 AM to 3:30 PM
            const marketOpenMin = 9 * 60 + 15;
            const marketCloseMin = 15 * 60 + 30;
            const currentMin = hours * 60 + minutes;
            
            if (!isWeekend && currentMin >= marketOpenMin && currentMin <= marketCloseMin) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return isOpen;
}
