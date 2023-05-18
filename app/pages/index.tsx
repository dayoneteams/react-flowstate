import React from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Basic', url: '/basic' },
  { label: 'Initial data', url: '/initial-data' },
  { label: 'Shadow reload', url: '/shadow-reload' },
  { label: 'Preserve data on error', url: '/preserva-data-on-error' },
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
