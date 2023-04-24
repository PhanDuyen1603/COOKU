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

## i18n
all static text should define in locale file
## using modal
- custom in plugins/modal.js
```javascript
const { $modal } = useNuxtApp()
$modal.show({
  component: 'name of component that render',
  wrapper: 'name of wrapper component',
  props: {}, // component props
  wrapperProps: {} // wrapper props
})
```

## using loading page
```javascript
const { $showLoading } = useNuxtApp()
$showLoading(true)
// some asynchronous function
$showLoading(false)
```

## using toast
- toast types: ``success``, ``show``, ``error``, ``warning``
- default type: ``show``

```javascript
const { $toast } = useNuxtApp()
$toast.show({
  message: 'toast test',
  type: 'success'
})
```

## img src svg fill color
using filter class in ``svg-filter.scss``
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
- ~~toast improve~~
- build pinia first
- swriper: fix first element
- ~~handle loading global~~
- loading component
- lazy component
- skeleton
- dayjs locale vn
- favicon missing some page
- route param ``error`` return to error page
- error page
- modal disable scroll when open
- fetch data hook -> loadmore
- component loading on visble
- lazyloading image -> loading on visible

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
- confirm message dialog improve UI
