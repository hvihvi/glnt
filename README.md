# gint

A Linter for Git

# Usage

CLI :

```sh
gint
```

Checks the quality of your git history.
Outputs warning or error messages to the console if any rules applied to your git history are broken.

It can be used to enforce clean git history rules in a team/project and facilitate code reviews...

Implemented rules can be configured via a `.gintrc.json` file placed at the root of the project repository.

Config Example:

```json
{
  "origin": "origin/master",
  "shouldHaveFormattedMessage": {
    "enabled": true,
    "level": "ERROR"
  }
}
```

When ran with this config, `gint` will output a "shouldHaveFormattedMessage" error if any commit messages reachable from `HEAD` and not in `origin/master` is not formatted.

# Rules available

## Should have properly formatted commit message

Default config :

```json
{
  "shouldHaveFormattedMessage": {
    "enabled": true,
    "level": "ERROR",
    "charactersPerLine": 72
  }
}
```

For each commits between `HEAD` and `origin` :

- Checks if the commit message has the right format:

  - Line separator between header and body

  - Character length per line of header and/or body

- TODO: Checks if the commit message does not contain tags (for example a commit message should not contain "WIP")

- TODO: Checks if the commit message contains tags (for example should contain related jira issue "#JIRA-123")

- TODO: Add more rules based on good practices such as those listed in (https://chris.beams.io/posts/git-commit/) (https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing)

## Should have tests

Default Config :

```json
{
  "shouldHaveTests": {
    "enabled": true,
    "level": "INFO",
    "subject": "**/*.js",
    "test": "**/*.test.js",
    "untestedTag": "#untested"
  }
}
```

For each commits between `HEAD` and `origin` :

- Checks if the diff in a commit has code modifications. If so, it should also have test modifications, or a justification for not having tests in the commit message.

You can define the code files and test files in the `.gintrc` file with `shouldHaveTests.subject` and `shouldHaveTests.test` keys.

By default, it ensures that any code modification to a `**/*.js` file also has a modification to a `**/*.test.js` file.

If the commit message contains `#untested` (configurable tag), this rule doesn't apply.
The idea here is that if a part of the code is purposely untested, the commit message should try to provide an explanation.

- TODO make the code filename match test filename

## Should not contain TODO in commit patch

Default config :

```json
{
  "shouldHaveNoKeywordsInDiffs": {
    "enabled": false,
    "level": "INFO",
    "keywords": ["TODO"]
  }
}
```

For each commits between `HEAD` and `origin` :

- checks if the content of a commit contains "TODO" (configurable)

## [TODO] Should merge with remote branches

- Checks if the current HEAD merges with origin (default: "origin/master")
- Checks if the current HEAD merges with all remote branches matching a pattern
  (Probably something like `git merge --no-commit --no-ff ${origin}; git merge --abort; echo "Merge aborted";`)

## [TODO] Should not contain merge commits

For each commits between `HEAD` and `origin` :

- checks if any commit is a merge commits (2 parents)

# Dev

After cloning the repository, you will need [nodejs](https://nodejs.org/en/download/package-manager) installed.

You can download dependencies via yarn: `yarn install`.

This project uses [Typescript](https://www.typescriptlang.org/docs). Install via `yarn global add tslint typescript`.

The CLI can be executed via
```sh
./bin/gint.js
```
`yarn build` compiles TS to JS

`yarn build:watch` compiles TS to JS in watch mode

`yarn lint` Runs tslint

`yarn lint:watch` runs tslint in watch mode

`yarn test` runs jest in watch mode

`yarn prettier` Formats code
