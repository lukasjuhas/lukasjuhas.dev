<template>
    <div>
        <h3>Despatches</h3>
    </div>
</template>

<script>
  export default {
    name: 'despatches',
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // possible injection of the stylesheet??
        console.log(vm);
      })
    },
  };
</script>
