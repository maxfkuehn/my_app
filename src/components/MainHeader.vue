<template>
    <header>
       <div>
           <h1>Max Boardgame App</h1>
           <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/user">User</router-link> | 
            <router-link to="/boardgames">Boardgames</router-link>
            </div>
       </div>

    </header>

</template>

<script>
    export default{
        name: 'MainHeader',
    }
</script>


<style scoped>
header {
    background-color: coral;
    height: 120px;
    padding: 16px;
    display: -ms-inline-grid;
    align-items: flex-end ;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    }
</style>