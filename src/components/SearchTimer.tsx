import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";

export type SearchTimerHandle = {
    start: () => void;
    stop: () => void;
    reset: () => void;
};

const SearchTimer = forwardRef<SearchTimerHandle>((props, ref) => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useImperativeHandle(ref, () => ({
        start() {
            if (intervalRef.current !== null) {
                return;
            }

            intervalRef.current = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        },

        stop() {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        },

        reset() {
            setSeconds(0);
        }
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