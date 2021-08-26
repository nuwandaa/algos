export const randomWalkSearch = (grid, startSpot, endSpot) => {

    // Neighbors
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    let stack = [];
    let path = [];
    stack.push(startSpot);

    while (stack.length > 0) {
        let spot = stack.pop();
        if (!spot.visited) {
            // If not visited, visit it
            spot.visited = true;
            path.push(spot);

            if (spot === endSpot) {
                return path;
            }

            let x = spot.row;
            let y = spot.col;

            // Random move choice
            var randomMoves = [0, 1, 2, 3];
            for (let i = randomMoves.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [randomMoves[i], randomMoves[j]] = [randomMoves[j], randomMoves[i]];
            }

            for (let i = 0; i < 4; i++) {
                // Check if it is inside the grid
                let move = randomMoves[i];
                if (x + dx[move] < 0 || x + dx[move] > grid.length - 1) { continue };
                if (y + dy[move] < 0 || y + dy[move] > grid[0].length - 1) { continue; };

                let newSpot = grid[x + dx[move]][y + dy[move]];
                if (newSpot.visited || newSpot.isBarrier) { continue; };
                newSpot.parent = spot;
                stack.push(newSpot);
            }
        }
    }
    return path;
}