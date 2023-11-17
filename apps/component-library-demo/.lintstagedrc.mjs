export default {
  '**/*.{ts,vue}': ['prettier --write', 'eslint --cache --fix'],
  '**/*.{js,mjs,css,json,md}': 'prettier --write',
};
