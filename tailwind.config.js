const colors = {
  'primary': '#9D2418',
  'secondary': '#DB3520',
  'accent': '#FE8C43',
  'dark': '#070707',
  'inactive': '#ACACAC',
  'positive': '#21BA45',
  'negative': '#C10015',
  'info': '#31CCEC',
  'warning': '#F2C037',

  'card-title-border': '#00000019',
};

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: colors,
  },
};
