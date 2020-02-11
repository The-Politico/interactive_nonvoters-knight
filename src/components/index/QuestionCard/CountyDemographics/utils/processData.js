import * as d3 from 'd3';

export function processData(demographics, results) {
  const nested = d3.nest()
    .key(a => a.WINNER)
    .entries(results)

  // Only give candidates colors if they win more than TK% of the counties
  const threshold = .1;
  const winners = nested.filter( a => a.values.length / results.length > threshold).map(a => a.key);
  let otherExists = 0;

  demographics.forEach(d => {
    const fipsMatch = results.filter(a => +a.FIPS === +d.FIPS)[0]
    const candidate = fipsMatch.WINNER;
    // Append winner data to d
    d.results = fipsMatch;
    d.winner_abbr = winners.includes(candidate) ? candidate : 'other';
    otherExists = winners.includes(candidate) ?  otherExists : otherExists + 1;
  })
  const legend = otherExists > 0 ? winners.concat('Others') : winners;

  return [demographics, legend];
};
