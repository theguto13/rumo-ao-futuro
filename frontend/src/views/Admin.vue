<template>
    <div id="Admin">
        <Welcome />
        <router-view />
    </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue';

export default{
    name: 'Admin',
    data() {
        return {};
    },
    components: { Welcome }
}
</script>

<style scoped>
    #Admin{
        margin: 15px 4%;
    }
</style>