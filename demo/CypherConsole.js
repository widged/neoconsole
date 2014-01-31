define([], function() {

  var Class = {name: "cypher"}, PV = {};
  var neoconsole;

  Class.query = function(statements, asyncReturn)  {
      PV.addConsoleIfNecessary(function() {
        PV.queryConsole(neoconsole, statements, asyncReturn);
      });
  };

  PV.addConsoleIfNecessary = function(asyncReturn) {
    if(neoconsole) { asyncReturn(); return; }
    CypherConsole({'url': 'http://neo4j-console-20.herokuapp.com/'}, function (consolr) {
        neoconsole = consolr;
        asyncReturn();
    });
  };

  PV.queryConsole = function(consolr, statements, asyncReturn) {
        function whenSuccess(data, resultNo) {
          console.log('whenSuccess', data)
            asyncReturn(data);
        }
        function whenError(data, resultNo) {
            console.log('error', data)
        }
        consolr.query(statements, whenSuccess, whenError);
  };


  return Class;
});