# Demo react app

See deployment preview at [https://spa-demo.helleye.net/](https://spa-demo.helleye.net/)

Deployed with [Vercel](https://vercel.com/)

Testing CI/CD with GitHub Actions, push-to-live time ~1min

Used `pnpm` for dependency management, but I'm providing `npm` lockfile as well. All `npm` commands will work with `pnpm`.

## Installation

- `npm install`
- `npm run dev`

## Testing

- `npm run test:unit`
- `npm run test:lint`
- `npm run test:typescript`

## Main dependencies

- `vite` - bundling and dev server
- `react`
- `typescript`
- `tanstack/react-query` + `axios` - data fetching
- `tanstack/react-router` - routing and search params
- `lucide-react` - icons
- `tailwindcss` - styling
- `shadcn-ui` - ui components (build on top of `radix-ui`, `tailwindcss` and `class-variance-authority`)
- `vitest`, `react-testing-library` - testing
- `zod` - validation of url search params

## Additional info

Just a few notes about picked libraries. I'm very interested in modern practices and libraries that have good developer experience, but I'm also familiar with other ones, and learn fast while working.

> I've used shadcn-ui and tailwind for styling because of small bundle size. Although this is my preferred library, I'm also very familiar with [Chakra UI](https://chakra-ui.com/), styled-components and plain css. I've never used MUI or Bootstrap, but from my understanding they're not much different from Chakra.

> I'd be happy to discuss why I didn't use redux. Short version is, I feel like redux is a bit archaic in terms of avaliable technologies, and even with the improvements that redux toolkit brought, it still needs some boilerplate code that doesn't serve much purpose. I much prefer using react-query for most state, and plain context or other small state manager (ex. [zustand](https://github.com/pmndrs/zustand])). I am still somewhat familiar with redux if it's a requirement.

> I've also used tanstack-router, mainly to see how it works in practice. I've been unhappy with react-router for some time, and following tanstack-router since early alpha versions, but I've never used most features outside of marveling at autocomleted link paths. This project was a nice opportunity to learn how to use search parameters instead of component state for filters. I can't say I'm good with it yet, but I've enjoyed the experience.
