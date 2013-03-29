var data = [4, 8, 15, 16, 23, 42];

// var body = d3.select('body');

var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 420]);

// var chart = body.append('div')
//     .attr('class', 'chart');

// body.transition()
//     .duration(2750)
//     .style('background-color', 'black');

// chart.selectAll('div')
//     .data(data)
//   .enter().append('div')
//     .style('width', x)
//     .text(String);

var chart = d3.select('body').append('svg')
    .attr('class', 'chart')
    .attr('width', 420)
    .attr('height', 20 * data.length);


var w = 960,
    h = 500,
    start = Date.now();

var rings = [
  {radius: 65 * 1, width: 16, speed: -3e-2},
  {radius: 65 * 2, width: 16, speed: -2e-2},
  {radius: 65 * 3, width: 16, speed: -1e-2},
  {radius: 65 * 4, width: 16, speed: 1e-2},
  {radius: 65 * 5, width: 16, speed: 2e-2},
  {radius: 65 * 6, width: 16, speed: 3e-2}
];

var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.6)");

var ring = svg.selectAll("g")
    .data(rings)
  .enter().append("svg:g")
    .attr("class", "ring")
    .each(ringEnter);

d3.timer(function() {
  var elapsed = Date.now() - start,
      rotate = function(d) { return "rotate(" + d.speed * elapsed + ")"; };

  ring
      .attr("transform", rotate)
    .selectAll("rect")
      .attr("transform", rotate);
});

function ringEnter(d, i) {
  var n = Math.floor(2 * Math.PI * d.radius / d.width * Math.SQRT1_2),
      k = 360 / n;

  d3.select(this).selectAll("g")
      .data(d3.range(n).map(function() { return d; }))
    .enter().append("svg:g")
      .attr("class", "square")
      .attr("transform", function(_, i) { return "rotate(" + i * k + ")translate(" + d.radius + ")"; })
    .append("svg:rect")
      .attr("x", -d.width / 2)
      .attr("y", -d.width / 2)
      .attr("width", d.width)
      .attr("height", d.width);
}
