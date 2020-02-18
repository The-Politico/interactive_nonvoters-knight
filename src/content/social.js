import path from 'path';
import { pib as meta } from 'package.json';

export default {
  'fbook': {
    'card_title': 'Quiz: Do you know what motivates people to vote or abstain?',
    'card_description': 'See if your beliefs align more with voters or nonvoters.',
  },
  'twitter': {
    'card_title': 'Quiz: Do you know what motivates people to vote or abstain?',
    'share_tweet': 'Quiz: Do you know what motivates people to vote or abstain?',
    'card_description': 'See if your beliefs align more with voters or nonvoters.',
  },
  'image': {
    'url': `https://www.politico.com/${path.join(meta.publishPath, 'media/share.jpg')}`,
    'alt': '<Text>',
    'type': 'image/jpeg',
    'width': '600',
    'height': '300',
  },
};
