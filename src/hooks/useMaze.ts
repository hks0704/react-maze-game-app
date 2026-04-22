import { useEffect, useState } from "react";

// export type Cell = 0 | 1; // 0: 길, 1: 벽
export type Cell = "wall" | "path" | "player";

export function useMaze(size: number) {
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [player, setPlayer] = useState({x: 0, y: 0});
    const [isClear, setIsClear] = useState(false);

    // 초기 미로 생성 (임시: 랜덤 벽)
    useEffect(() => {
        const newMaze: Cell[][] = Array.from({ length: size }, () => 
            Array.from({ length: size }, () => (Math.random() > 0.7 ? "wall" : "path"))
        );

        newMaze[0][0]="path";
        newMaze[size - 1][size - 1] = "path";

        setMaze(newMaze);
        setPlayer({x: 0, y: 0});
        setIsClear(false);
    }, [size, isClear]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let { x, y } = player;

            if (e.key === "ArrowUp") y--;
            if (e.key === "ArrowDown") y++;
            if (e.key === "ArrowLeft") x--;
            if (e.key === "ArrowRight") x++;
            
            if (maze[y]?.[x] === "path") { // ?. : 옵셔널 체이닝 문법, 범위 이탈 문제를 해결
                setPlayer({ x, y });

                if (x === size - 1 && y === size - 1) {
                    setIsClear(true);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [player, maze, size]); // TODO: 재시작시 중복 렌더링 관련해서 수정할 부분

    const reset = () => {
        setMaze([]);
        setPlayer({ x: 0, y: 0 });
        setIsClear(false);
    };

    return { maze, player, isClear, reset };
}