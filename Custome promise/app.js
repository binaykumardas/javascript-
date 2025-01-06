// Build a custom Promise from scratch.  


class CustomPromise {
    constructor(executor) {
        this.state = "pending"; // The initial state of the promise
        this.value = undefined; // To store the resolved value
        this.reason = undefined; // To store the rejected reason
        this.onResolvedCallbacks = []; // Callbacks for `.then` when resolved
        this.onRejectedCallbacks = []; // Callbacks for `.then` when rejected

        // Resolve method
        const resolve = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.onResolvedCallbacks.forEach((callback) => callback(this.value));
            }
        };

        // Reject method
        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
            }
        };

        try {
            executor(resolve, reject); // Execute the executor function
        } catch (error) {
            reject(error); // If an error occurs, reject the promise
        }
    }

    then(onFulfilled, onRejected) {
        // If `onFulfilled` is not provided, use a default function
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;

        // If `onRejected` is not provided, use a default function
        onRejected = typeof onRejected === "function" ? onRejected : (error) => { throw error; };

        if (this.state === "fulfilled") {
            onFulfilled(this.value);
        }

        if (this.state === "rejected") {
            onRejected(this.reason);
        }

        if (this.state === "pending") {
            this.onResolvedCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
    }
}

// Example usage:
const myPromise = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success!");
        // reject("Error!");
    }, 1000);
});

myPromise.then(
    (value) => {
        console.log("Resolved with:", value);
    },
    (reason) => {
        console.log("Rejected with:", reason);
    }
);

