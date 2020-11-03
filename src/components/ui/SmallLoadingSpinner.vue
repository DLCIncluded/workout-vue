<template>
    <div class="cont">
        <div class="loader"></div>
        <div class="auth is-size-7"><slot></slot></div>
    </div>
</template>

<style lang="scss" scoped>  
    .cont {
        margin-right:30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>