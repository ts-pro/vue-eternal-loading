module.exports = {
  git: {
    commitMessage: 'Release: v${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: true,
    skipChecks: true,
  },
  github: {
    release: true,
  },
};
