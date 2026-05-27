<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Header from './header.vue'
import Footer from './footer.vue'
import Miembros from './Miembros.vue'
import brandcontacto from './brandcontacto.vue'
import bannerImgUrl from '../assets/images/govern1.jpg'
import descripcionImgUrl from '../assets/images/govern3.jpg'
import ofrecemosImgUrl from '../assets/images/govern2.jpg'

const ofrecemosRef = ref(null)

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

const updateScrollFx = () => {
    rafId = undefined
    if (typeof window === 'undefined') return

    const section = ofrecemosRef.value
    if (!section) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) {
        section.style.setProperty('--ofrecemos-opacity', '1')
        section.style.setProperty('--ofrecemos-left-x', '0px')
        section.style.setProperty('--ofrecemos-right-x', '0px')
        return
    }

    const eased = smoothstep(revealProgressForTop(section))
    const minOpacity = 0.35
    const opacity = minOpacity + (1 - minOpacity) * eased

    section.style.setProperty('--ofrecemos-opacity', `${opacity}`)
    section.style.setProperty('--ofrecemos-left-x', `${-36 * (1 - eased)}px`)
    section.style.setProperty('--ofrecemos-right-x', `${36 * (1 - eased)}px`)
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
    <Header />

    <section class="servicesHero paperFilm" :style="{ '--services-hero-image': `url(${bannerImgUrl})` }"
        aria-label="Gobierno Corporativo">
        <div class="servicesHeroInner">
            <h1 class="servicesHeroTitle">
                <span class="servicesHeroBar" aria-hidden="true"></span>
                Gobierno Corporativo
            </h1>
        </div>
    </section>

    <div class="descripcion">
        <div class="col1 paperFilm">
            <img class="media" :src="descripcionImgUrl" alt="" />
        </div>
        <div class="col2">
            <h5>
                Fortalecemos la institucionalización empresarial mediante modelos de gobierno corporativo que promueven
                transparencia, continuidad y toma de decisiones en empresas familiares y corporativas con crecimiento
                sostenible.
            </h5>
        </div>
    </div>

    <div ref="ofrecemosRef" class="ofrecemos">
        <div class="col1">
            <h2>¿Qué te ofrecemos?</h2>
            <h6>
                En Inspira nos gusta brindar un servicio de calidad, es por ello que te aseguramos lo siguiente:
            </h6>

            <ul class="ofrecemosList">
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Implementación de directorios y consejos consultivos</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Protocolos familiares y gobierno de accionistas</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Políticas corporativas y controles internos</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Estructura organizacional y toma de decisiones</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Acompañamiento estratégico a directorios y gerencia</span>
                </li>
            </ul>
        </div>

        <div class="col2 paperFilm">
            <img class="media" :src="ofrecemosImgUrl" alt="" />
        </div>
    </div>

    <Miembros />
    <brandcontacto />
    <Footer />
</template>

<style scoped>
.paperFilm {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    --paper-film-opacity: 0.16;
    --paper-film-size: 520px;
    --paper-film-texture: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E");
}

.paperFilm::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--paper-film-texture);
    background-repeat: repeat;
    background-size: var(--paper-film-size) var(--paper-film-size);
    opacity: var(--paper-film-opacity);
    mix-blend-mode: multiply;
    pointer-events: none;
}

.paperFilm .media {
    filter: contrast(1.02) saturate(0.96);
}

.servicesHero {
    position: relative;

    overflow-x: hidden;

    height: 197px;
    background-image:
        linear-gradient(90deg, rgba(9, 22, 41, 0.75) 0%, rgba(9, 22, 41, 0.2) 55%, rgba(9, 22, 41, 0) 100%),
        var(--services-hero-image);
    background-size: cover;
    background-position: center 33%;
}

.servicesHeroInner {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 167px;
    padding-right: 80px;
    padding-bottom: 0;
}

.servicesHeroTitle {
    margin: 0;
    font-family: var(--font-header);
    color: var(--color-blanco);
    font-size: var(--fs-h1);
    font-weight: 600;
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 100%;
    min-width: 0;
    gap: 12px;
}

.servicesHeroBar {
    width: 2px;
    height: 1em;
    background: currentColor;
    opacity: 0.9;
}

