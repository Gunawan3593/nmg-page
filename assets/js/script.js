const { createApp, ref, computed, onMounted, onUnmounted, reactive } = Vue;

const App = createApp({
  setup() {
    const version = ref(0);
    const data = reactive({
      region: '',
      resellers: []
    });

    const width = ref(0);
    const lgScreen = 1024;
    let resellers = ref([]);
    let regions = ref([]);

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

    function selectRegion() {
      data.resellers = resellers.value.filter(item => item.region === data.region);
    }

    async function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
    }

    readTextFile("assets/json/reseller.json", function(text){
      var data = JSON.parse(text); //parse JSON
      resellers.value =  data;
    });

    readTextFile("assets/json/region.json", function(text){
      var data = JSON.parse(text); //parse JSON
      regions.value =  data;
    });
 
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
      selectRegion,
      readTextFile,
      isMobile,
      resellers,
      regions,
      data
    }
  }
});
App.mount('#app')