import { useEffect, useState } from "react";

export default function SearchTimer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((current) => current + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    return (
        <p className="mt-4 text-sm text-gray-500">
            Component active for {seconds} seconds
        </p>
    );
}