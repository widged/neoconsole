define([], function() {

  var Class = {name: "cypher"};
  var neoconsole;

  Class.query = function(statements, asyncReturn)  {
      addConsoleIfNecessary(function() {
        queryConsole(neoconsole, statements, asyncReturn);
      });
  };

  function addConsoleIfNecessary(asyncReturn) {
    if(neoconsole) { asyncReturn(); return; }
    CypherConsole({'url': 'http://neo4j-console-20.herokuapp.com/'}, function (consolr) {
        neoconsole = consolr;
        asyncReturn();
    });
  }

  function queryConsole(consolr, statements, asyncReturn) {
        function whenSuccess(data, resultNo) {
          console.log('whenSuccess', data)
            asyncReturn(data);
        }
        function whenError(data, resultNo) {
            console.log('error', data)
        }
        consolr.query(statements, whenSuccess, whenError);
  }


  return Class;
});