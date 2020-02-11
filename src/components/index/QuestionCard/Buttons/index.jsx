import React from 'react';
import styles from './styles.scss';

import Results from './Results';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    // Setup state that describes game
    this.state = {
      userChoice: null,
      clicked: false,
    };
  }

  chooseAnswer = (name) => {
    const { userChoice } = this.state;
    this.setState({ userChoice: name });
  }

  render () {
    const { data } = this.props;
    const { clicked, userChoice } = this.state;

    console.log(data)
    return (
      <div className={styles.component + ' class-name'}>
        { data.map((a, i) =>
          <div
            key={`key${i}`}
            role='button'
            tabIndex='-1'
            onKeyPress={() => this.setState({
              clicked: clicked ? false : true,
              userChoice: clicked ? null : a,
            })}
            onClick={() => this.setState({
              clicked: clicked ? false : true,
              userChoice: clicked ? null : a,
            })}
            className={`
              answer
              clicked-${userChoice === a}
            `}
          >
            <p> {a.Answer} </p>
          </div>
        )}

        <Results data={data} userChoice={userChoice} />
      </div>
    );
  }
}
export default Buttons;
