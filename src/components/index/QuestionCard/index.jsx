import React from 'react';
import styles from './styles.scss';

import Buttons from './Buttons';

class QuestionCard extends React.Component {
  constructor (props) {
    super(props);
  }
  //             <img src={`https://www.politico.com/interactives/uploads/image-service/${copy.Image}.png`} />

  render () {
    const {copy, data, index} = this.props;
    return (
      <div className={styles.component + ' class-name'}>
        <div className='container'>
          <div className='left-side'>
            <h5> {index} </h5>
            <img className='embellish' src="./../media/embellish.svg" alt='embellishment'/>
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
