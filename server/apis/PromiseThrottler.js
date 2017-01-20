/**
 * PromiseThrottler is a class that takes Promise factories
 * (functions returning Promises) and runs a maximum number
 * of Promises within a specified time period.
 */

class PromiseThrottler {

    /**
     * Constructor: Returns PromiseThrottler that will execute
     * at most {maximum} Promises within {interval} ms.
     */
    constructor(maximum, interval) {
        this._capacity = maximum;
        this._interval = interval;
        this._backlog = [];
    }

    /**
     * exec(promiseFactory) immediately executes the Promise
     * returned by the promiseFactory if capacity has not been
     * met, and otherwise backlogs it.
     */
    exec(promiseFactory) {
        // Ensure that the a argument passed is a Function
        if (!(promiseFactory instanceof Function)) {
            console.error('Throttler must take a Function');
            return;
        }

        if (this._capacity > 0) {
            // If capacity remains, execute immediately
            return this._runPromiseFactory(promiseFactory);
        } else {
            // If full, backlog the Promise factory 
            return new Promise((resolve, reject) => {
                this._backlog.push({
                    factory: promiseFactory,
                    resolve: resolve,
                    reject: reject
                });
            }) 
        }
    }

    /**
     * runPromiseFactory executes a promiseFactory immediately.
     */
    _runPromiseFactory(promiseFactory) { 
        console.log(`Running at ${new Date()}`)
        // Dimish the capacity
        this._capacity--;

        // To determine the execution time        
        let startTime = +new Date();
        let timeToDelay;

        // Retrieve the Promise
        let promise = promiseFactory();

        // Ensure the object returned from the factory is a Promise
        if (typeof (promise.then) !== 'function') {
            // If not, restore the capacity and run a backlogged Promise
            this._capacity++;
            this._runBackloggedPromiseFactory();
            return Promise.reject('Throttler must take a Function returning a Promise');
        }        

        // Same callback for .then and .catch, since we just pass
        // through the value after ensuring scheduling backlog hygiene
        let cb = val => {
            // Determine the time to wait before running next Promise
            timeToDelay = this._interval - (+new Date() - startTime) + 2000;
            console.log(`Delaying by ${timeToDelay}`);

            // Wait to restore the capacity and run next Promise
            setTimeout(() => {
                this._capacity++;
                this._runBackloggedPromiseFactory();
            }, timeToDelay);
            
            return val;
        };
        
        return promise
            .then(cb)
            .catch(cb);
    }

    /**
     * runBackloggedPromiseFactory() runs the next backlogged Promise
     * if possible.
     */
    _runBackloggedPromiseFactory() {
        // Ensure the backlog is nonempty and that capacity remains
        if (this._backlog.length !== 0 && this._capacity > 0) {
            let next = this._backlog.shift();
            
            this._runPromiseFactory(next.factory)
                .then(next.resolve)
                .catch(next.reject);
        }
    }
}

module.exports = PromiseThrottler;