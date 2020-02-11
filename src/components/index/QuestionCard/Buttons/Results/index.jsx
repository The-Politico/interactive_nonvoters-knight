import React from 'react';
import styles from './styles.scss';
class Results extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {data, userChoice} = this.props;
    const voter = userChoice !== null ? +userChoice.Voter > +userChoice.Nonvoter : null;
    console.log(data, userChoice)

    return (
      <div className={styles.component + ' class-name'}>
        { userChoice !== null ?
          <p className='summary'>You answered more like <span className={`voter-${voter}`}>{voter ? 'voters' : 'nonvoters'}</span>.</p>
        : null}
      </div>
    );
  }
}
export default Results;
