<script setup>
import whatsappLogoUrl from './assets/images/vecteezy_whatsapp-logo-png-whatsapp-icon-png-whatsapp-transparent_18930634.png'

const whatsappPhone = '51991686073'
const whatsappHref = `https://wa.me/${whatsappPhone}`
</script>

<template>
    <a class="whatsappFloat" :href="whatsappHref" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        title="WhatsApp">
        <img class="whatsappFloatImg" :src="whatsappLogoUrl" alt="" aria-hidden="true" />
    </a>
</template>

<style scoped>
.whatsappFloat {
    position: fixed;
    right: 32px;
    bottom: 32px;
    width: 74px;
    height: 74px;
    border-radius: 30px;
    overflow: hidden;
    display: grid;
    place-items: center;
    z-index: 9999;
    text-decoration: none;
    transition: transform 150ms ease;
    transform-origin: center;
}

.whatsappFloat:hover,
.whatsappFloat:focus-visible {
    transform: scale(1.08);
}

.whatsappFloatImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
</style>
