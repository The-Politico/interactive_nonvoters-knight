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
          <div>
            <p className='summary'>You answered more like <span className={`voter-${voter}`}>{voter ? 'voters' : 'nonvoters'}</span>.</p>

            <h4> Voters </h4>
            <div className='bar voter'>
              {
                data.map((a, i) =>
                  <div className={`segment choice-${i}`}
                    style={{ width: `${a.Voter}%`}}
                    key={`key-${i}`}
                  />
                )
              }
            </div>
            <div className='stats voter'>
              {
                data.map((a, i) =>
                  <p className={`stat stat-${i} bold-${userChoice === a && voter}`}>
                    {`${a.Voter}% ${a.Answer}`}
                  </p>
                )
              }
            </div>

            <h4> Nonvoters </h4>
            <div className='bar nonvoter'>
              {
                data.map((a, i) =>
                  <div className={`segment choice-${i}`}
                    style={{ width: `${a.Nonvoter}%`}}
                    key={`key-${i}`}
                  />
                )
              }
            </div>

            <div className='stats nonvoter'>
              {
                data.map((a, i) =>
                  <p className={`stat stat-${i} bold-${userChoice === a && !voter}`}>
                    {`${a.Nonvoter}% ${a.Answer}`}
                  </p>
                )
              }
            </div>
          </div>
        : null}
      </div>
    );
  }
}
export default Results;
