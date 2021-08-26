export const breathFirstSearch = (grid, startSpot, endSpot) => {
    const queue = [];

    startSpot.visited = true;
    startSpot.distance = 0;
    startSpot.parent = null;
    const start = [startSpot.row, startSpot.col];
    // const end = [endSpot.row, endSpot.col]

    queue.push(start);
    const path = [];

    while (queue.length > 0) {

        const tempCoord = queue.shift();
        const row = tempCoord[0];
        const col = tempCoord[1];

        let current = grid[row][col];
        path.push(current);

        if (current === endSpot) {
            return path;
        }

        const neighbors = [
            { row: row - 1, col },
            { row, col: col + 1 },
            { row: row + 1, col },
            { row, col: col - 1 }
        ]

        for (let i = 0; i < neighbors.length; i++) {
            const nRow = neighbors[i].row;
            const nCol = neighbors[i].col;

            if (nRow < 0 || nRow > grid.length - 1) { continue };
            if (nCol < 0 || nCol > grid[0].length - 1) { continue };
            if (grid[nRow][nCol].isBarrier) { continue };

            const nSpot = grid[nRow][nCol];

            if (nSpot.visited) { continue };

            nSpot.visited = true;
            nSpot.distance = current.distance + 1;
            nSpot.parent = current;

            queue.push([nSpot.row, nSpot.col]);
        }
    }
    return false;
}

export const bfsShortestPath = (spots, endSpot) => {
    const spotsInShortestPath = [];
    let currentSpot = endSpot;

    while (currentSpot !== null) {
        spotsInShortestPath.unshift(currentSpot);
        currentSpot = currentSpot.parent;
    }

    return spotsInShortestPath;
}
/*
function sortSpotsByDistance(spots) {
    spots.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    return spots;
}
*/