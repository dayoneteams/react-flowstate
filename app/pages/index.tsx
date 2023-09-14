import React from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Basic', url: '/basic' },
  { label: 'Initial data', url: '/initial-data' },
  { label: 'Shadow reload', url: '/shadow-reload' },
  { label: 'Preserve data on error', url: '/preserve-data-on-error' },
  { label: 'Custom children', url: '/custom-children' },
  { label: 'Layout nesting', url: '/layout-nesting' },
  { label: 'Dependencies and reload', url: '/reload-dependencies' },
  { label: 'Super example', url: '/super-example' },
];
const App = () => (
  <div className="container mx-auto p-4">
    <ul>
      {LINKS.map(({ label, url }) => (
        <li key={url}>
          <Link href={url} className="link">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
