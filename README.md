# glnt

A Linter for Git

# Installation

```
npm install -g glnt
```

or with yarn :

```
yarn global add glnt
```

# Usage

CLI :

```sh
glnt
```

![](log_example.png)

Checks the quality of your git history.
Outputs warning or error messages to the console if any rules applied to your git history are broken.

It can be used to enforce clean git history rules in a team/project, facilitate code reviews...

Implemented rules can be configured via a `.glntrc.json` file placed at the root of the project repository.

Config Example:

```json
{
  "origin": "origin/master",
  "shouldHaveTests": {
    "level": "INFO",
    "subject": "**/*.js",
    "test": "**/*.test.js"
  }
}
```

When ran with this config, `glnt` will output a "shouldHaveTests" info if any commit reachable from `HEAD` and not in `origin/master` contains modification of code files without modification to a test file.

All rules can be set to "DISABLED", "INFO" or "ERROR".

- `level: DISABLED`: the rule won't run at all
- `level: "INFO"`: the rule will display an informative message, but the script won't exit in an error
- `level: "ERROR"`: the rule will display an error message, and the script will exit with an error code (not 0, TODO implement exit code)

# Rules available

- [Should have properly formatted commit message](#should-have-properly-formatted-commit-message)
- [Should have tests](#should-have-tests)
- [Should not contain keywords in commit patch](#should-not-contain-keywords-in-commit-patch)
- [Should match patterns in commit message](#should-match-patterns-in-commit-message)
- [Should merge with other branches](#should-merge-with-other-branches)
- [Should not contain merge commits](#should-not-contain-merge-commits)
- [Should not be used by others](#should-not-be-used-by-others)
- [Should not diverge too much from origin](#should-not-diverge-too-much-from-origin)
- [Should only contain renames in rename commits](#should-only-contain-renames-in-rename-commits)

## Should have properly formatted commit message

Default config :

```json
  shouldHaveNCharPerLine: {
    "level": "INFO",
    "charactersPerLine": 72
  },
  shouldHaveSeparatorLine: {
    "level": "INFO"
  },
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
    "level": "INFO",
    "subject": "**/*.js",
    "test": "**/*.test.js",
    "skipTags": [
      "#untested",
      "#refacto",
      "#refactoring",
      "#iso",
      "#trivial",
      "#notest"
    ]
  }
}
```

For each commits between `HEAD` and `origin` :

- Checks if the diff in a commit has code modifications. If so, it should also have test modifications, or a justification for not having tests in the commit message.

You can define the code files and test files in the `.glntrc` file with `shouldHaveTests.subject` and `shouldHaveTests.test` keys.

By default, it ensures that any code modification to a `**/*.js` file also has a modification to a `**/*.test.js` file.

If the commit message contains any tag in `skipTags`, this rule doesn't apply.
The idea here is that if a code modification comes with no test modification, the commit message should try to provide an explanation.

- TODO make the code filename match test filename

- TODO add #refacto #iso #trivial for typical cases of diffs allowed without tests
- TODO add tags in actual files to prevent this check, so that you don't need to mention it in every commit

## Should not contain keywords in commit patch

Example config :

```json
{
  "shouldHaveNoKeywordsInDiffs": {
    "level": "INFO",
    "keywords": ["TODO"]
  }
}
```

For each commits between `HEAD` and `origin` :

- checks if the content of a commit contains "TODO" (configurable)

For example you might want to avoid using, or be informed when using `null`, `TODO`, `console.log` (if you don't have a linter that already cover such rules)...

## Should match patterns in commit message

Example config :

```json
{
  "shouldHavePatternsInMessage": {
    "level": "INFO",
    "patterns": ["*#JIRA-*", "*#BUG-*"]
  }
}
```

For each commits between `HEAD` and `origin` :

- check if any of the patterns listed match the commit message. See [minimatch](https://www.npmjs.com/package/minimatch) for more info on pattern matching.

For example, you could require that each commit relate to a Jira issue key.

## Should merge with other branches

Default configuration :

```json
  "shouldMergeWithOtherBranches": {
    "level": "INFO",
    "pattern": "origin/*"
  }
```

- Checks if the current HEAD merges with other remote branches matching then given pattern

Check `git branch --remotes` for the pattern syntax. (https://git-scm.com/docs/git-branch)

This feedback allows you to detect conflicts early, you should try to solve them before piling more commits.

The default value merge-checks all remote branches via `"pattern": "origin/*"`.

You could use `"pattern": "origin/master"` for example to only merge-check agains master.

You can also use branche naming patterns like `"pattern": "origin/candidate/*"` to only merge-check against branches following the naming pattern `candidate/*`.

## Should not contain merge commits

TODO: Not implemented

For each commits between `HEAD` and `origin` :

- checks if any commit is a merge commits (2 parents)

## Should not be used by others

TODO: Not implemented

- checks if any other remote branches use any commits between `HEAD` and `origin`

For example you can set this to "INFO" level, it allows you to check if using rebase on your branche is dangerous or not.

## Should not diverge too much from origin

TODO: Not implemented

- checks if your branch is too far from origin and should be merged soon instead of diverging even further (max commit count?)

## Should only contain renames in rename commits

TODO: Not implemented

- checks if all diff modification only contain a rename if the commit message contain a rename keyword (default:`keyword: #rename`)

This rules facilitate review of large rename commits, ensuring nothing else beside the rename has been modified

# Dev

After cloning the repository, you will need [nodejs](https://nodejs.org/en/download/package-manager) installed.

You can download dependencies via yarn: `yarn install`.

This project uses [Typescript](https://www.typescriptlang.org/docs). Install via `yarn global add tslint typescript`.

The CLI can be executed via

```sh
./bin/glnt.js
```

`yarn build` compiles TS to JS

`yarn build:watch` compiles TS to JS in watch mode

`yarn lint` Runs tslint

`yarn lint:watch` runs tslint in watch mode

`yarn test` runs jest in watch mode

`yarn prettier` Formats code
