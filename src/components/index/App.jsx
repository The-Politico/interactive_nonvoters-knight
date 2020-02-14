import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Markdown from 'react-markdown/with-html';
import { Ad, Section, Share, Headline, Dek, Info } from '@politico/interactive-style';

import { pib as meta } from 'package.json';
import content from 'Content';

import 'Theme/base.scss';

import Scoreboard from './Scoreboard';
import QuestionCard from './QuestionCard';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  //         <Share subject={meta.pageName} shareTweet={content.social.twitter.share_tweet} />

  render() {
    const { copy, timestamp, data } = this.props;

    return (
      <div>

        <Section href={content.section.link}>{content.section.name}</Section>
        <Headline>{copy.Hedline}</Headline>
        <Dek>{copy.Dek}</Dek>

        <img className='topper' src="./media/ledeart.png" alt='Lede art'/>

        <Info {...meta}/>

        <Markdown source={copy.Context} className='body' linkTarget='_blank' />

        <div className='sticky-container'>
          {
            copy.Questions.map((question, i) =>
              [2, 5, 7].includes(i) ?
              <div>
                <QuestionCard key={`key${i}`}
                  index={`${i + 1}`}
                  data={data.filter(a => a.ID === question.ID)}
                  copy={question}
                />
              </div>
              :
              <div>
                <Ad.Dynamic />
                <QuestionCard key={`key${i}`}
                  index={`${i + 1}`}
                  data={data.filter(a => a.ID === question.ID)}
                  copy={question}
                />
              </div>
            )
          }
        </div>

        <Ad.Dynamic />
        <Markdown source={copy.Methodology} className='methodology' linkTarget='_blank' />

        <div className='module-container'>
          { copy.modules.map(a =>
            <div className='module'>
              <img src={a.Img} alt={`Cover for ${a.Hed}`} />
              <h5> {a.FLAG} </h5>
              <h3><a href={a.URL}>{a.Hed}</a> </h3>
              <h4> By <span className='name'>{a.By}</span> </h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
