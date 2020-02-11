import React from 'react';
import styles from './styles.scss';
class Results extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className={styles.component + ' class-name'}>
      </div>
    );
  }
}
export default Results;
