import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";

export type SearchTimerHandle = {
    start: () => void;
    stop: () => string;
    reset: () => void;
};

const SearchTimer = forwardRef<SearchTimerHandle>((props, ref) => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number | null>(null);

    function formatElapsedTime(totalSeconds: number): string {
        if (totalSeconds < 60) {
            return `${totalSeconds}s`;
        }

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
    }

    useImperativeHandle(ref, () => ({
        start() {
            if (intervalRef.current !== null) {
                return;
            }
            startTimeRef.current = Date.now();

            intervalRef.current = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        },

        stop() {
            if (startTimeRef.current === null) {
                return "0s";
            }

            const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current)/1000);

            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            return formatElapsedTime(elapsedSeconds);
        },

        reset() {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            startTimeRef.current = null;
            setSeconds(0);
        },

        
    }));

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);


    return (
        <p className="mt-4 text-sm text-gray-500">
            Agent search ongoing for {seconds} seconds
        </p>
    );
});

export default SearchTimer;