import { useTimer } from "../hooks/useTimer";

export default function Timer({ isRunning }: { isRunning: boolean}) {
    const { time } = useTimer(isRunning);

    return (
        <div className="text-gray text-3xl font-bold">
            {time}초
        </div>
    )
}