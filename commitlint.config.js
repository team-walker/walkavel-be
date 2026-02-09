module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'],
    'body-max-line-length': [0],
    'header-max-length': [2, 'always', 150],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'revert',
        'build',
        'perf',
        'ci',
      ],
    ],
  },
};
