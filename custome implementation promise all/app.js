// Create your own Promise.all implementation

function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        // Check if input is an array
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Input must be an array"));
        }

        const results = []; // To store the results of resolved promises
        let completed = 0; // Counter to track how many promises are resolved

        // Iterate over each promise in the array
        promises.forEach((promise, index) => {
            // Use `Promise.resolve` to handle non-promise values
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value; // Save the result at the correct index
                    completed += 1; // Increment the completed counter

                    // If all promises are resolved, resolve the main promise
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    // If any promise rejects, reject the main promise
                    reject(error);
                });
        });

        // If the array is empty, resolve immediately
        if (promises.length === 0) {
            resolve(results);
        }
    });
}

// Usage example:
const promise1 = Promise.resolve(10);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(20), 1000));
const promise3 = Promise.resolve(30);

customPromiseAll([promise1, promise2, promise3])
    .then((results) => console.log("Results:", results)) // Output: Results: [10, 20, 30]
    .catch((error) => console.error("Error:", error));
