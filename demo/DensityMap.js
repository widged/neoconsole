define(["classutil"], function(ClassUtil) {

  var Class = {name: "densitymap"};

  var rowPadding = 6,
      cellSpacing = 1;

  var render =function(data, maxFreq, config) {
    if(!config) { config = {isVertical: false}; }
    var isVertical = (config.isVertical === true || config.isHorizontal === false) ? true : false;

    var rect = isVertical ? {w: 18, h: 14} : {w: 14, h: 16};
    var monthX = isVertical ? function(i) { return 0; } : function(i) { return i * (rect.w + cellSpacing); };
    var monthY = isVertical ? function(i) { return i * (rect.h + cellSpacing); } : function(i) { return 0; };
    var CELL_OPACITY = 0.6;

    var colorFn = function() { return "#CCCCCC"; };
    if(config.colors) {
      var colors = (config.colors || "").split(",").map(function(item) {
        var p = item.split(":");
        return { d: parseFloat(p[0]), c: p[1] };
      });
      colorFn = function(d) {
        var c = "#CCCCCC";
        colors.forEach(function(item) { if(d > item.d) { c = item.c; } });
        return c;
        };
    } else if(config.colorNames) {
      CELL_OPACITY = 1.0;
      colorFn = function(d) { return d; };
    }

    function setColorFn(colors) {

    }



      var probabilityScale = d3.scale.linear().domain([0, maxFreq]).range([0.0,1]).clamp(false);
    // var colorFn = function(value,color) { return d3.interpolateRgb("#fff", color )(value / maxFreq); } // used alpha scale instead
    var barGirth = 4;

    var div = document.createElement('div');
    var easel = d3	.select(div)
					.append("svg:svg")
					.attr("width", monthX(12) || rect.w).attr("height", monthY(12) || rect.h );

    var monthRect =  easel.selectAll("g")
        .data(data)
        .enter().append("svg:g")
        .attr("width", rect.w)
        .attr("height", function(d) { return rect.h; } )
        .attr("transform", function(d, i) { return "translate("+monthX(i)+"," + monthY(i)+")"; } );

    monthRect.append("svg:rect")
        .attr("class", "month")
        .attr("width", function(d, i) { return (isVertical ?  rect.w - barGirth : rect.w) ; })
        .attr("height", function(d) { return (isVertical ?  rect.h : rect.h - barGirth) ; })
        .attr("fill", function(d, i) { return colorFn(d.d); }) // colorFn(0.1, d.color)
        .attr("fill-opacity", function(d, i) { return  CELL_OPACITY; });


    monthRect.append("svg:rect")
        .attr("class", "heat")
        .attr("x", function(d, i) { return (isVertical ?  rect.w - barGirth : 0) ; })
        .attr("y", function(d, i) { return (isVertical ?  0 : rect.h - barGirth) ; })
        .attr("width", isVertical ? barGirth : rect.w)
        .attr("height", function(d) { return isVertical ? rect.h : barGirth; } )
        .attr("fill", function(d, i) { return (d || {}).color; }) // "#828387", d.color; however, difficult to differentiate between different colors
        .attr("fill-opacity", function(d, i) { return  probabilityScale((d || {}).n); });

    monthRect.append("svg:text")
        .attr("x", function(d, i) { return (isVertical ?  7 : 7); })
        .attr("y", function(d, i) { return (isVertical ?  10 : 9); })
        .style("text-anchor", "middle")
        .text(function(d, i) { return ((d || {}).d === undefined || config.colorNames ? "" : d.d).toString().toUpperCase();  }) // "" + i + "." + 
        .attr("font-size", "9");

      return div.innerHTML;
  };


  Class.instance = function() {
    var instance = {}, s = {};

  function warnChange() { dataChange = true; }

  var access          = ClassUtil.accessMaker(s, instance);
  instance.data       = access.getSet("data",       [warnChange]);
  instance.maxFreq    = access.getSet("maxFreq",    [warnChange]);
  instance.config     = access.getSet("config", [warnChange]);

    instance.render = function(selector) {
      return render(s.data, s.maxFreq, s.config);
    };

      return instance;
  };

  return Class;
});