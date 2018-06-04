export default {
  created() {
    if (this.fetchData) {
      // this.$bus.on('fetchData', this.fetchData);
      this.fetchData();
    }
  },
  // beforeRouteLeave: (to, from, next) => {
  //   // ?
  //   if (this.fetchData) {
  //     this.$bus.off('fetchData', this.fetchData);
  //   }
  //   next();
  // },
};