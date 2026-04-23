import { useMaze } from "../hooks/useMaze";
import Timer from "./Timer";

interface Props {
    size: number;
}

type CellType = "wall" | "path";
type RenderCellType = CellType | "player";

const CELL_STYLE: Record<RenderCellType, string> = {
    wall: "bg-black",
    path: "bg-gray-200",
    player: "bg-red-200",
};

function Cell({ type }: { type: RenderCellType }) {
    return <div className={`w-5 h-5 ${CELL_STYLE[type]}`} />;
};

const resolveCellType = (
    cell: CellType,
    isPlayer: boolean
): RenderCellType => {
    return isPlayer ? "player" : cell;
};

export default function MazeBoard({ size }: Props) {
    const { maze, player, isClear, reset} = useMaze(size);

    return (
        <div>
            {isClear && (
                <div className="clear">
                    <h2>🎉 Clear!</h2>
                    <button onClick={reset}>다시 시작</button>
                </div>
            )}

            <Timer isRunning={true} />
            <div 
            className="maze grid gap-[2px] justify-center mt-5"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${size}, 20px)`,
            }}
            >
                {maze.map((row, y) => 
                    row.map((cell, x) => {
                        const type = resolveCellType(
                            cell,
                            player.x === x && player.y === y
                        );
                        return <Cell key={`${x}-${y}`} type={type} />;
                    })
                )}
            </div>
        </div>
    );
}