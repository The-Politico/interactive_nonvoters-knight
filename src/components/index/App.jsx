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

  render() {
    const { copy, timestamp, data } = this.props;

    return (
      <div>
        <Share subject={meta.pageName} shareTweet={content.social.twitter.share_tweet} />

        <img className='topper' src="./media/topper.gif" alt='bouncing heads'/>
        <Section href={content.section.link}>{content.section.name}</Section>
        <Headline>{copy.Hedline}</Headline>
        <Dek>{copy.Dek}</Dek>
        <Info {...meta}/>

        <Markdown source={copy.Context} className='body' linkTarget='_blank' />

        <div className='sticky-container'>
          {
            copy.Questions.map((question, i) =>
              <QuestionCard key={`key${i}`}
                index={`Question ${i + 1} of ${copy.Questions.length}`}
                data={data.filter(a => a.ID === question.ID)}
                copy={question}
              />
            )
          }
        </div>

        <Markdown source={copy.Methodology} className='methodology' linkTarget='_blank' />

      </div>
    );
  }
}

export default App;
