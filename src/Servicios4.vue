<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Header from './header.vue'
import Footer from './footer.vue'
import Miembros from './Miembros.vue'
import brandcontacto from './brandcontacto.vue'
import bannerImgUrl from './assets/images/close-up-business-people-working-with-business-document-discussion-meeting.jpg'
import descripcionImgUrl from './assets/images/executives-preparing-meeting.jpg'
import ofrecemosImgUrl from './assets/images/businessmen-using-touchpad-meeting.jpg'

const ofrecemosRef = ref(null)
const ofrecemosVisible = ref(false)

let ofrecemosObserver

onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        ofrecemosVisible.value = true
        return
    }

    ofrecemosObserver = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (!entry?.isIntersecting) return
            if (entry.intersectionRatio < 0.2) return

            ofrecemosVisible.value = true
            ofrecemosObserver?.disconnect()
            ofrecemosObserver = undefined
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -35% 0px'
        }
    )

    if (ofrecemosRef.value) {
        ofrecemosObserver.observe(ofrecemosRef.value)
    }
})

onBeforeUnmount(() => {
    ofrecemosObserver?.disconnect()
    ofrecemosObserver = undefined
})
</script>

<template>
    <Header />

    <section class="servicesHero" :style="{ '--services-hero-image': `url(${bannerImgUrl})` }"
        aria-label="Transformación Operacional">
        <div class="servicesHeroInner">
            <h1 class="servicesHeroTitle">
                <span class="servicesHeroBar" aria-hidden="true"></span>
                Transformación Operacional
            </h1>
        </div>
    </section>

    <div class="descripcion">
        <div class="col1">
            <img class="media" :src="descripcionImgUrl" alt="" />
        </div>
        <div class="col2">
            <h6>
                Optimizamos procesos y estructuras de gestión para mejorar la eficiencia operativa, financiera y
                tecnológica de las organizaciones.
            </h6>
        </div>
    </div>

    <div ref="ofrecemosRef" class="ofrecemos" :class="{ 'ofrecemos--visible': ofrecemosVisible }">
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
                    <span class="ofrecemosText">Optimización y rediseño de procesos</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Implementación de ERP y herramientas de gestión</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Automatización y dashboards gerenciales</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Back office financiero, contable y legal</span>
                </li>
                <li class="ofrecemosItem">
                    <span class="ofrecemosCheck" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                    </span>
                    <span class="ofrecemosText">Gestión del cambio y eficiencia operativa</span>
                </li>
            </ul>
        </div>

        <div class="col2">
            <img class="media" :src="ofrecemosImgUrl" alt="" />
        </div>
    </div>

    <Miembros />
    <brandcontacto />
    <Footer />
</template>

<style scoped>
.servicesHero {
    position: relative;

    height: 197px;
    background-image:
        linear-gradient(90deg, rgba(9, 22, 41, 0.75) 0%, rgba(9, 22, 41, 0.2) 55%, rgba(9, 22, 41, 0) 100%),
        var(--services-hero-image);
    background-size: cover;
    background-position: center 41%;
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
    display: inline-flex;
    align-items: center;
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

.descripcion .col2 h6 {
    margin: 0;
    max-width: 620px;

    font-weight: 500;
    line-height: 1.55;
}

.ofrecemos {
    display: grid;
    grid-template-columns: 3fr 1fr;
}

.ofrecemos .col1,
.ofrecemos .col2 {
    opacity: 0;
    transition: opacity 620ms ease, transform 620ms ease;
    will-change: transform, opacity;
}

.ofrecemos .col1 {
    transform: translateX(-36px);
}

.ofrecemos .col2 {
    transform: translateX(36px);
}

.ofrecemos--visible .col1,
.ofrecemos--visible .col2 {
    opacity: 1;
    transform: translateX(0);
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

    .descripcion .col1,
    .descripcion .col2,
    .ofrecemos .col1,
    .ofrecemos .col2 {
        min-height: 280px;
    }

    .descripcion .col2,
    .ofrecemos .col1 {
        padding: 36px 32px;
    }
}

@media (max-width: 820px) {
    .servicesHero {
        height: 260px;
    }

    .servicesHeroInner {
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 28px;
    }

    .servicesHeroTitle {
        font-size: var(--fs-h2);
    }
}
</style>
