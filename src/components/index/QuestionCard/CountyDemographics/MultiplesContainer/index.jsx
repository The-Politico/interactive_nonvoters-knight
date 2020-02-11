import React from 'react';
import styles from './styles.scss';
import Legend from './Legend';
import ChartContainer from './ChartContainer';

import demographics from './../data/county_demographics.json';
import { processData } from './../utils/processData.js';

class MultiplesContainer extends React.Component {
  constructor (props) {
    super(props);
    const processed = processData(demographics, props.results);
    this.state = {
      data: processed[0],
      winners: processed[1]
    }
    //console.log(props.results, demographics);
  }

  render () {
    const { data, winners } = this.state;
    const { copy } = this.props;
    return (
      <div className={styles.component + ' class-name'}>
        <Legend data={ winners } />
        <ChartContainer data={[{
            data: data,
            metric: 'NONWHITE_PCT',
            units: ['Counties with less minorities', 'More minorities'],
            copy: copy.minorities,
        }]} />

        <ChartContainer data={[{
            data: data,
            metric: 'PCT_OVER_25_BACH',
            units: ['Less educated counties', 'More educated'],
            copy: copy.education,
        }]} />

        <ChartContainer data={[{
            data: data,
            metric: 'POP_DENSITY',
            units: ['Sparsely populated counties', 'Densely populated'],
            copy: copy.population_density,
        }]} />

        <ChartContainer data={[{
            data: data,
            metric: 'VOTE_MARGIN',
            units: ['Counties that voted more for Hillary Clinton', 'Voted more for Bernie Sanders'],
            copy: copy.vote_margin,
        }]} />

      </div>
    );
  }
}
export default MultiplesContainer;
