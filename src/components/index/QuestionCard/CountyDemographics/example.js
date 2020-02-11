import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';
import results from './data/test_results_data.json';

import CountyDemographics from './index';

const App = () => {
  return (
    <Page title='CountyDemographics' page='CountyDemographics'>
      <CountyDemographics
        results={results}
        copy={{
            'minorities': {
              'hed': 'Minority',
              'dek': 'This is analysis about minorities.'
            },
            'education': {
              'hed': 'Education',
              'dek': 'This is analysis about people with at least bachelor degrees.'
            },
            'population_density': {
              'hed': 'Population Density',
              'dek': 'This is analysis about rural/urban sprawl.'
            },
            'vote_margin': {
              'hed': 'Past votes',
              'dek': 'This is analysis about preferences.'
            }
        }}
      />

      <CodeBlock
        value={`import { CountyDemographics } from '@politico/module_iowa-county-demographics';
        <CountyDemographics
          results={results}
          copy={{
            'minorities': {
              'hed': 'Minority',
              'dek': 'This is analysis about minorities.'
            },
            'education': {
              'hed': 'Education',
              'dek': 'This is analysis about people with at least bachelor degrees.'
            },
            'population_density': {
              'hed': 'Population Density',
              'dek': 'This is analysis about rural/urban sprawl.'
            },
            'vote_margin': {
              'hed': 'Past votes',
              'dek': 'This is analysis about preferences.'
            }
        }}
      />
        `}
      />
    </Page>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
