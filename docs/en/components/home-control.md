# Home Control (OlStyledHomeControl)

`OlStyledHomeControl` is a "Go Home" button for OpenLayers maps. Clicking it resets the map view to the initial or a specified extent.

## Features
- Records the map's initial extent after the first render; clicking the button returns to this extent.
- Supports custom `extent` prop to define the target extent.
- Customizable button icon and tooltip text.
- Adapts to multiple visual themes.

## Props
| Name      | Type        | Default    | Description                                  |
|-----------|-------------|------------|----------------------------------------------|
| extent    | [number, number, number, number] \| undefined | -          | The extent to return to (OpenLayers extent format). If not set, uses the initial extent |
| duration| number      | 800 | Animation options for map fit            |

## Events (Emits)
| Event     | Description                                  |
|-----------|----------------------------------------------|
| click     | Triggered when the button is clicked          |
| go-home   | Triggered when the map view returns home      |

## Methods (Expose)
| Method    | Description                                  |
|-----------|----------------------------------------------|
| goHome    | Manually trigger the go home action           |

## Usage Example

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-home-control :extent="[0,0,100,100]" />
  </ol-styled-control-bar>
</template>
```

## Slot

You can customize the control icon via the default slot:

```vue
<ol-styled-home-control>
  <template #default>
    <i class="custom-home-icon"></i>
  </template>
</ol-styled-home-control>
```

## Notes
- The control automatically records the initial extent after the map's first render.
- If the map is not initialized with a view/extent, the control will calculate the current extent on first click.
- Make sure the control is used as a child of the map or can properly inject the map instance.

## Internationalization (i18n)
- The default button text uses the `home.title` i18n key, which can be customized in `src/i18n/locales/en.ts` and `zh-CN.ts`.
