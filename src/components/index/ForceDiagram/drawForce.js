import { BaseChart, d3 } from '@politico/graphics-kit';

class Chart extends BaseChart {
  draw() {
    const data = this.data()[0];

    const div = this.selection().appendSelect('div');

    const width = div._groups[0][0].offsetWidth;
    const w = width > 800 ? 800 : width;
    const h = w === 800 ? window.innerHeight - 200: 400;
    const p = 20;

    const s1 = w === 800 ? -300 : -100;
    const s2 = w === 800 ? -200 : -100;

    const svg = div.appendSelect('svg')
      .attr('width', w)
      .attr('height', h)
      .attr("viewBox", [-w / 2, -h / 2, w, h]);

    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

     document.querySelectorAll('.node-g .face').forEach((node,i) => {
       const id = node.getAttribute('id');
       if (nodes.find(d => {return d.data.id == id})) {
         nodes.find(d => {
           return d.data.id == id
         }).x = +node.getAttribute('x');
         nodes.find(d => {
           return d.data.id == id
         }).y = +node.getAttribute('y');
       }
    });

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
          .id(d => d.id)
          .distance(d => d.target.data.children ? 90 : 20)
          .strength(.6))
        .force("charge", d3.forceManyBody()
          .strength(d => d.data.children ? s1 : s2))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        //.alphaTarget(0.3).restart();

    const node = svg.appendSelect("g", 'node-g')
      .selectAll("g.face")
      .data(nodes, d => {
        return d.data.id
      })
      .join("g")
      .classed('face', true)
      .attr('id', d => d.data.id);

    const r = 12;
    node.html('');

    // face base
    node
      .appendSelect("circle", "face-bg")
      .attr("class", d => d.children ? "face-bg no-fill" : "face-bg fill-" + d.parent.data.name)
      .attr("r", r)
      .attr("cx", 0)
      .attr("cy", 0);

    // Eye 1
    node
      .appendSelect("circle", "eye1")
        .attr("r", d => d.children ? 0 : 1)
        .attr("cx", d => -1 - 4 * Math.random())
        .attr("cy", d => -3);

    // Eye 2
    node
      .appendSelect("circle", "eye2")
        .attr("r", d => d.children ? 0 : 1)
        .attr("cx", d => 1 + 4 * Math.random())
        .attr("cy", d => -3);

    // Mouth
    node
      .appendSelect("path", 'mouth')
      .style("stroke", d => d.children ? 'none' : 'black')
      .attr('d', d => {
        const mouthTop = 2;
        const mouthSides = 2 + Math.random() * 3 - 3
        return `M${- 1 - 4 * Math.random()} ${mouthSides}
         L${0} ${mouthTop}
         L${1 + 4 * Math.random()} ${mouthSides}
       `})

    const candidateLabelsShadow = svg.appendSelect("g", 'candidate-label-g')
      .selectAll("text")
      .data(nodes)
      .join("text")
        .attr('class', d => 'candidate-label-shadow ' + d.data.name)
        .text( d => d.children && d.data.name !== 'candidates' ? 'Candidate ' + d.data.name : null)

    const candidateLabels = svg.appendSelect("g", 'candidate-label-shadow-g')
      .selectAll("text")
      .data(nodes)
      .join("text")
        .attr('class', d => 'candidate-label ' + d.data.name)
        .text( d => d.children && d.data.name !== 'candidates' ? 'Candidate ' + d.data.name : null)

    //simulation.alphaTarget(0.3).restart();
    const duration = 100;

    simulation.on("tick", () => {
      node
        .transition().duration(duration)
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr('x', d => d.x)
        .attr('y', d => d.y);

      candidateLabelsShadow.transition().duration(100)
          .attr("x", d => d.x)
          .attr("y", d => d.y);

      candidateLabels.transition().duration(100)
          .attr("x", d => d.x)
          .attr("y", d => d.y);
    });

    return this;
  }
}

export default Chart;
