export const uniformCostSearch = (grid, startSpot, endSpot) => {
    const openList = []; // Priority queue
    const closedList = [];
    openList.push(startSpot);

    while (openList.length > 0) {

        var lowerGScoreIdx = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].gScore < openList[lowerGScoreIdx].gScore) {
                lowerGScoreIdx = i;
            }
        }
        var current = openList[lowerGScoreIdx];

        if (current === endSpot) {

            var path = [];
            while (current.parent) {
                path.push(current);
                current = current.parent;
            }
            return [closedList, path.reverse()];
        }

        const index = openList.indexOf(current);
        if (index > -1) {
            openList.splice(index, 1);
        }
        closedList.push(current);
        current.visited = true;

        // Get neighbors
        const dx = [0, -1, 0, 1];
        const dy = [1, 0, -1, 0];
        let x = current.row;
        let y = current.col;

        for (let i = 0; i < 4; i++) {
            if (x + dx[i] < 0 || x + dx[i] > grid.length - 1) { continue };
            if (y + dy[i] < 0 || y + dy[i] > grid[0].length - 1) { continue; };

            let neighbor = grid[x + dx[i]][y + dy[i]];

            if (neighbor.visited || neighbor.isBarrier || listContainsObject(neighbor, closedList)) { continue; };

            var gScore = current.gScore + 1;
            var bestGScore = false;

            if (!listContainsObject(neighbor, openList)) {
                bestGScore = true;
                openList.push(neighbor);
            } else if (gScore < neighbor.gScore) {
                bestGScore = true;
            }

            if (bestGScore) {
                neighbor.parent = current;
                neighbor.gScore = gScore;
            }
        }
    }
}

function listContainsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}