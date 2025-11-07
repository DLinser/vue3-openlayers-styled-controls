<template>
  <div>
    <ol-tile-layer>
      <ol-source-tianditu
        layerType="vec"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>

    <ol-tile-layer>
      <ol-source-tianditu
        :isLabel="true"
        layerType="vec"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
