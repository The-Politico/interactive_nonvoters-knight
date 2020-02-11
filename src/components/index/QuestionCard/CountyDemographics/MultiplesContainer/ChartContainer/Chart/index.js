import { BaseChart, d3 } from '@politico/graphics-kit';

function type(d) {
  if (!d.value) return;
  d.value = +d.value;
  return d;
}

class MyChart extends BaseChart {
  draw() {
    if (!this.selection()) { return; }
    const node = this.selection().node();
    const w = node.offsetWidth > 750 ? 750 : node.offsetWidth ;

    const { data, metric, units, copy } = this.data()[0]
    const props = this.props();
    const margin = {top: 20, right: 20, bottom: 20, left: 20};

    const div = d3.select(node).appendSelect('div', 'container')

    // Append copy
    div.appendSelect('h3', 'hed')
      .html(copy.hed)

    div.appendSelect('h4', 'dek')
      .html(copy.dek)

    // Append svg stuff
    const svg = div.appendSelect('svg')
      .attr('width', w)
      .attr('height', w === 750 ? 140 : 170)

    const tooltip = div.appendSelect('div', 'tooltip');
    tooltip.html(`<p class='county'></p>
       <p class='winner'><span class='name'></span> won by <span class='pct'></span> points</p>`);

    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;

    const formatValue = d3.format(",d");

    const x = d3.scaleLinear()
        .rangeRound([margin.left, width + margin.left]);

    const sizeScale = d3.scaleLinear()
          .range([1, 20]);

    const colorScale = d3.scaleLinear()
          .domain([-10, 0, 10])
          .range(['#FFD682', '#E5E7EB', '#8ABDC0']);

    const g = svg.appendSelect("g", 'base')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xf = metric === 'VOTE_MARGIN' ? 50 : d3.max(data.map(d => d[metric]));
    const x0 = metric === 'VOTE_MARGIN' ? -50 : 0;

    x.domain([x0, xf]);
    sizeScale.domain(d3.extent(data, d => Math.sqrt(d.TOTAL)));

    // Start simulation and appending circles
    const simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(d => x(d[metric])).strength(1))
        .force("y", d3.forceY(height / 2 + 20))
        .force("collide", d3.forceCollide((d, i) => sizeScale(Math.sqrt(d.TOTAL)) + 1))
        .stop();

    for (var i = 0; i < 2000; ++i) simulation.tick();

    const cell = g.appendSelect("g", "cells")
      .selectAll("g").data(d3.voronoi()
          .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
          .x(d => d.x)
          .y(d => d.y)
        .polygons(data)).enter().append("g");

    cell.appendSelect("circle", "swarm")
        .attr("class", d => d === undefined ? null : `swarm fips-${d.data.FIPS} winner-${d.data.winner_abbr}`)
        .attr("r", d => d === undefined ? 0 : sizeScale(Math.sqrt(d.data.TOTAL)))
        .attr("cx", d => d === undefined ? 0 : d.data.x)
        .attr("cy", d =>  d === undefined ? 0 : d.data.y)
        .on('mouseenter', d => {
          const fips = d.data.FIPS;
          d3.selectAll('circle.fips-' + fips)
            .classed('stroked', true)
            .moveToFront();

          tooltip
            .style('opacity', 1)
            .html(`<p class='county'>${d.data.NAME_ABBR} County</p>
             <p class='winner'>
              <span class='name'>${d.data.results.WINNER}</span> won by
              <span class='pct pct-${d.data.results.WINNER}'>${Math.round(d.data.results.MARGIN * 100)}</span> points
            </p>`);
        })
        .on('mouseleave', () => {
          d3.selectAll('circle.swarm')
            .classed('stroked', false)
            .moveToBack();

          d3.selectAll('path')
            .moveToBack();

          tooltip
            .style('opacity', 0)
        })

    // Append units
    svg.appendSelect('text', 'units units-1')
      .attr('x', margin.left)
      .attr('y', 14)
      .text("← " + units[0])

    svg.appendSelect('text', 'units units-2')
      .attr('x', width + margin.left)
      .attr('y', 14)
      .text(units[1] + " →")

    // Define and append labels
    const dict = {
      NONWHITE_PCT: ['%', '% minority population', '%'],
      POP_DENSITY: ['', ' people per sq mile', ''],
      VOTE_MARGIN: ['% more votes for Clinton', 'Equal votes', '% more votes for Sanders'],
      PCT_OVER_25_BACH: ['%', '% of population have at least a bachelor\'s degree', '%']
    };

    for (let i = 0; i < dict[metric].length; i++){
      let place = x0;
      if (i === 1) { place = (x0 + xf) / 2}
      else if (i === 2) { place = xf}

      let text = metric === 'VOTE_MARGIN' && i === 0 ? Math.abs(place) : Math.round(place);
      text = metric === 'VOTE_MARGIN' && i === 1 ? '' : text;

      svg.appendSelect('text', 'axis-label axis-label-' + i)
        .attr('x', x(place))
        .attr('y', i === 1 ? 30 : height / 2 + 75)
        .text(text + dict[metric][i])
    }

    svg.appendSelect('path', 'midline')
      .attr('d', `M${x(x0)} ${height/2 + 40} L${x(xf)} ${height/2 + 40}`)

    svg.appendSelect('path', 'midline edges start')
      .attr('d', `M${x(x0)} ${height/2 + 20} L${x(x0)} ${height/2 + 60}`)

    svg.appendSelect('path', 'midline edges end')
      .attr('d', `M${x(xf)} ${height/2 + 20} L${x(xf)} ${height/2 + 60}`)

    svg.appendSelect('path', 'midline edges center')
      .attr('d', `M${x((x0 + xf)/2)} ${height/2 - 10 } L${x((x0 + xf)/2)} ${height/2 + 60}`)

    svg.selectAll('path.midline').moveToBack();
  }
}

export default MyChart;
