define(["densitymap"], function(DensityMap) {

    var Class = { name: "traitdensity" };

    // ###################################
    //  Template
    // ###################################

    var template = function() {/*
        <div class="traits"></div>
        <br>
        <div id="densityMap">(a density map will appear here)</div>
    */}.toString().match(/[\s\S]*\/\*([\s\S]*)\*\/[\s\S]*/)[1];

    var templateTrait = function() {/*
        <a class="btn btn-small btn-success" data-toggle="tooltip" title="{{label}}" data-trait="{{id}}">{{label}}</a>
    */}.toString().match(/[\s\S]*\/\*([\s\S]*)\*\/[\s\S]*/)[1];


    // ###################################
    //  Template
    // ###################################

    Class.instance = function() {
        var instance = {};
        var d3node, traits = [];

        instance.traits = function(_) {
          if(_ === undefined) { return traits; }
          traits = _;
        };

        instance.mount = function(rootNode) {
            d3node = d3.select(rootNode);
            d3node.html(template);
            var traitList = traits.map(function(trait) {
              var tpl = templateTrait;
              tpl = tpl.replace(/\{\{id\}\}/g, trait.id);
              tpl = tpl.replace(/\{\{label\}\}/g, trait.label);
              return tpl;
            });
            d3node.select(".traits").html(traitList.join("\n"));
        };

        instance.actuate = function() {
            var visuNode = d3node.select('#densityMap');
            d3node.selectAll('[data-trait]').on('click', function(el) {
                var id = this.dataset.trait;
                var trait = findById(id, traits);
                visualizeTrait(trait, visuNode);
            });
        };
        return instance;
    };

    function findById(id, traits) {
      var out;
      traits.forEach(function(item) {
        if(id === item.id) { out = item; }
      });
      return out;
    }

    function visualizeTrait(trait, visuNode) {

        requirejs(["plantprovider"], function(Provider) {
          var provider = Provider.instance();
          visuNode.html('Loading...');
          provider.getDensities(trait.id, function(json) {
            console.log('success', json);
            drawVisu(json, trait);
          });
        });
    }

    function drawVisu(data, config) {
         if(!config) { config = {}; }

        console.log('config', config);


        if(!data) {
          document.getElementById('densityMap').innerHTML = 'N/A';
        } else if(config.render === "months") {
            monthDensities(data, config.colors);
        } else {
            measureDensities(data, config.colors);
        }

        // Month densities
        function monthDensities(data, colors) {
          var months   = "jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec".split(",");
          var seasons = "spr,spr,spr,smr,smr,smr,fll,fll,fll,wtr,wtr,wtr".split(",");
          var defaultColors = {spr: "#BF007F", smr: "#78B300", fll: "#805933", wtr: "#008FCC"};
          if(!colors) { colors = defaultColors; }

          all = months.map(function(item, i) {
            var season = seasons[i];
            return {n: 0, season: season, color: d3.rgb(colors[season]), d: item.substring(0, 1) };
          });


          var maxFreq = 0;
          data.forEach(function(item) {
            var mIdx = months.indexOf(item.d);
            if(mIdx === -1) { return; }
            all[mIdx].n += item.n;
            maxFreq = Math.max(maxFreq, all[mIdx].n);
          });

          var graph = DensityMap.instance().data(all).maxFreq(maxFreq);
          document.getElementById('densityMap').innerHTML = graph.render();

      }

      // Measure densities
      function measureDensities(data, colors) {
        // data: [{d: 4, n: 1},{d: 5, n: 2},{d: 6, n: 4},{d: 7, n: 1},{d: 8, n: 0},{d: 9, n: 0}]

        var defaultColors = "-10:#003366,30:#336600,40:#FF6600,50:#CC2222";
        var config = {colors:   colors || defaultColors};

        var maxFreq = 0;
        data.forEach(function(item) {
          maxFreq = Math.max(maxFreq, item.n);
        });

        var graph = DensityMap.instance().data(data).config(config).maxFreq(maxFreq);
        document.getElementById('densityMap').innerHTML = graph.render();

      }

    }


    return Class;

});
