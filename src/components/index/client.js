import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// Fetch data from kitchen sink
fetch('https://www.politico.com/interactives/apps/kitchensink/10mwgxDA0iN4/data.json')
  .then(d => d.json())
  .then(data => {
    fetch('https://www.politico.com/interactives/apps/kitchensink/1ghnfCBlOLxO/data.json')
      .then(d => d.json())
      .then(copy => {
        ReactDOM.render(
          <App copy={copy.content}
                timestamp={copy.meta.lastModified}
                data={data.content.Sheet1}
            />,
          document.getElementById('story')
        );
      })

  });
