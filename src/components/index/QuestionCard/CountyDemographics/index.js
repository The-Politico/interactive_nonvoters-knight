import React from 'react';
import classnames from 'classnames';

import MultiplesContainer from './MultiplesContainer';

import styles from './styles.scss';

const CountyDemographics = (props) => (
  <div className={classnames('CountyDemographics', styles.styles)}>
    <link rel="stylesheet" href="https://use.typekit.net/dsx2uhv.css" />
    <MultiplesContainer {...props} />
  </div>
);

export default CountyDemographics;
