# gint

A Linter for Git

# Usage

```sh
gint
```

# Features

## Should have tests

Checks if the diff has code modifications. If so, it should also have test modifications

You can override the code files and test files in the .gintrc file (`//TODO`, currently hardcoded in src/config/config.js)

For example a javascript project would use the following config :

```json
{
  "shouldHaveTests": {
    "subject": "**/*.js",
    "test": "**/*.test.js"
  }
}
```

It ensures that any code modification to a `**/*.js` file also has a modification to a `**/*.test.js` file.

`//TODO Feature : Make the code filename match the test filename?`

`//TODO Feature : check every commits between origin/master (configurable) and current HEAD`

## [TODO] Should have properly formatter commit message

Checks if the commit message has the right format:

- Line separator between header and body
- Character lenght per line of header and/or body

Checks if the commit message contains tags (for example "should contain related jira issue #JIRA-123")

## [TODO] Should merge with all remote branches

Checks if the current HEAD merges with all remote branches matching a pattern

# Dev

The CLI can be executed via

```sh
./bin/gint.js
```

`yarn build` runs babel. This projects uses Babel to transpile ES6 language features to nodejs.

`yarn watch` runs yarn build in watch mode

`yarn test` runs test in watch mode
