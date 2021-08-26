export const depthFirstSearch = (grid, startSpot, endSpot) => {

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

            for (let i = 0; i < 4; i++) {
                // Check if it is inside the grid
                if (x + dx[i] < 0 || x + dx[i] > grid.length - 1) { continue };
                if (y + dy[i] < 0 || y + dy[i] > grid[0].length - 1) { continue; };

                let newSpot = grid[x + dx[i]][y + dy[i]];
                if (newSpot.visited || newSpot.isBarrier) { continue; };
                newSpot.parent = spot;
                stack.push(newSpot);
            }
        }
    }
    return path;
}


export const dfsShortestPath = (spots, endSpot) => {
    const spotsInShortestPath = [];
    let currentSpot = endSpot;

    while (currentSpot !== null) {
        spotsInShortestPath.unshift(currentSpot);
        currentSpot = currentSpot.parent;
    }

    return spotsInShortestPath;
}