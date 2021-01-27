[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)


# Simple flexbox based grid


[DEMO](https://tamtamlg.github.io/simple-grid/dist/)


## Variables (`./src/scss/_variables.scss`)

```scss
// number of columns
$col-count: 12 !default;

// horizontal gutters
$grid-gutter: 30px !default;

// containers
$container-xl: 1170px !default;
$container-lg: 960px !default;
$container-md: 720px !default;
$container-sm: 540px !default;

// breakpoints
$xs: 0 !default;
$sm: 576px !default;
$md: 768px !default;
$lg: 992px !default;
$xl: 1200px !default;
```

## How to use

### 1 Add link to <head>
```html
<link rel="stylesheet" href="./dist/css/grid.min.css">
```

### 2 Or include files from `/src/scss/` to your project


### 3 Have fun with simple grid

```html
<div class="container">
  <div class="row">
    <div class="col-xl-4">.col-xl-4</div>
    <div class="col-xl-8">.col-xl-8</div>
  </div>
</div>
```

## Build

```bash
npm run build
```

## Development

```bash
npm run dev
```