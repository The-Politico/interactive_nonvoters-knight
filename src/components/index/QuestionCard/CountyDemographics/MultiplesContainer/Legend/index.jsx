import React from 'react';
import styles from './styles.scss';
class Legend extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { data } = this.props;
    return (
      <div className={styles.component + ' class-name'}>
        { data.map(d =>
          <p className='legend'> <span className={d}></span> {d} </p>
        )}
      </div>
    );
  }
}
export default Legend;
