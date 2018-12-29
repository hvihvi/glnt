# gint

A Linter for Git

# Usage

CLI :

```sh
gint
```

Outputs warning or error messages to the console if any rules are broken.

# Features

## Should have properly formatted commit message

- Checks if the commit message has the right format:

  - Line separator between header and body

  - Character lenght per line of header and/or body

- Checks if the commit message does not contain tags (for example should not contain "WIP")

- TODO: Checks if the commit message contains tags (for example should contain related jira issue "#JIRA-123")

- TODO: Add more rules based on good practices such as those listed in (https://chris.beams.io/posts/git-commit/) (https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing)

## Should have tests

- Checks if the diff in a commit has code modifications. If so, it should also have test modifications, or a justification for not having tests in the commit message.

You can define the code files and test files in the `.gintrc` file (`//TODO`, currently hardcoded in src/config/config.js)

This is the default config :

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

It ensures that any code modification to a `**/*.js` file also has a modification to a `**/*.test.js` file.

- Checks if the commit message contains #untested (configurable tag), that way if a part of the code is untested, the commit message should try to provide an explanation.

- TODO make the code filename match test filename

## Should not contain TODO in commit patch

- checks if the content of a commit contains "TODO" (configurable)

## [TODO] Should merge with remote branches

- Checks if the current HEAD merges with origin (default: "origin/master")
- Checks if the current HEAD merges with all remote branches matching a pattern
  (Probably something like `git merge --no-commit --no-ff ${origin}; git merge --abort; echo "Merge aborted";`)

## [TODO] Should not contain merge commits

- checks if any commit reachable from HEAD and not in `origin` are merge commits (2 parents)

# Dev

After cloning the repository, you will need [nodejs](https://nodejs.org/en/download/package-manager) installed.
You can download dependencies via yarn: `yarn install`

The CLI can be executed via

```sh
./bin/gint.js
```

`yarn lint` Runs eslint

`yarn lint:watch` runs eslint in watch mode

`yarn test` runs jest in watch mode

`yarn prettier` Formats code
