<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import heroBgUrl from '../assets/images/executives-preparing-meeting.jpg'

const brandHeroRef = ref(null)
const brandHeroVisible = ref(false)

let brandHeroObserver

const scrollToContactoForm = () => {
    document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        brandHeroVisible.value = true
        return
    }

    brandHeroObserver = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (!entry?.isIntersecting) return
            if (entry.intersectionRatio < 0.2) return

            brandHeroVisible.value = true
            brandHeroObserver?.disconnect()
            brandHeroObserver = undefined
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -35% 0px'
        }
    )

    if (brandHeroRef.value) {
        brandHeroObserver.observe(brandHeroRef.value)
    }
})

onBeforeUnmount(() => {
    brandHeroObserver?.disconnect()
    brandHeroObserver = undefined
})
</script>

<template>
    <section ref="brandHeroRef" class="brandHero" :class="{ 'brandHero--visible': brandHeroVisible }"
        :style="{ '--brand-hero-image': `url(${heroBgUrl})` }" aria-label="Solicita una reunión">
        <div class="brandHeroInner">
            <h2 class="brandHeroTitle">Solicita una reunión</h2>
            <h6 class="brandHeroSubtitle">Y mejora tu rentabilidad con decisiones bien fundamentadas</h6>

            <button class="brandHeroButton" type="button" @click="scrollToContactoForm">Contáctanos</button>
        </div>
    </section>
</template>

<style scoped>
.brandHero {
    position: relative;
    height: 304px;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 0 24px;
    background-image:
        linear-gradient(0deg, rgba(9, 22, 41, 0.62) 0%, rgba(9, 22, 41, 0.62) 100%),
        var(--brand-hero-image);
    background-size: cover;
    background-position: center 85%;
    color: var(--color-blanco);
}

.brandHeroInner {
    width: min(980px, 100%);
}

.brandHeroTitle {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.2px;

    opacity: 0;
    transform: translateY(-18px);
    transition: opacity 620ms ease, transform 620ms ease;
}

.brandHeroSubtitle {
    margin: 14px 0 0;
    font-weight: 400;
    color: rgba(249, 249, 249, 0.92);

    opacity: 0;
    transform: translateY(-18px);
    transition: opacity 620ms ease, transform 620ms ease;
    transition-delay: 70ms;
}

.brandHero--visible .brandHeroTitle,
.brandHero--visible .brandHeroSubtitle {
    opacity: 1;
    transform: translateY(0);
}

.brandHeroButton {
    margin-top: 28px;
    border: none;
    background: var(--color-blanco);
    color: var(--color-azul);
    font-family: var(--font-header);
    font-size: 1.25rem;
    font-weight: 600;
    padding: 14px 46px;
    border-radius: 12px;
    cursor: pointer;

    --brand-btn-y: 18px;
    --brand-btn-scale: 1;
    opacity: 0;
    transform: translateY(var(--brand-btn-y)) scale(var(--brand-btn-scale));
    transition: opacity 620ms ease, transform 620ms ease, filter 180ms ease;
    transition-delay: 140ms;
}

.brandHero--visible .brandHeroButton {
    opacity: 1;
    --brand-btn-y: 0px;
}

.brandHeroButton:hover,
.brandHeroButton:focus-visible {
    --brand-btn-scale: 1.04;
    filter: brightness(0.98);
}

@media (prefers-reduced-motion: reduce) {

    .brandHeroTitle,
    .brandHeroSubtitle {
        transition: none;
        transform: none;
        opacity: 1;
    }

    .brandHeroButton {
        transition: none;
        opacity: 1;
        --brand-btn-y: 0px;
    }

    .brandHeroButton:hover,
    .brandHeroButton:focus-visible {
        transform: none;
    }
}
</style>
