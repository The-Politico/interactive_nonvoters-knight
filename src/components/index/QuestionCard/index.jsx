import React from 'react';
import styles from './styles.scss';

import Buttons from './Buttons';

class QuestionCard extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {copy, data, index} = this.props;
    return (
      <div className={styles.component + ' class-name'}>
        <div className='container'>
          <div className='left-side'>
            <img src={`https://www.politico.com/interactives/uploads/image-service/${copy.Image}.png`} />
            <h5> {index} </h5>
            <h3> {data[0].Question} </h3>
          </div>
          <div className='right-side'>
            <Buttons data={data} />
          </div>
        </div>
        <p> {copy.Description} </p>
      </div>
    );
  }
}
export default QuestionCard;
