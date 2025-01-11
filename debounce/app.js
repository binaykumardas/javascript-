// Create a debounce function to limit how often a task is executed.   


function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        // Clear any previously scheduled execution
        clearTimeout(timeoutId);

        // Schedule the function to execute after the delay
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Example Usage:
const logMessage = (message) => {
    console.log(message);
};

const debouncedLogMessage = debounce(logMessage, 1000);

// Simulating rapid calls
debouncedLogMessage("First call");
debouncedLogMessage("Second call");
debouncedLogMessage("Third call"); // Only this will be logged after 1 second.

/**
 * func: The function to execute after the debounce delay.
   delay: The time to wait before invoking the function, measured in milliseconds.
   timeoutId: A variable to store the timer ID for clearing the timeout if the function is called again before the delay period ends.
   Workflow: Every time the function is called, the previous timeout is cleared, and a new timeout is set.
            The func is executed only after the delay has elapsed without further invocations.
 */