.descripcion {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.descripcion .col1,
.descripcion .col2,
.ofrecemos .col1,
.ofrecemos .col2 {
    min-height: 360px;
}

.media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.descripcion .col2 {
    background: var(--color-azul);
    color: rgba(249, 249, 249, 0.92);
    display: grid;
    place-items: center;
    padding: 52px 72px;
}

.descripcion .col2 h5 {
    margin: 0;
    max-width: 620px;

    font-weight: 500;
    line-height: 1.55;
}

.ofrecemos {
    display: grid;
    grid-template-columns: 3fr 1fr;
    --ofrecemos-opacity: 1;
    --ofrecemos-left-x: 0px;
    --ofrecemos-right-x: 0px;
}

.ofrecemos .col1,
.ofrecemos .col2 {
    opacity: var(--ofrecemos-opacity);
    transition: opacity 160ms linear, transform 160ms linear;
    will-change: transform, opacity;
}

.ofrecemos .col1 {
    transform: translateX(var(--ofrecemos-left-x));
}

.ofrecemos .col2 {
    transform: translateX(var(--ofrecemos-right-x));
}

@media (prefers-reduced-motion: reduce) {

    .ofrecemos .col1,
    .ofrecemos .col2 {
        transition: none;
        transform: none;
        opacity: 1;
    }
}

.ofrecemos .col2 {
    overflow: hidden;
}

.ofrecemos .col2 .media {
    transform: scaleX(-1);
    object-position: center 15%;
}

.ofrecemos .col1 {
    background: var(--color-blanco);
    color: var(--color-azul);
    padding: 64px 167px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 18px;
}

.ofrecemos .col1 h2 {
    color: var(--color-azul);
    position: relative;
    padding-bottom: 12px;
}

.ofrecemos .col1 h2::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 68px;
    height: 3px;
    background: var(--color-dorado);
}

.ofrecemos .col1 h6 {
    margin-top: 4px;
    font-weight: 400;
    color: rgba(9, 22, 41, 0.85);
    max-width: none;
}

.ofrecemosList {
    list-style: none;
    padding: 0;
    margin: 6px 0 0;
    display: grid;
    gap: 12px;
}

.ofrecemosItem {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ofrecemosCheck {
    width: 22px;
    height: 22px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: var(--color-dorado);
    flex: 0 0 auto;
}

.ofrecemosCheck svg {
    width: 22px;
    height: 22px;
}

.ofrecemosText {
    font-size: 1.02rem;
    font-weight: 600;
    color: rgba(9, 22, 41, 0.92);
}

@media (min-width: 901px) {
    .ofrecemos {
        height: 479px;
    }

    .ofrecemos .col1,
    .ofrecemos .col2 {
        height: 100%;
        min-height: 0;
    }
}

@media (max-width: 900px) {

    .descripcion,
    .ofrecemos {
        grid-template-columns: 1fr;
    }

    .descripcion {
        grid-template-rows: 1fr;
    }

    .descripcion .col1,
    .descripcion .col2 {
        grid-row: 1;
        grid-column: 1;
    }

    .descripcion .col1 {
        position: relative;
    }

    .descripcion .col1::before {
        content: '';
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--color-azul) 70%, transparent);
        z-index: 1;
        pointer-events: none;
    }

    .descripcion .col1 .media {
        position: relative;
        z-index: 0;
        filter: brightness(0.78) saturate(0.9);
    }

    .descripcion .col2 {
        background: transparent;
        color: var(--color-blanco);
        padding: 0;
        position: relative;
        z-index: 2;
        display: grid;
        place-items: center;
    }

    .descripcion .col2 h5 {
        padding: 36px 32px;
        max-width: 46ch;
        text-wrap: pretty;
        font-size: var(--fs-p, 1rem);
        line-height: 1.7;
    }

    .descripcion .col1,
    .descripcion .col2,
    .ofrecemos .col1,
    .ofrecemos .col2 {
        min-height: 280px;
    }

    .ofrecemos .col1 {
        padding: 48px 28px;
    }

    .ofrecemos .col1 h2 {
        font-size: var(--fs-h4, 1.5rem);
        line-height: 1.18;
    }

    .ofrecemos .col1 h6 {
        font-size: 0.98rem;
        line-height: 1.65;
    }

    .ofrecemosText {
        font-size: 0.95rem;
        line-height: 1.5;
    }
}

@media (max-width: 820px) {
    .servicesHero {
        height: 120px;
    }

    .servicesHeroInner {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
    }

    .servicesHeroTitle {
        font-size: var(--fs-h4, 1.5rem);
        line-height: 1.15;
    }

    .paperFilm {
        --paper-film-opacity: 0.2;
        --paper-film-size: 420px;
    }
}
</style>
