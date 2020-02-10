import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Markdown from 'react-markdown/with-html';
import * as d3 from 'd3';
import { Ad, Section, Share, Headline, Dek, Info } from '@politico/interactive-style';

import { pib as meta } from 'package.json';
import content from 'Content';

import 'Theme/base.scss';
//import data from 'Data/data.json';
import { generateAlignment } from './utils/generateAlignment';

import ForceDiagram from './ForceDiagram';
import Scoreboard from './Scoreboard';

const voters = [];
for (let i = 0; i <= 40; i++) {
  voters.push(Math.floor(Math.random() * 100000));
}
console.log(voters);

class App extends React.Component {
  constructor(props){
    super(props);
    const { data, copy, timestamp } = props;
    this.state = {
      stepData: 0,
      showPct: false,
      showDel: false
    }
  }

  onStepEnter = ({ el, data, dir }) => {
    //console.log(el, data, dir)
    this.setState({
      stepData: data,
      showPct: data > 1,
      showDel: data > 3
    })
  }

  render() {
    const { copy, timestamp } = this.props;
    const { stepData, showDel, showPct } = this.state;

    const data = generateAlignment(stepData, voters);
    //const timestampToShow = d3.timeFormat('%m/%d/%y %I:%M%p')(new Date(timestamp));

    return (
      <div>
        <Share subject={meta.pageName} shareTweet={content.social.twitter.share_tweet} />

        <img className='topper' src="./media/topper.gif" alt='bouncing heads'/>
        <Section href={content.section.link}>{content.section.name}</Section>
        <Headline>{copy.Hedline}</Headline>
        <Dek>{copy.Dek}</Dek>
        <Info {...meta}/>

        <Markdown source={copy.Context} className='body' linkTarget='_blank' />

        <h3 className='main-sub'> {copy.HowHed} </h3>
        <hr className='underscore' />

        <div className='sticky-container'>
          <Scoreboard data={data} showPct={showPct} showDel={showDel}/>
          <ForceDiagram data={data} />

          <Scrollama onStepEnter={this.onStepEnter}>
          {
            copy.HowItWorks.map((a,i) =>
              <Step data={i} key={'key-' + i}>
                <div className={`step-container ${i === 4 ? 'last' : null} ${i === 0 ? 'first' : null}`}>
                  <h3>{a.Title}</h3>
                  <p>{a.Description}</p>
                  { i === 2 ?
                    <Markdown source={copy.Disclaimer} className='disclaimer' linkTarget='_blank' />
                    : null
                  }
                </div>
              </Step>
            )
          }
          </Scrollama>
        </div>

        <Markdown source={copy.More} className='body' linkTarget='_blank' />

        <h3 className='main-sub'> {copy.WhyHed} </h3>
        <hr className='underscore' />

        <Markdown source={copy.WhyContent} className='body' linkTarget='_blank' />

        <Ad.Dynamic />

        <Markdown source={copy.Methodology} className='methodology' linkTarget='_blank' />

      </div>
    );
  }
}

export default App;
