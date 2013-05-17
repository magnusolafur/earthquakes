var width = 1000,
    height = 500;

var projection = d3.geo.mercator()
    .center([-22, 65 ])
    .scale(2500);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var loading = g.append("text").attr({x:500,y:250}).text("Loading")

var opacity = d3.scale.linear()
    .domain([0, 20])
    .range([0.3, 1]);

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);    



d3.json("flakar.json", function(error, topology) {
  loading.remove();
  g.selectAll("path")
    .data(topojson.object(topology, topology.objects.flakar).geometries)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "f4f3f0");
});

d3.csv("earthquakes.csv", function(data) {
            
            svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                 return projection([d.lat, d.lon])[0];
               })
               .attr("cy", function(d) {
                 return projection([d.lat, d.lon])[1];
               })
               .attr("r", function(d) {
                return Math.sqrt(parseInt(d.sz) * 50);
               })
               .attr("opacity", function(d) { return opacity(d.depth); })
               .style("fill", "red")
               .on("mouseover", function(d) {      
                  div.transition()        
                  .duration(200)      
                  .style("opacity", .8);      
                  div .html( d.date + "<br/>" + ' kl.' + d.t + "<br/>" + d.dist + ' ' + d.direction + ' ' + d.loc + "<br/>" + 'Stærð: ' + d.sz + "<br/>"  + 'Dýpt: ' + d.depth + 'Km ' + "<br/>" + 'Gæði: ' + d.quality)  
                  .style("left", (d3.event.pageX) + "px")     
                  .style("top", (d3.event.pageY - 28) + "px");    
                })                  
                .on("mouseout", function(d) {       
                  div.transition()        
                  .duration(500)      
                  .style("opacity", 0);  
                });
 
  });