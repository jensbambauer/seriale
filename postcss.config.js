export default {
  plugins: {
    "postcss-import": {},
    "postcss-custom-media": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "nesting-rules": false,
        "custom-media-queries": true,
        "custom-selectors": true,
      },
    },
    cssnano: {
      preset: ["default", { discardComments: { removeAll: true } }],
    },
  },
};
