import path from 'path';
import { pib as meta } from 'package.json';

export default {
  'fbook': {
    'card_title': 'An illustrated guide to the Iowa caucuses',
    'card_description': 'How they work and why we still do them',
  },
  'twitter': {
    'card_title': 'An illustrated guide to the Iowa caucuses',
    'share_tweet': 'An illustrated guide to the Iowa caucuses: How they work and why we still do them',
    'card_description': 'How they work and why we still do them',
  },
  'image': {
    'url': `https://www.politico.com/${path.join(meta.publishPath, 'media/share.jpg')}`,
    'alt': '<Text>',
    'type': 'image/jpeg',
    'width': '600',
    'height': '300',
  },
};
