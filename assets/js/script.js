const { createApp, ref, computed, onMounted, onUnmounted  } = Vue;

const App = createApp({
  setup() {
    const version = ref(0);
    const width = ref(0);
    const lgScreen = 1024;

    version.value = 1;
    width.value = document.documentElement.clientWidth;

    const isMobile = computed(() => {
      let mobile = false;
      if(width.value < lgScreen) {
        mobile = true;
      }
      return mobile;
    });

    function getDimensions() {
      width.value = document.documentElement.clientWidth;
    }

    onMounted(() => {
      window.addEventListener('resize', getDimensions);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', getDimensions);
    });

    return {
      version,
      width,
      getDimensions,
      isMobile
    }
  }
});

App.mount('#app')