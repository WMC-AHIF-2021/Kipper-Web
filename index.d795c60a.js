// Avoid `console` errors in browsers that lack a console.
(()=>{
    let method;
    const noop = ()=>{
    // do nothing
    };
    const methods = [
        "assert",
        "clear",
        "count",
        "debug",
        "dir",
        "dirxml",
        "error",
        "exception",
        "group",
        "groupCollapsed",
        "groupEnd",
        "info",
        "log",
        "markTimeline",
        "profile",
        "profileEnd",
        "table",
        "time",
        "timeEnd",
        "timeline",
        "timelineEnd",
        "timeStamp",
        "trace",
        "warn", 
    ];
    let length = methods.length;
    // @ts-ignore
    const console = window.console = window.console || {
    };
    while(length--){
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) console[method] = noop;
    }
})(); // Place any jQuery/helper plugins in here.

//# sourceMappingURL=index.d795c60a.js.map