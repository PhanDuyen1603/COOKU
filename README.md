# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## using modal

## using loading page
```javascript
const { $showLoading } = useNuxtApp()
$showLoading(true)
// some asynchronous function
$showLoading(false)
```

## warning

### vee-validate
- ``setValues`` ``setFieldValue`` can only set with String

## todo

### improve UI/UX

#### common
- middleware
- custom directive
- seperate logic and UI
- replace hardcode content
- toast improve
- build pinia first
- swriper: fix first element
- handle loading
- dayjs local vn
- route param ``error`` return to error page
- error page
- modal disable scroll when open
- fetch data hook -> loadmore

#### recipe
- handle like
- follow user
- related posts

#### create recipe:
- unit search dropdown
- create tags
- update recipe

#### update recipe
- vee-validate set image
- middleware

#### search
- debounce search input

#### medium piority
- remove image upload
- create nuxt server for upload image
- auto compile scss file
- img src svg to svg ``https://github.com/iconfu/svg-inject``
- animation
