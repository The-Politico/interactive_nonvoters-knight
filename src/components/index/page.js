import React from 'react';

/* import components */
import { Ad, Comments, Container, Dek, Footer, Head, Headline, Info, Navigation, Section, Share } from '@politico/interactive-style';

/* import content */
import { pib as meta } from 'package.json';
import content from 'Content';

/* import styles */
import 'Theme/base.scss';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className='story'>
        <link rel="stylesheet" href="https://use.typekit.net/bvr3gvp.css" />
        <Head title={meta.pageName} social={content.social} publishPath={meta.publishPath} />
        <Navigation />
        <Ad.Banner />
        <Container>
          <div id='story' />
          <Comments publishPath={meta.publishPath} />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Page;

export { Helmet } from 'react-helmet';
