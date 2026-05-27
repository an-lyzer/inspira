<script setup>
import whatsappLogoUrl from '../assets/images/vecteezy_whatsapp.png'

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
    width: 84px;
    height: 84px;

    border-radius: 999px;
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
    width: 120%;
    height: 120%;
    object-fit: cover;
    object-position: 75% 75%;
    transform: translateY(-6%);
    border-radius: 999px;
    display: block;
}

@media (max-width: 820px) {
    .whatsappFloat {
        right: 16px;
    }
}

@media (max-width: 420px) {
    .whatsappFloat {
        right: 8px;
    }
}
</style>
