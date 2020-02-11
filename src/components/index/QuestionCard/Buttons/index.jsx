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

  changeAnswer = (a) => {
    const {clicked, userChoice} = this.state;
    function determineState(click, choice, data){
      if (!clicked) { return [true, data] }
      else {
        if (userChoice === null) { return [true, data] }
        else if (userChoice === data) { return [false, null]}
        else { return [true, data]}
      }
    }
    const results =  determineState(clicked, userChoice, a);

    this.setState({
      clicked: results[0],
      userChoice: results[1],
    })
  }

  render () {
    const { data } = this.props;
    const { clicked, userChoice } = this.state;

    return (
      <div className={styles.component + ' class-name'}>
        { data.map((a, i) =>
          <div
            key={`key${i}`}
            role='button'
            tabIndex='-1'
            onKeyPress={() => this.changeAnswer(a)}
            onClick={() => this.changeAnswer(a)}
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
