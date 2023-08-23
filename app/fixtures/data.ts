const DATA = [
  {
    name: 'jQuery',
    shortDescription: 'A fast, small, and feature-rich JavaScript library.',
  },
  {
    name: 'React',
    shortDescription:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  },
  {
    name: 'Vue.js',
    shortDescription:
      'A progressive JavaScript framework for building user interfaces.',
  },
  {
    name: 'Angular',
    shortDescription:
      'A platform and framework for building single-page applications.',
  },
  {
    name: 'Dojo',
    shortDescription: 'A JavaScript library for building web applications.',
  },
  {
    name: 'Ember.js',
    shortDescription: 'A JavaScript framework for building web applications.',
  },
  {
    name: 'Backbone.js',
    shortDescription: 'A JavaScript library for building web applications.',
  },
  {
    name: 'Marionette.js',
    shortDescription: 'A JavaScript framework for building web applications.',
  },
  {
    name: 'Meteor',
    shortDescription:
      'A JavaScript framework for building real-time web applications.',
  },
  {
    name: 'Node.js',
    shortDescription: 'A JavaScript runtime environment.',
  },
  {
    name: 'Express.js',
    shortDescription: 'A web framework for Node.js.',
  },
  {
    name: 'Socket.io',
    shortDescription: 'A real-time communication library for Node.js.',
  },
  {
    name: 'Chart.js',
    shortDescription: 'A JavaScript library for creating charts.',
  },
  {
    name: 'D3.js',
    shortDescription: 'A JavaScript library for data visualization.',
  },
  {
    name: 'Three.js',
    shortDescription: 'A JavaScript library for 3D graphics.',
  },
  {
    name: 'Leaflet.js',
    shortDescription: 'A JavaScript library for creating interactive maps.',
  },
  {
    name: 'Moment.js',
    shortDescription: 'A JavaScript library for working with dates and times.',
  },
  {
    name: 'Underscore.js',
    shortDescription: 'A JavaScript library for utility functions.',
  },
  {
    name: 'Lodash',
    shortDescription: 'A JavaScript library for utility functions.',
  },
  {
    name: 'TinyMCE',
    shortDescription: 'A JavaScript library for rich text editing.',
  },
  {
    name: 'DataTables',
    shortDescription: 'A JavaScript library for creating interactive tables.',
  },
  {
    name: 'Bootstrap',
    shortDescription: 'A CSS framework for creating responsive web designs.',
  },
  {
    name: 'Font Awesome',
    shortDescription: 'A library of icons for use in web design.',
  },
  {
    name: 'jQuery UI',
    shortDescription: 'A collection of widgets and effects for jQuery.',
  },
  {
    name: 'gsap',
    shortDescription: 'A JavaScript library for animation.',
  },
  {
    name: 'GreenSock TweenMax',
    shortDescription: 'A JavaScript library for animation.',
  },
  {
    name: 'Babylon.js',
    shortDescription: 'A JavaScript library for 3D graphics.',
  },
  {
    name: 'A-Frame',
    shortDescription:
      'A JavaScript library for creating virtual reality experiences.',
  },
  {
    name: 'P5.js',
    shortDescription: 'A JavaScript library for creating interactive visuals.',
  },
  {
    name: 'Processing.js',
    shortDescription: 'A JavaScript library for creating interactive visuals.',
  },
];

const TIMEOUT = 1000;
const PAGE_SIZE = 2;

export const fetchData = ({
  searchKeyword,
  pageNo = 1,
}: {
  searchKeyword?: string;
  pageNo?: number;
}) => {
  const matchedItems = searchKeyword
    ? DATA.filter(item =>
        item.name.match(new RegExp(searchKeyword as string, 'gi'))
      )
    : DATA;
  const totalCount = matchedItems.length;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  const itemsInPage = matchedItems.slice(
    (pageNo - 1) * PAGE_SIZE,
    pageNo * PAGE_SIZE
  );
  console.log(itemsInPage);
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          items: itemsInPage,
          pageCount,
        }),
      TIMEOUT
    )
  );
};
