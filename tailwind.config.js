module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#a3e635',
          secondary: '#529c74',
          accent: '#529C76',
          neutral: '#8dbba1',
          'base-100': '#1f2937',
          info: '#a3e635',
          success: '#2B6444',
          warning: '#10b981',
          error: '#dc2626',
        },
      },
    ],
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
};
