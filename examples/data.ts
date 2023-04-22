import * as lodashSampleSize from 'lodash.samplesize';

const SIZE = 4;
const DELAY = 500;

const REACT_LIBRARIES = [
    {
      "name": "React Router",
      "description": "A library for building single-page applications with dynamic routing in React.",
      "websiteUrl": "https://reactrouter.com/"
    },
    {
      "name": "Redux",
      "description": "A predictable state container for JavaScript apps, providing a centralized store for managing application state.",
      "websiteUrl": "https://redux.js.org/"
    },
    {
      "name": "Material-UI",
      "description": "A library of React components that implement Google's Material Design specification, offering pre-designed components for building responsive and customizable UIs.",
      "websiteUrl": "https://mui.com/"
    },
    {
      "name": "Next.js",
      "description": "A framework for building server-rendered React applications, offering features like automatic code splitting and server-side rendering.",
      "websiteUrl": "https://nextjs.org/"
    },
    {
      "name": "Styled Components",
      "description": "A library for styling React components with CSS-in-JS syntax, allowing developers to write CSS directly in their JavaScript code.",
      "websiteUrl": "https://styled-components.com/"
    },
    {
      "name": "Formik",
      "description": "A library for building forms in React, offering a simple API for managing form state and validation.",
      "websiteUrl": "https://formik.org/"
    },
    {
      "name": "React Native",
      "description": "A framework for building mobile applications with React, allowing developers to build cross-platform mobile apps with JavaScript and React.",
      "websiteUrl": "https://reactnative.dev/"
    },
    {
      "name": "React Testing Library",
      "description": "A library for testing React components, offering a set of utilities for rendering components and asserting their behavior.",
      "websiteUrl": "https://testing-library.com/docs/react-testing-library/intro/"
    },
    {
      "name": "Axios",
      "description": "A library for making HTTP requests from JavaScript applications, offering a simple API for sending and receiving data from APIs.",
      "websiteUrl": "https://axios-http.com/"
    },
    {
      "name": "React Bootstrap",
      "description": "A library of React components that implement Bootstrap's CSS framework, offering pre-designed components for building responsive and customizable UIs.",
      "websiteUrl": "https://react-bootstrap.github.io/"
    }
  ]
;

export const fetchData = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(lodashSampleSize(REACT_LIBRARIES, SIZE)), DELAY)
  );
