export const moveItemWithinArray = (arr, item, newIndex) => {
    const arrClone = [...arr];
    const oldIndex = arrClone.indexOf(item);
    arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
    return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
    const arrClone = [...arr];
    arrClone.splice(index, 0, item);
    return arrClone;
};

export const updateArrayItemById = (arr, itemId, fields) => {
    const arrClone = [...arr];
    const item = arrClone.find(({ id }) => id === itemId);
    if (item) {
        const itemIndex = arrClone.indexOf(item);
        arrClone.splice(itemIndex, 1, { ...item, ...fields });
    }
    return arrClone;
};

export const sortByNewest = (items, sortField) =>
    items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));

export const throttle = (func, wait = 100) => {
    let timer = null;
    return (...args) => {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
};

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };

    // start with new or original interval, stop current interval
    this.reset = function (newFn, newT) {
        fn = newFn;
        t = newT;
        return this.stop().start();
    };
}

export default {
    moveItemWithinArray,
    insertItemIntoArray,
    updateArrayItemById,
    sortByNewest,
    throttle,
    Timer,
};
