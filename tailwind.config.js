import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // Include Skeleton UI package content
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    skeleton({
      themes: {
        custom: [
          {
            name: 'ether-theme',
            properties: {
              // Custom theme properties for The Ether
              '--theme-font-family-base': 'Inter, system-ui, sans-serif',
              '--theme-rounded-base': '0.5rem',
              '--theme-rounded-container': '0.75rem',
              '--theme-color-primary-50': 'rgb(240 249 255)',
              '--theme-color-primary-100': 'rgb(224 242 254)',
              '--theme-color-primary-200': 'rgb(186 230 253)',
              '--theme-color-primary-300': 'rgb(125 211 252)',
              '--theme-color-primary-400': 'rgb(56 189 248)',
              '--theme-color-primary-500': 'rgb(14 165 233)',
              '--theme-color-primary-600': 'rgb(2 132 199)',
              '--theme-color-primary-700': 'rgb(3 105 161)',
              '--theme-color-primary-800': 'rgb(7 89 133)',
              '--theme-color-primary-900': 'rgb(12 74 110)'
            }
          }
        ]
      }
    })
  ]
}; 