import React from 'react';
import styles from './styles.scss';

class Scoreboard extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {data, showDel, showPct } = this.props;
    const tf = data[0].children.length > 2;

    function getCount(letter){
      const getChild = data[0].children.filter(a => a.name === letter);
      if (getChild.length === 0) { return 0 }
      else return getChild[0].children.length
    }

    function getPct(nb){
      const pct = Math.round(nb/36 * 100);
      return pct;
    }

    function getDel(nb){
      const pct = Math.round(nb/36 * 8);
      return pct;
    }

    const nbA = tf ? getCount('A') : 0;
    const nbB = tf ? getCount('B') : 0;
    const nbC = tf ? getCount('C') : 0;
    const nbD = tf ? getCount('D') : 0;

    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th />
              <th><span className='desktop'>Candidate</span> A</th>
              <th><span className='desktop'>Candidate</span> B</th>
              <th><span className='desktop'>Candidate</span> C</th>
              <th><span className='desktop'>Candidate</span> D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='nb-label'>Supporters</td>
              <td className='nb-A nb'>{nbA}</td>
              <td className='nb-B nb'>{nbB}</td>
              <td className='nb-C nb'>{nbC}</td>
              <td className='nb-D nb'>{nbD}</td>
            </tr>
            <tr className={`show-${showPct}`}>
              <td className='nb-label'>Percent</td>
              <td className='pct-A pct'>{getPct(nbA)}% <span className={getPct(nbA) < 15 ? 'ex' : 'check'}>{getPct(nbA) < 15 ? '✘' : '✔'}</span></td>
              <td className='pct-B pct'>{getPct(nbB)}% <span className={getPct(nbB) < 15 ? 'ex' : 'check'}>{getPct(nbB) < 15 ? '✘' : '✔'}</span></td>
              <td className='pct-C pct'>{getPct(nbC)}% <span className={getPct(nbC) < 15 ? 'ex' : 'check'}>{getPct(nbC) < 15 ? '✘' : '✔'}</span></td>
              <td className='pct-D pct'>{getPct(nbD)}% <span className={getPct(nbD) < 15 ? 'ex' : 'check'}>{getPct(nbD) < 15 ? '✘' : '✔'}</span></td>
            </tr>
            <tr className={`show-${showDel}`}>
              <td className='nb-label delegates'>Delegates</td>
              <td className='del-A del'>{getDel(nbA)}</td>
              <td className='del-B del'>{getDel(nbB)}</td>
              <td className='del-C del'>{getDel(nbC)}</td>
              <td className='del-D del'>{getDel(nbD)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Scoreboard;
