const PriorityQueue = require('priorityqueuejs');

const graph = {
    E6: { E7: 1 },
    E7: { E6: 1, E5: 1 },
    E5: { E7: 1, E3: 1 },
    E3: { CIM: 1, E2: 1, E5: 1 },
    E2: { E3: 1, CPH: 1, PHY: 1, RCH: 1, DWE: 1 },
    CPH: { E2: 1 },
    DWE: { E2: 1, RCH: 1, SCH: 2 },
    RCH: { E2: 1, DWE: 1 },
    SCH: { DWE: 2, TC: 1 },
    PHY: { E2: 1, EIT: 1 },
    EIT: { CIM: 1, PHY: 1, ESC: 1 },
    CIM: { E3: 1, EIT: 1, DC: 1 },
    DC: { M3: 1, CIM: 1, C2: 1, MC: 1 },
    ESC: { EIT: 1, B1: 1, C2: 1 },
    B1: { ESC: 1, B2: 1 },
    B2: { QNC: 1, STC: 1, B1:1},
    STC: { B2: 1, NH: 1 },
    NH: { STC: 1 },
    C2: { ESC: 1, DC: 1, MC: 1 },
    MC: { SLC: 1, QNC: 1, C2: 1, DC: 1, M3: 1 },
    M3: { MC: 1, DC: 1 },
    QNC: { B2: 1, MC: 1 },
    SLC: { MC: 1, PAC: 1 },
    PAC: { LHI: 2, SLC: 1 },
    LHI: { EXP: 1, BMH: 1, PAC: 1 },
    EXP: { LHI: 1, BMH: 1 },
    BMH: { EXP: 1, LHI: 1 },
    TC: { AL: 1, HH: 1, SCH: 1 },
    AL: { LIB: 1, ML: 1, EV1: 1, TC: 1 },
    LIB: { AL: 2 },
    ML: { ML: 1 },
    EV1: { AL: 1, EV2: 1 },
    HH: { PAS: 1, TC: 1 },
    PAS: { HH: 1 },
    EV2: { EV3: 1, EV1: 1 },
    EV3: { EV2: 1 },
};


function contains(queue, callback) {
  let found = false;
  const tempQueue = new PriorityQueue(queue.comparator);

  while (!queue.isEmpty()) {
    const element = queue.deq();
    if (callback(element)) {
      found = true;
    }
    tempQueue.enq(element); // Re-enq to maintain the queue state
  }

  // Restore the original queue state
  while (!tempQueue.isEmpty()) {
    queue.enq(tempQueue.deq());
  }

  return found;
}

function getPath(start, end) {

    if(start === '' || end === ''){
        return [];
    }

    const visited = new Set();

    const dists = Object.fromEntries(
        Object.keys(graph).map(key => [key, key === start ? 0 : Infinity])
    );

    const prevs = {};

    let nodeQueue = new PriorityQueue((a, b) => a.dist - b.dist);
    nodeQueue.enq({node:start, dist:dists[start]})

    // let currNode = start;

    while (!nodeQueue.isEmpty()) {

        let currNode = nodeQueue.deq()['node'];
        console.log(`current queue: ${JSON.stringify(nodeQueue._elements)}`) 
        console.log(`current dists: ${JSON.stringify(dists)}`)

        //if(currNode === end)
         //   break;

        // update distances and prev node
        for (var [node, dist] of Object.entries(graph[currNode])) {
            const newDist = dists[currNode] + dist;

            if (newDist < dists[node]) {
                console.log(`updating distance for ${JSON.stringify(node)} from ${dists[node]} to ${newDist}`)
                dists[node] = newDist;
                prevs[node] = currNode;
            }
        }

        // set curr node as visited
        visited.add(currNode);

        // chooses new currNode
        for (var neighbor in graph[currNode]) {
            if (!visited.has(neighbor) && !contains(nodeQueue, ((entry) => entry.node === neighbor))) {
                console.log(`currNode: ${currNode}, Enqueuing: ${node}, Distance: ${dists[node]}`);
                nodeQueue.enq({ node: neighbor, dist: dists[neighbor] });
            }
        }

    }

    let nextDest = end;
    let path = [];

    while (nextDest !== start) {
        path = path.concat(nextDest);
        nextDest = prevs[nextDest];
    }

    path = path.concat(start);

    return path.reverse();
}

function getGraph() {
    return graph;
}

// console.log(getPath('B2', 'SLC'));
export default getPath;
export { getGraph };
