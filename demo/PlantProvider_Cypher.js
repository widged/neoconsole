define(["cypher"], function(Cypher) {

  var Class = {name: "plantprovider"},
      PV = {}, FN = {};

  // the same graph data are shared between all components on a web page. 
  var initialized = false;

  Class.instance = function() {
    var instance = {};
    var createData = function() {/*
    CREATE 
    (anise:plant {name: "anise"}), 
    (anise)-[:kingdom {n: 1, trait: "/kingdom"}]->(plantae:kingdom {name: "plantae"}), 
    (anise)-[:blight {n: 1, trait: "/control/disease/blight"}]->(sclerotinia_blight:disease {name: "sclerotinia blight"}), 
    (anise)-[:blight {n: 2, trait: "/control/disease/blight"}]->(cercospora_blight:disease {name: "Cercospora blight"}), 
    (anise)-[:blight {n: 1, trait: "/control/disease/blight"}]->(leaf_blight:disease {name: "leaf blight"}), (anise)-[:fungal {n: 1, trait: "/control/disease/fungal"}]->(pythium_blight:disease {name: "pythium blight"}), (anise)-[:fungal {n: 1, trait: "/control/disease/fungal"}]->(anthracnose:disease {name: "anthracnose"}), (anise)-[:fungal {n: 2, trait: "/control/disease/fungal"}]->(rust:disease {name: "rust"}), (anise)-[:fungal {n: 1, trait: "/control/disease/fungal"}]->(downy_mildew:disease {name: "downy mildew"}), (anise)-[:insect {n: 1, trait: "/control/pest/animal/insect"}]->(leafhopper:animal {name: "leafhopper"}), (anise)-[:insect {n: 1, trait: "/control/pest/animal/insect"}]->(caterpillar:animal {name: "caterpillar"}), (anise)-[:insect {n: 1, trait: "/control/pest/animal/insect"}]->(aphid:animal {name: "aphid"}), (anise)-[:insect {n: 1, trait: "/control/pest/animal/insect"}]->(grasshopper:animal {name: "grasshopper"}), (anise)-[:helps {n: 3, trait: "/site/companion/plant/helps"}]->(cabbage:plant {name: "cabbage"}), (anise)-[:helps {n: 3, trait: "/site/companion/plant/helps"}]->(grape:plant {name: "grape"}), (anise)-[:hinderedBy {n: 2, trait: "/site/companion/plant/hinderedBy"}]->(carrot:plant {name: "carrot"}), (anise)-[:hinderedBy {n: 2, trait: "/site/companion/plant/hinderedBy"}]->(radish:plant {name: "radish"}), (anise)-[:tag {d:"Apiaceae", n: 1, trait: "/group/en/family"}]->(family:tag {name: "family"}), (anise)-[:tag {d:"annual", n: 3, trait: "/physiology/lifecycle"}]->(lifecycle:tag {name: "lifecycle"}), (anise)-[:tag {d:"herb", n: 1, trait: "/group/en/plantae"}]->(plantae), (anise)-[:tag {d:"vegetable", n: 1, trait: "/group/en/plantae"}]->(plantae), (anise)-[:tag {d:"cool", n: 1, trait: "/growth/season"}]->(season:tag {name: "season"}), (anise)-[:tag {d:"warm", n: 1, trait: "/growth/season"}]->(season), (anise)-[:tag {d:"part sun", n: 1, trait: "/exposure/light"}]->(light:tag {name: "light"}), (anise)-[:tag {d:"full sun", n: 4, trait: "/exposure/light"}]->(light), (anise)-[:tag {d:"well drained", n: 3, trait: "/soil/drainage"}]->(drainage:tag {name: "drainage"}), (anise)-[:tag {d:"direct", n: 2, trait: "/propagate/method"}]->(method:tag {name: "method"}), (anise)-[:tag {d:"compost", n: 1, trait: "/fertilizer/need/product"}]->(product:tag {name: "product"}), (anise)-[:tag {d:"sidedress", n: 1, trait: "/fertilizer/need/method"}]->(method), (anise)-[:tag {d:"N", n: 1, trait: "/fertilizer/need/npk"}]->(npk:tag {name: "npk"}), (anise)-[:tag {d:"Apiaceae", n: 2, trait: "/group/latin/family"}]->(family), (anise)-[:tag {d:"food", n: 1, trait: "/use"}]->(use:tag {name: "use"}), (anise)-[:tag {d:"pimpinella", n: 1, trait: "/name/latin/genus"}]->(genus:tag {name: "genus"}), (anise)-[:tag {d:"anisum", n: 1, trait: "/name/latin/epithet"}]->(epithet:tag {name: "epithet"}), (anise)-[:tag {d:"broad", n: 1, trait: "/physiology/leaf/texture"}]->(texture:tag {name: "texture"}), (anise)-[:tag {d:"lobed", n: 1, trait: "/physiology/leaf/texture"}]->(texture), (anise)-[:tag {d:"feathery", n: 1, trait: "/physiology/leaf/texture"}]->(texture), (anise)-[:tag {d:"low", n: 1, trait: "/physiology/shape"}]->(shape:tag {name: "shape"}), (anise)-[:tag {d:"spreading", n: 1, trait: "/physiology/shape"}]->(shape), (anise)-[:tag {d:"bushy", n: 1, trait: "/physiology/shape"}]->(shape), (anise)-[:tag {d:"limegreen ", n: 1, trait: "/physiology/leaf/color"}]->(color:tag {name: "color"}), (anise)-[:tag {d:"yellow", n: 1, trait: "/physiology/flower/bloom/color"}]->(color), (anise)-[:tag {d:"white", n: 1, trait: "/physiology/flower/bloom/color"}]->(color), (anise)-[:tag {d:"730,#", n: 1, trait: "/use/preserve/seed/viability"}]->(viability:tag {name: "viability"}), (anise)-[:tag {d:"oct", n: 1, trait: "/propagate/cal"}]->(cal:tag {name: "cal"}), (anise)-[:tag {d:"nov", n: 1, trait: "/propagate/cal"}]->(cal), (anise)-[:measure {d:6, n: 2, trait: "/soil/ph"}]->(ph:measure {name: "ph"}), (anise)-[:measure {d:7, n: 3, trait: "/soil/ph"}]->(ph), (anise)-[:measure {d:8, n: 1, trait: "/soil/ph"}]->(ph), (anise)-[:measure {d:30, n: 3, trait: "/physiology/size/height"}]->(height:measure {name: "height"}), (anise)-[:measure {d:40, n: 3, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:50, n: 3, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:60, n: 3, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:70, n: 1, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:80, n: 1, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:90, n: 1, trait: "/physiology/size/height"}]->(height), (anise)-[:measure {d:30, n: 2, trait: "/propagate/space/plants"}]->(plants:measure {name: "plants"}), (anise)-[:measure {d:10, n: 1, trait: "/propagate/space/plants"}]->(plants), (anise)-[:measure {d:15, n: 2, trait: "/propagate/space/plants"}]->(plants), (anise)-[:measure {d:20, n: 2, trait: "/propagate/space/plants"}]->(plants), (anise)-[:measure {d:25, n: 1, trait: "/propagate/space/plants"}]->(plants), (anise)-[:measure {d:45, n: 2, trait: "/propagate/space/row"}]->(row:measure {name: "row"}), (anise)-[:measure {d:50, n: 2, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:55, n: 2, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:60, n: 2, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:20, n: 1, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:25, n: 1, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:30, n: 1, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:35, n: 1, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:40, n: 1, trait: "/propagate/space/row"}]->(row), (anise)-[:measure {d:20, n: 1, trait: "/germination/temperature"}]->(temperature:measure {name: "temperature"}), (anise)-[:measure {d:10, n: 1, trait: "/germination/temperature"}]->(temperature), (anise)-[:measure {d:20, n: 1, trait: "/growth/temperature"}]->(temperature), (anise)-[:measure {d:30, n: 1, trait: "/growth/temperature"}]->(temperature), (anise)-[:measure {d:0, n: 1, trait: "/use/preserve/store/temperature"}]->(temperature), (anise)-[:measure {d:5, n: 1, trait: "/germination/time/from/seed"}]->(seed:measure {name: "seed"}), (anise)-[:measure {d:10, n: 2, trait: "/germination/time/from/seed"}]->(seed), (anise)-[:measure {d:15, n: 2, trait: "/germination/time/from/seed"}]->(seed), (anise)-[:measure {d:20, n: 1, trait: "/germination/time/from/seed"}]->(seed), (anise)-[:measure {d:25, n: 1, trait: "/germination/time/from/seed"}]->(seed), (anise)-[:measure {d:30, n: 1, trait: "/germination/time/from/seed"}]->(seed), (anise)-[:measure {d:100, n: 2, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:120, n: 3, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:60, n: 2, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:125, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:130, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:135, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:140, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:145, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:150, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:50, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:55, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:65, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:70, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:105, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:110, n: 1, trait: "/maturity/time/from/seed"}]->(seed), (anise)-[:measure {d:115, n: 1, trait: "/maturity/time/from/seed"}]->(seed);

  */}.toString().match(/[\s\S]*\/\*([\s\S]*)\*\/[\s\S]*/)[1];

    instance.getDensities = function(trait, asyncReturn) {
        PV.initializeIfNecessary(createData, function() {
          PV.getTraitDensities(trait, asyncReturn);
        });
    };
    return instance;
  };


// ###################################
//  Functions with side effects. 
//  Same logic as prototype functions. Functions that do 
//  the bulk of the work are placed outside of the instance to minimize the amount of 
//  data that need to be copied anytime a new instance is constructed.
// ###################################
  PV.initializeIfNecessary = function(createData, asyncReturn) {
    if(!initialized) {
      Cypher.query([ createData ], function() {
          initialized = true;
          asyncReturn();
      });

    } else {
        asyncReturn();
    }
  };

  PV.getTraitDensities = function(trait, asyncReturn) {
    var type = "measure";
    if(trait && trait.indexOf('/cal') !== -1) {
        type = "tag";
    }
    statements = [
        'MATCH (m:'+type+')-[r2:'+type+' { trait: "'+ trait+'" }]-(p:plant { name: "anise" }) RETURN r2.d as d, r2.n as n'
    ];
    Cypher.query(statements, function(data) {
        var json = FN.asArray(data.json);
        asyncReturn(json);
    });
  };

// ###################################
//  Functions with no side effect
//  and no dependency whatsover on variables within the scope
// ###################################
  FN.asArray = function(pseudoArray) {
    return Array.prototype.slice.call(pseudoArray, 0);
  };


  return Class;
});