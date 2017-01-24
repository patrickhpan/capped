function keyDown(func, keyCodes) {
    if (typeof keyCodes === 'number') {
        keyCodes = [keyCodes];
    }
    if (!(keyCodes instanceof Array)) {
        return () => { };
    }
    return function (event) {
        let keyCode = event.which || event.keyCode || event.charCode;
        if (keyCodes.indexOf(keyCode) !== -1) {
            func();
        }
    }
} 

export default keyDown;