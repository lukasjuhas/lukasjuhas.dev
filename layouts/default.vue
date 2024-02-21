<template>
  <div class="min-h-screen h-full relative">
    <PageGradient />
    <AppHeader />

    <div class="relative z-10 min-h-screen flex items-center p-4 pt-14">
      <slot />
    </div>

    <AppFooter />
  </div>
</template>
