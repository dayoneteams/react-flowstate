# How to Contribute

## Prerequisites
- Node.js (LTS recommended) installed.
- Git installed.

## Development
Clone codebase and install dependencies.
```
npm install
```

## Bundling library and run test app server with live code update
Start build process in watch mode.
```
npm start
```
This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Open another terminal window and run the test app.
```
npm run app

# Or to build and run test app on production mode
npm run app:prod
```
Check the test app on http://localhost:3000

## Automation Test
```
npm run test
```

## Code style
Check lint issues.
```
npm run lint
```

Auto-fix lint issues.
```
npm run lint:fix
```

## Build
Running the `build` task will output into `/dist` multiple module formats (CJS & ESM by default, and also UMD if you want) plus development and production builds.
```
npm run build
```

## CodeSandbox Examples
CodeSandbox examples are stored inside `examples` folder.
To create new example (highly welcomed), just duplicate the `examples/basic` into another folder name and start working on it.
To test the `examples/basic` right on local devices.
```
cd examples/basic
npm i
npx parcel serve index.html
```
Check example code at http://localhost:1234

## Bundle analysis
Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

## Semantic Versioning
React-Flowstate follows [Semantic Versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in our versioning policy.

Every significant change is documented in the changelog file.
