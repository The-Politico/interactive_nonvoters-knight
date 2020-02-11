import React from 'react';
import styles from './styles.scss';
class Buttons extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { data } = this.props;
    console.log(data)
    return (
      <div className={styles.component + ' class-name'}>
        { data.map((a, i) =>
          <div className='choice' key={`key${i}`}>
            <p> {a.Answer} </p>
          </div>
        )}
      </div>
    );
  }
}
export default Buttons;
