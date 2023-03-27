export default defineNuxtPlugin(() => {
  const loadingClass = 'page-loading'
  return {
    provide: {
      showLoading:(loading) => {
        if(process.client) {
          if(!document && document.body) return null
          const hasLoadingClass = document.body.classList.contains(loadingClass)
          if(!loading && hasLoadingClass) {
            document.body.classList.remove(loadingClass)
          } else if(loading  && !hasLoadingClass) {
            document.body.classList.add(loadingClass)
          }
        }
      }
    }
  }
})