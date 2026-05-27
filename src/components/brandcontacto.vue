<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import heroBgUrl from '../assets/images/executives-preparing-meeting.jpg'

const brandHeroRef = ref(null)

let rafId

const clamp01 = (value) => Math.min(1, Math.max(0, value))

const smoothstep = (t) => {
    const x = clamp01(t)
    return x * x * (3 - 2 * x)
}

const revealProgressForTop = (el, startVh = 1.15, endVh = 0.45) => {
    if (!el) return 1
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const startPx = vh * startVh
    const endPx = vh * endVh
    const raw = (startPx - rect.top) / (startPx - endPx)
    return clamp01(raw)
}

const scrollToContactoForm = () => {
    document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })
}

const updateScrollFx = () => {
    rafId = undefined
    if (typeof window === 'undefined') return
    const section = brandHeroRef.value
    if (!section) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) {
        section.style.setProperty('--brand-title-opacity', '1')
        section.style.setProperty('--brand-title-y', '0px')
        section.style.setProperty('--brand-subtitle-opacity', '1')
        section.style.setProperty('--brand-subtitle-y', '0px')
        section.style.setProperty('--brand-btn-opacity', '1')
        section.style.setProperty('--brand-btn-y', '0px')
        return
    }

    const eased = smoothstep(revealProgressForTop(section))
    const minOpacity = 0.25
    const opacity = minOpacity + (1 - minOpacity) * eased

    section.style.setProperty('--brand-title-opacity', `${opacity}`)
    section.style.setProperty('--brand-title-y', `${-18 + 18 * eased}px`)
    section.style.setProperty('--brand-subtitle-opacity', `${opacity}`)
    section.style.setProperty('--brand-subtitle-y', `${-18 + 18 * eased}px`)
    section.style.setProperty('--brand-btn-opacity', `${opacity}`)
    section.style.setProperty('--brand-btn-y', `${18 * (1 - eased)}px`)
}

const scheduleScrollFx = () => {
    if (rafId != null) return
    rafId = window.requestAnimationFrame(updateScrollFx)
}

onMounted(() => {
    if (typeof window === 'undefined') return
    updateScrollFx()
    window.addEventListener('scroll', scheduleScrollFx, { passive: true })
    window.addEventListener('resize', scheduleScrollFx)
})

onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('scroll', scheduleScrollFx)
    window.removeEventListener('resize', scheduleScrollFx)
    if (rafId != null) {
        window.cancelAnimationFrame(rafId)
        rafId = undefined
    }
})
</script>

<template>
    <section ref="brandHeroRef" class="brandHero" :style="{ '--brand-hero-image': `url(${heroBgUrl})` }"
        aria-label="Solicita una reunión">
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
    --brand-title-opacity: 1;
    --brand-title-y: 0px;
    --brand-subtitle-opacity: 1;
    --brand-subtitle-y: 0px;
    --brand-btn-opacity: 1;
    --brand-btn-y: 0px;
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

    opacity: var(--brand-title-opacity);
    transform: translateY(var(--brand-title-y));
    transition: opacity 160ms linear, transform 160ms linear;
}

.brandHeroSubtitle {
    margin: 14px 0 0;
    font-weight: 400;
    color: rgba(249, 249, 249, 0.92);

    opacity: var(--brand-subtitle-opacity);
    transform: translateY(var(--brand-subtitle-y));
    transition: opacity 160ms linear, transform 160ms linear;
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

    --brand-btn-y: 0px;
    --brand-btn-scale: 1;
    opacity: var(--brand-btn-opacity);
    transform: translateY(var(--brand-btn-y)) scale(var(--brand-btn-scale));
    transition: opacity 160ms linear, transform 160ms linear, filter 180ms ease;
}

.brandHeroButton:hover,
.brandHeroButton:focus-visible {
    --brand-btn-scale: 1.04;
    filter: brightness(0.98);
}

@media (max-width: 820px) {
    .brandHero {
        height: 220px;
        padding: 0 20px;
        background-position: center 12%;
    }

    .brandHeroTitle {
        font-size: var(--fs-h3, 1.65rem);
        line-height: 1.15;
    }

    .brandHeroSubtitle {
        margin-top: 10px;
        font-size: var(--fs-p, 1rem);
        line-height: 1.6;
    }

    .brandHeroButton {
        margin-top: 18px;
        font-size: 1.05rem;
        padding: 12px 32px;
        border-radius: 12px;
    }
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
