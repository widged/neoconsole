(function() {

    window.define = function(dependencies, Constructor) {
        if(!window.xx) { window.xx = {}; }
        var xx = window.xx;
        Deps = dependencies.map(function(item) {
            return xx[item];
        });
        var Class = Constructor.apply(null, Deps);
        xx[Class.name] = Class;
    };

    window.requirejs = function(dependencies, asyncReturn) {
         var xx = window.xx || {};
        Deps = dependencies.map(function(item) {
            return xx[item];
        });
        asyncReturn.apply(null, Deps);
    };
    
})()
