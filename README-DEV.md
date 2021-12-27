# Development Notes

### How to publish a new version to npm registry

#### Syntax

npm run bump:\<newversion> --message=\<commitmessage>

##### Options

###### newversion:

major | minor | patch | premajor | preminor | prepatch | prerelease

###### commitmessage:

A string that will become the commit message (if unclean, the repository will be committed before published on npm)

##### Examples

###### major:

A version that introduces breaking changes.

```bash
npm run bump:major --message="Now with a thousand dancing elephants! In a china shop!"
```

###### minor:

A version that adds new features.

```bash
npm run bump:minor --message="Warning messages are now also available in Kiswahili!"
```

###### patch:

A version that fixes a bug.

```bash
npm run bump:patch --message="Fixed that thing with the error. Like... you know. That error."
```

#### See also

[npm-version](https://docs.npmjs.com/cli/version)
[npm-publish](https://docs.npmjs.com/cli/publish)
[Updating your published package version number](https://docs.npmjs.com/updating-your-published-package-version-number)

Cheers,
Nicolas
