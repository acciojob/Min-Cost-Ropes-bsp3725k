function mincost(arr) {
    // Edge case: if there's only one rope, no cost is required to connect
    if (arr.length === 1) return 0;

    // Min-heap implementation using a priority queue
    let heap = new MinHeap();
    for (let rope of arr) {
        heap.insert(rope);
    }

    let totalCost = 0;

    // Combine ropes until only one rope is left
    while (heap.size() > 1) {
        let first = heap.extractMin();  // Smallest rope
        let second = heap.extractMin(); // Second smallest rope

        let cost = first + second;      // Cost to connect them
        totalCost += cost;

        heap.insert(cost);              // Add the new rope back to the heap
    }

    return totalCost;
}

// Min-heap implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this._bubbleUp();
    }

    extractMin() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown();
        return min;
    }

    _bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    _bubbleDown() {
        let index = 0;
        let length = this.heap.length;

        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

module.exports = mincost;
