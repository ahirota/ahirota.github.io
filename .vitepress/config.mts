import Tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Alex Hirota",
  description: "Portfolio Site",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png" }],
    ['link', { rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png" }],
    ['link', { rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png" }],
    ['link', { rel:"manifest", href:"/site.webmanifest" }],
  ],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon-32x32.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Portfolio',
        items: [
          { text: 'Overview', link: '/portfolio' },
          { text: 'Williams-Sonoma, Inc.', link: '/portfolio#wsi' },
          { text: 'Preapp, Co. Ltd.', link: '/portfolio#preapp' },
          { text: 'Personal Projects', link: '/portfolio#personal' },
        ]
      }
    ],

    // Only for Portfolio Project Differentiation
    sidebar: [
      {
        text: 'Williams-Sonoma, Inc.',
        items: [
          { text: 'Overview', link: '/portfolio#wsi' },
          { text: 'PB Teen', link: '/portfolio/wsi/pbt' },
          { text: 'Dormify', link: '/portfolio/wsi/dormify' },
        ]
      },
      {
        text: 'Preapp Co., Ltd.',
        items: [
          { text: 'Overview', link: '/portfolio#preapp' },
          { text: 'Preapp Virtual Office', link: '/portfolio/preapp/preappvo' },
          { text: 'Suitescript', link: '/portfolio/preapp/suitescript' },
          { text: 'Tangleteezer Japan', link: '/portfolio/preapp/tangleteezer' },
          { text: 'EC Supplement', link: '/portfolio/preapp/ecsupli' },
          { text: 'Data Diver', link: '/portfolio/preapp/datadiver' },
          { text: 'Linkbox', link: '/portfolio/preapp/zsync' },
        ]
      },
      {
        text: 'Personal Projects',
        items: [
          { text: 'Overview', link: '/portfolio#personal' },
        ]
      },
      {
        text: 'Quick Links',
        items: [
          { text: 'LinkedIn', link: 'https://www.linkedin.com/in/alex-hirota/' },
          { text: 'Github', link: 'https://github.com/ahirota' },
          { text: 'Resume', link: '/resume.pdf', target: "_blank" },
        ]
      },
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alex-hirota' },
      { icon: 'github', link: 'https://github.com/ahirota' }
    ],

    footer: {
      message: '"I urge you to please notice when you are happy, and exclaim or murmur or think at some point, \'If this isn\'t nice, I don\'t know what is\'" - Kurt Vonnegut',
      copyright: 'Copyright © 2026-present Alex Hirota'
    }
  },
  vite: {
    plugins: [
      Tailwind()
    ]
  }
})
