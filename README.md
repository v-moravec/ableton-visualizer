# Jagu Nuxt Template

## TODO (For this repository) 🚧👷🏻‍♂️🚧
- [x] Remove tailwindcss@3.1.8 dependency when WebStorm 2022.3 comes out.
- [x] Update Nuxt 3 to full version once it comes out.

[//]: # (- [ ] To do task)
[//]: # (- [x] <s>Done task</s>)

## TODO List ✅
- [ ] Turn on ESLint in your IDE
- [ ] Update font you want to use in `nuxt.config.ts` and `assets/css/style.css`
      (if you want, you can set them up also in `tailwind.config.js`)
- [ ] Replace favicons in `public` folder (probably best to delete whole content and
      paste generated assets from [Favicon generator](https://realfavicongenerator.net/))
- [ ] Remove unwanted assets and components

## Setup 🛠

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server 👨🏻‍💻

Start the development server on http://localhost:3000

```bash
yarn dev
```

There is a bug in Node v18 which writes out warning after running this command:

```bash
(node:45272) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
```

## Help 🛟

If anything is unclear - look at the [Nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

