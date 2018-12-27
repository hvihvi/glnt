# gint

A Linter for Git

# Usage

CLI :

```sh
gint
```

Outputs warning or error messages to the console if any rules are broken.

# Features

## Should have properly formatter commit message

Checks if the commit message has the right format:

- Line separator between header and body
- Character lenght per line of header and/or body

Checks if the commit message contains tags (for example should contain related jira issue "#JIRA-123")  

Checks if the commit message does not contain tags (for example should not contain "WIP")

`//TODO: ` Add more rules based on good practices such as those listed in (https://chris.beams.io/posts/git-commit/) (https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing)

## Should have tests

Checks if the diff in a commit has code modifications. If so, it should also have test modifications, or a justification for not having tests in the commit message.

You can define the code files and test files in the .gintrc file (`//TODO`, currently hardcoded in src/config/config.js)

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

`//TODO Feature : disable flag à rajouter dans le message de commit pour disable une rule (exemple de config : {shouldHaveTests: {disableMessage: "#NOTEST"})`

## [TODO] Should merge with remote branches

- Checks if the current HEAD merges with origin (default: "origin/master")
- Checks if the current HEAD merges with all remote branches matching a pattern
`TODO: something like git merge --no-commit --no-ff ${origin}; git merge --abort; echo "Merge aborted";`

# Dev

The CLI can be executed via

```sh
./bin/gint.js
```

`yarn build` runs babel. This projects uses Babel to transpile ES6 language features to nodejs.

`yarn watch` runs yarn build in watch mode

`yarn test` runs test in watch mode
