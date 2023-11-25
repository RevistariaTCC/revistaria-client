/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bancadaboca1' : "url('../../public/images/bancadaboca.jpg')" ,
        'bancadaboca2' : "url('../../public/images/bancadaboca2.jpg')"
      },
     },
    screens:{
      'cell': '350px',
      // => @media (min-width: 475px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '772px',
      // => @media (min-width: 772px) { ... }

      'xm': '850px',
      // => @media (min-width: 850px) { ... }

      'lg': '1075px',
      // => @media (min-width: 1075px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
  corePlugins: {
    preflight: false,
  }
}
