import { postTypes } from './app'

export const colorVariables = {
  MAIN: '--clr-red-primary',
  RED: '--clr-red-primary',
  ORANGE: '--clr-orange-primary',
  VIOLET: '--clr-violet-primary',
  GREEN: '--clr-green-primary',
}

export const listTypeColors = {
  [postTypes.DIET]: colorVariables.RED,
  [postTypes.POST]: colorVariables.GREEN,
  [postTypes.RECIPE]: colorVariables.ORANGE,
  [postTypes.TIP]: colorVariables.VIOLET,
}

export const listViews = {
  GRID: 'grid',
  SLIDE: 'slide',
  MASONRY: 'masonry'
}
