const mymixins={
    created(){
      var navbar=document.querySelector('.navbar')
      navbar.style.visibility='hidden'
    },
    destroyed(){
      var navbar=document.querySelector('.navbar')
      navbar.style.visibility='visible'
    }
}


export default mymixins