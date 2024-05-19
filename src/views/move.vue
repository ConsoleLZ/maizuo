<template>
    <div>
        <movebar></movebar>
        <router-view></router-view>
    </div>
</template>

<script>
import movebar from '@/components/movebar.vue'
export default {
    components: {
      movebar
   }    
}
</script>

