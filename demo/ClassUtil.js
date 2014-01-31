define([], function() {

    var Class = {name: "classutil"};
 
   // getSet public variables, the curry way.
    Class.accessMaker = function(state, instance) {
        return {
            getSet: function(attr, aroundFns) {
                return function(_) {
                    if(_ === undefined) { return state[attr]; }
                    if(_ !== state[attr]) {
                        (aroundFns || []).forEach(function(fn) {
                            fn(_, function(new_) { _ = new_; });
                        });
                        state[attr] = _;
                    }
                    return instance;
                };
            }
        };
    };
    return Class;
});