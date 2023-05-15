import React from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Basic', url: '/basic' },
  { label: 'Initial data', url: '/initial-data' },
  { label: 'Shadow reload', url: '/shadow-reload' },
  { label: 'Hide error fallback', url: '/hide-error-fallback' },
];
const App = () => (
  <div className="container mx-auto p-4">
    <ul>
      {LINKS.map(({ label, url }) => (
        <li>
          <Link key={url} href={url} class="link">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
