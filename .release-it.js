module.exports = {
  git: {
    commitMessage: 'Release: v${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
};
