<template>
  <div
    class="absolute top-0 left-0 right-0 w-full h-full z-0 scale-100 transition-all"
  >
    <svg
      viewBox="0 0 100 100"
      height="100%"
      width="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      class="page__gradient-svg"
    >
      <rect
        x="0"
        y="0"
        height="100%"
        width="100%"
        fill="url(#9)"
      />
      <linearGradient
        id="9"
        x1="0"
        y1="0"
        x2="0"
        y2="100%"
        gradientUnits="userSpaceOnUse"
        data-v-5757e3cc=""
      >
        <stop
          class="transition-all duration-4000"
          offset="0"
          :stop-color="current[0]"
          data-v-5757e3cc=""
        />
        <stop
          class="transition-all duration-4000"
          offset="0.3333333333333333"
          :stop-color="current[1]"
          data-v-5757e3cc=""
        />
        <stop
          class="transition-all duration-4000"
          offset="0.6666666666666666"
          :stop-color="current[2]"
          data-v-5757e3cc=""
        />
        <stop
          class="transition-all duration-4000"
          offset="1"
          :stop-color="current[3]"
          data-v-5757e3cc=""
        />
      </linearGradient>
    </svg>
  </div>
</template>

<script setup>
const palette = [
  ["#ffcab4", "#d2baa7", "#94a394", "#5f9084"],
  ["#5f9084", "#94a394", "#d2baa7", "#ffcab4"],
  ["#63B3CB", "#C5D3AC", "#DECD95", "#F6C47A"],
  ["#F6C47A", "#DECD95", "#C5D3AC", "#63B3CB"],
]

let current = ref(palette[0])

let i = 0
setInterval(() => {
  current.value = palette[i]

  if (i === palette.length - 1) {
    i = 0
  } else {
    i += 1
  }
}, 5000)
</script>
