# How to Contribute

## Prerequisites
You have Node installed at LTS.

You are familiar with Git.

Development Workflow

## Development
Clone codebase and install dependencies.
```
npm install
```

### Developing with live code update
Start build process in watch mode.
```
npm start
```
This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Open another terminal window and run the test app.
```
npm run app
```
The default test app imports and live reloads whatever is in `/dist`.

Check the test app on http://localhost:1234

### Test
```
npm run test
```

### Code Lint
Ensure your code is clean and there are no warnings or errors.

To check lint issues.
```
npm run lint
```

To fix lint issues.
```
npm run lint:fix
```
There are some issues that can't be auto-fixed that you need to resolve manually.

## Build
Running the `build` task will output into `/dist` multiple module formats (CJS & ESM by default, and also UMD if you want) plus development and production builds.
```
npm run build
```

## Bundle analysis
Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

## Semantic Versioning
React-Flowstate follows [Semantic Versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in our versioning policy.

Every significant change is documented in the changelog file.
