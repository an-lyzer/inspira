<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Header from './header.vue'
import Footer from './footer.vue'
import heroImgUrl from '../assets/images/img1home.png'
import asesoria1 from '../assets/images/asesoria1.jpg'
import fotoperfil from '../assets/images/fotoperfil1.jpg'
import servicesBgUrl from '../assets/images/imagenplaneacion.jpg'
import avatarPlaceholderUrl from '../assets/images/logo.jpeg'
import FormularioSection from './FormularioSection.vue'
import Miembros from './Miembros.vue'
import imagen2k from '../assets/images/home/imageninicial2k.png'
import nueva2k from '../assets/images/home/nueva-imagen2k.jpg'

const heroRef = ref(null)
const servicesRef = ref(null)
const reviewsRef = ref(null)

let rafId

const clamp01 = (value) => Math.min(1, Math.max(0, value))

const smoothstep = (t) => {
    const x = clamp01(t)
    return x * x * (3 - 2 * x)
}

const revealProgressForTop = (el, startVh = 0.92, endVh = 0.35) => {
    if (!el) return 1
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const startPx = vh * startVh
    const endPx = vh * endVh
    const raw = (startPx - rect.top) / (startPx - endPx)
    return clamp01(raw)
}

const applyRevealVars = (el, progress, { titleFromY, cardsFromY, titleMinOpacity }) => {
    const eased = smoothstep(progress)
    const titleOpacity = titleMinOpacity + (1 - titleMinOpacity) * eased
    const cardsOpacity = titleMinOpacity + (1 - titleMinOpacity) * eased

    const titleY = titleFromY + (-titleFromY) * eased
    const cardsY = cardsFromY + (-cardsFromY) * eased

    el.style.setProperty('--reveal-title-opacity', `${titleOpacity}`)
    el.style.setProperty('--reveal-title-y', `${titleY}px`)
    el.style.setProperty('--reveal-cards-opacity', `${cardsOpacity}`)
    el.style.setProperty('--reveal-cards-y', `${cardsY}px`)
}

const updateScrollFx = () => {
    rafId = undefined
    if (typeof window === 'undefined') return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) {
        heroRef.value?.style.removeProperty('--hero-parallax')
        servicesRef.value?.style.removeProperty('--services-parallax')

        if (servicesRef.value) applyRevealVars(servicesRef.value, 1, { titleFromY: 0, cardsFromY: 0, titleMinOpacity: 1 })
        if (reviewsRef.value) applyRevealVars(reviewsRef.value, 1, { titleFromY: 0, cardsFromY: 0, titleMinOpacity: 1 })
        return
    }

    const heroEl = heroRef.value
    if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        const offset = Math.max(-200, Math.min(200, -rect.top * 0.25))
        heroEl.style.setProperty('--hero-parallax', `${offset}px`)
    }

    const servicesEl = servicesRef.value
    if (servicesEl) {
        const rect = servicesEl.getBoundingClientRect()
        const offset = Math.max(-180, Math.min(180, -rect.top * 0.18))
        servicesEl.style.setProperty('--services-parallax', `${offset}px`)

        const p = revealProgressForTop(servicesEl)
        applyRevealVars(servicesEl, p, { titleFromY: -18, cardsFromY: 32, titleMinOpacity: 0.18 })
    }

    const reviewsEl = reviewsRef.value
    if (reviewsEl) {
        const p = revealProgressForTop(reviewsEl)
        applyRevealVars(reviewsEl, p, { titleFromY: -18, cardsFromY: 32, titleMinOpacity: 0.18 })
    }
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
const reviews = [
    {
        title: 'Eficiencia',
        text: 'Gracias a la consultoría, logramos optimizar nuestros costos operativos en un 15% durante el primer semestre.',
        name: 'Cecilia Carbajal',
        role: 'CEO at ABC Corporation'
    },
    {
        title: 'Transformación',
        text: 'Gracias a la consultoría, logramos optimizar nuestros costos operativos en un 15% durante el primer semestre.',
        name: 'Roberto Gomez',
        role: 'CEO at ABC Corporation'
    },
    {
        title: 'Calidad y seguridad',
        text: 'Gracias a la consultoría, logramos optimizar nuestros costos operativos en un 15% durante el primer semestre.',
        name: 'Monica Gomez',
        role: 'CEO at ABC Corporation'
    }
]

</script>

<template>
    <Header />
    <main class="home">
        <section ref="heroRef" class="hero" :style="{ '--hero-image': `url(${nueva2k})` }">
            <div class="heroContent">
                <!-- <h1>
                    Asesoría financiera y patrimonial para toma de decisiones que definen el futuro de tu empresa
                </h1> -->
                <h1>
                    Asesoría financiera y patrimonial para decisiones que protegen el futuro de tu empresa y tu legado
                    familiar
                </h1>
                <!-- <h1>
                   Construimos valor a través de estrategia financiera y visión corporativa
                </h1> -->
                <h5>
                    Asesoramos a empresas, accionistas y familias empresarias en
                    decisiones clave con una mirada integral y de largo plazo.
                </h5>
            </div>
        </section>

        <section id="servicios" ref="servicesRef" class="services"
            :style="{ '--services-image': `url(${servicesBgUrl})` }">
            <div class="servicesInner">
                <div class="servicesTitle">
                    <h2>Nuestros Servicios</h2>
                    <span class="servicesUnderline" aria-hidden="true"></span>
                </div>

                <div class="servicesGrid">
                    <article class="serviceCard">
                        <div class="serviceIcon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M8.692 12.266V6.692h1.616v5.574l-.808-.824zm4.347 2.23V2.692h1.615v10.189zM4.307 16.64v-5.947h1.615v4.331zm-.116 3.911l5.297-5.296l3.55 3.05l6.753-6.754H17.5v-1h4v4h-1v-2.292l-7.438 7.438l-3.55-3.05l-3.904 3.904z" />
                            </svg>
                        </div>
                        <h4>Asesoría<br />Financiera</h4>
                        <p>
                            Planeamiento, control de gestión, presupuestos y análisis financiero.
                        </p>
                        <RouterLink class="serviceCta" :to="{ name: 'Asesoriafinanciera' }"
                            aria-label="Ver Asesoría Financiera">
                            <svg width="38" height="39" viewBox="0 0 38 39" fill="none"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <ellipse cx="18.7041" cy="19.5" rx="19.5" ry="18.7041"
                                    transform="rotate(-90 18.7041 19.5)" fill="var(--color-amarillo)" />
                                <path d="M15.025 30L13.25 28.225L21.475 20L13.25 11.775L15.025 10L25.025 20L15.025 30Z"
                                    fill="var(--color-blanco)" />
                            </svg>
                        </RouterLink>
                    </article>

                    <article class="serviceCard">
                        <div class="serviceIcon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path
                                        d="M17.414 10.414C18 9.828 18 8.886 18 7s0-2.828-.586-3.414m0 6.828C16.828 11 15.886 11 14 11h-4c-1.886 0-2.828 0-3.414-.586m10.828 0Zm0-6.828C16.828 3 15.886 3 14 3h-4c-1.886 0-2.828 0-3.414.586m10.828 0Zm-10.828 0C6 4.172 6 5.114 6 7s0 2.828.586 3.414m0-6.828Zm0 6.828ZM13 7a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
                                    <path stroke-linecap="round"
                                        d="M18 6a3 3 0 0 1-3-3m3 5a3 3 0 0 0-3 3M6 6a3 3 0 0 0 3-3M6 8a3 3 0 0 1 3 3m-4 9.388h2.26c1.01 0 2.033.106 3.016.308a14.9 14.9 0 0 0 5.33.118c.868-.14 1.72-.355 2.492-.727c.696-.337 1.549-.81 2.122-1.341c.572-.53 1.168-1.397 1.59-2.075c.364-.582.188-1.295-.386-1.728a1.89 1.89 0 0 0-2.22 0l-1.807 1.365c-.7.53-1.465 1.017-2.376 1.162q-.165.026-.345.047m0 0l-.11.012m.11-.012a1 1 0 0 0 .427-.24a1.49 1.49 0 0 0 .126-2.134a1.9 1.9 0 0 0-.45-.367c-2.797-1.669-7.15-.398-9.779 1.467m9.676 1.274a.5.5 0 0 1-.11.012m0 0a9.3 9.3 0 0 1-1.814.004" />
                                    <rect width="3" height="8" x="2" y="14" rx="1.5" />
                                </g>
                            </svg>
                        </div>
                        <h4>Estructuración<br />Patrimonial</h4>
                        <p>
                            Asesoría en portafolios de inversión. Protección y ordenamiento del patrimonio familiar y
                            empresarial.
                        </p>
                        <RouterLink class="serviceCta" :to="{ name: 'estructuracionPatrimonial' }"
                            aria-label="Ver Estructuración Patrimonial">
                            <svg width="38" height="39" viewBox="0 0 38 39" fill="none"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <ellipse cx="18.7041" cy="19.5" rx="19.5" ry="18.7041"
                                    transform="rotate(-90 18.7041 19.5)" fill="var(--color-amarillo)" />
                                <path d="M15.025 30L13.25 28.225L21.475 20L13.25 11.775L15.025 10L25.025 20L15.025 30Z"
                                    fill="var(--color-blanco)" />
                            </svg>
                        </RouterLink>
                    </article>

                    <article class="serviceCard">
                        <div class="serviceIcon" aria-hidden="true">
                            <svg width="49" height="50" viewBox="0 0 49 50" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-outside-1_208_326" maskUnits="userSpaceOnUse" x="0" y="0" width="49"
                                    height="50" fill="black">
                                    <rect fill="white" width="49" height="50" />
                                    <path
                                        d="M9.375 29.5C9.92729 29.5 10.375 29.9477 10.375 30.5C10.3748 31.0521 9.92718 31.5 9.375 31.5H4C3.44772 31.5 3 31.9477 3 32.5V47.708C2.99982 48.2601 2.55218 48.708 2 48.708C1.44782 48.708 1.00018 48.2601 1 47.708V32.5C1 30.8431 2.34315 29.5 4 29.5H9.375ZM44.25 29.5C45.9069 29.5 47.25 30.8431 47.25 32.5V47.708C47.2498 48.2601 46.8022 48.708 46.25 48.708C45.6978 48.708 45.2502 48.2601 45.25 47.708V32.5C45.25 31.9477 44.8023 31.5 44.25 31.5H38.875C38.3228 31.5 37.8752 31.0521 37.875 30.5C37.875 29.9477 38.3227 29.5 38.875 29.5H44.25ZM31.959 29.5C33.6155 29.5004 34.959 30.8434 34.959 32.5V45.25C34.9588 45.8019 34.5109 46.2496 33.959 46.25C33.4068 46.25 32.9592 45.8021 32.959 45.25V32.5C32.959 31.9479 32.511 31.5004 31.959 31.5H16.292C15.7397 31.5 15.292 31.9477 15.292 32.5V45.25C15.2918 45.802 14.844 46.2498 14.292 46.25C13.7398 46.25 13.2922 45.8021 13.292 45.25V32.5C13.292 30.8431 14.6351 29.5 16.292 29.5H31.959ZM24.4424 1.00391C31.084 1.17241 36.416 6.60971 36.416 13.292L36.4121 13.6094C36.2434 20.2508 30.807 25.5828 24.125 25.583L23.8076 25.5791C17.2715 25.4134 12.0029 20.1454 11.8369 13.6094L11.833 13.292C11.833 6.5036 17.3366 1.00018 24.125 1L24.4424 1.00391ZM9.375 7.375C9.92729 7.375 10.375 7.82272 10.375 8.375C10.3748 8.92714 9.92718 9.375 9.375 9.375C5.85419 9.375 3 12.2292 3 15.75C3.00018 19.2707 5.85429 22.125 9.375 22.125C9.92729 22.125 10.375 22.5727 10.375 23.125C10.3748 23.6771 9.92718 24.125 9.375 24.125C4.74972 24.125 1.00018 20.3752 1 15.75C1 11.1246 4.74962 7.375 9.375 7.375ZM38.875 7.375C43.5004 7.375 47.25 11.1246 47.25 15.75C47.2498 20.3752 43.5003 24.125 38.875 24.125C38.3228 24.125 37.8752 23.6771 37.875 23.125C37.875 22.5727 38.3227 22.125 38.875 22.125C42.3957 22.125 45.2498 19.2707 45.25 15.75C45.25 12.2292 42.3958 9.375 38.875 9.375C38.3228 9.375 37.8752 8.92714 37.875 8.375C37.875 7.82272 38.3227 7.375 38.875 7.375ZM24.125 3C18.4412 3.00018 13.833 7.60817 13.833 13.292C13.8334 18.9755 18.4414 23.5828 24.125 23.583C29.8086 23.5828 34.4157 18.9755 34.416 13.292C34.416 7.60817 29.8088 3.00018 24.125 3Z" />
                                </mask>
                                <path
                                    d="M9.375 29.5C9.92729 29.5 10.375 29.9477 10.375 30.5C10.3748 31.0521 9.92718 31.5 9.375 31.5H4C3.44772 31.5 3 31.9477 3 32.5V47.708C2.99982 48.2601 2.55218 48.708 2 48.708C1.44782 48.708 1.00018 48.2601 1 47.708V32.5C1 30.8431 2.34315 29.5 4 29.5H9.375ZM44.25 29.5C45.9069 29.5 47.25 30.8431 47.25 32.5V47.708C47.2498 48.2601 46.8022 48.708 46.25 48.708C45.6978 48.708 45.2502 48.2601 45.25 47.708V32.5C45.25 31.9477 44.8023 31.5 44.25 31.5H38.875C38.3228 31.5 37.8752 31.0521 37.875 30.5C37.875 29.9477 38.3227 29.5 38.875 29.5H44.25ZM31.959 29.5C33.6155 29.5004 34.959 30.8434 34.959 32.5V45.25C34.9588 45.8019 34.5109 46.2496 33.959 46.25C33.4068 46.25 32.9592 45.8021 32.959 45.25V32.5C32.959 31.9479 32.511 31.5004 31.959 31.5H16.292C15.7397 31.5 15.292 31.9477 15.292 32.5V45.25C15.2918 45.802 14.844 46.2498 14.292 46.25C13.7398 46.25 13.2922 45.8021 13.292 45.25V32.5C13.292 30.8431 14.6351 29.5 16.292 29.5H31.959ZM24.4424 1.00391C31.084 1.17241 36.416 6.60971 36.416 13.292L36.4121 13.6094C36.2434 20.2508 30.807 25.5828 24.125 25.583L23.8076 25.5791C17.2715 25.4134 12.0029 20.1454 11.8369 13.6094L11.833 13.292C11.833 6.5036 17.3366 1.00018 24.125 1L24.4424 1.00391ZM9.375 7.375C9.92729 7.375 10.375 7.82272 10.375 8.375C10.3748 8.92714 9.92718 9.375 9.375 9.375C5.85419 9.375 3 12.2292 3 15.75C3.00018 19.2707 5.85429 22.125 9.375 22.125C9.92729 22.125 10.375 22.5727 10.375 23.125C10.3748 23.6771 9.92718 24.125 9.375 24.125C4.74972 24.125 1.00018 20.3752 1 15.75C1 11.1246 4.74962 7.375 9.375 7.375ZM38.875 7.375C43.5004 7.375 47.25 11.1246 47.25 15.75C47.2498 20.3752 43.5003 24.125 38.875 24.125C38.3228 24.125 37.8752 23.6771 37.875 23.125C37.875 22.5727 38.3227 22.125 38.875 22.125C42.3957 22.125 45.2498 19.2707 45.25 15.75C45.25 12.2292 42.3958 9.375 38.875 9.375C38.3228 9.375 37.8752 8.92714 37.875 8.375C37.875 7.82272 38.3227 7.375 38.875 7.375ZM24.125 3C18.4412 3.00018 13.833 7.60817 13.833 13.292C13.8334 18.9755 18.4414 23.5828 24.125 23.583C29.8086 23.5828 34.4157 18.9755 34.416 13.292C34.416 7.60817 29.8088 3.00018 24.125 3Z"
                                    fill="#EDBB58" />
                                <path
                                    d="M10.375 30.5L11.375 30.5003V30.5H10.375ZM3 47.708L4 47.7083V47.708H3ZM1 47.708H0L5.96046e-08 47.7083L1 47.708ZM47.25 47.708L48.25 47.7083V47.708H47.25ZM45.25 47.708H44.25V47.7083L45.25 47.708ZM37.875 30.5H36.875V30.5003L37.875 30.5ZM31.959 29.5L31.9592 28.5H31.959V29.5ZM34.959 45.25L35.959 45.2503V45.25H34.959ZM33.959 46.25V47.25H33.9596L33.959 46.25ZM32.959 45.25H31.959V45.2503L32.959 45.25ZM31.959 31.5L31.9596 30.5H31.959V31.5ZM15.292 32.5H14.292V32.5H15.292ZM15.292 45.25L16.292 45.2503V45.25H15.292ZM14.292 46.25V47.25H14.2923L14.292 46.25ZM13.292 45.25H12.292V45.2503L13.292 45.25ZM13.292 32.5H12.292V32.5H13.292ZM24.4424 1.00391L24.4677 0.0041427L24.4547 0.00398201L24.4424 1.00391ZM36.416 13.292L37.416 13.3043V13.292H36.416ZM36.4121 13.6094L37.4119 13.6348L37.412 13.6217L36.4121 13.6094ZM24.125 25.583L24.1127 26.583H24.125L24.125 25.583ZM23.8076 25.5791L23.7823 26.5789L23.7953 26.579L23.8076 25.5791ZM11.8369 13.6094L10.8369 13.6217L10.8372 13.6348L11.8369 13.6094ZM11.833 13.292H10.8329L10.8331 13.3043L11.833 13.292ZM24.125 1L24.1373 -3.57628e-07L24.125 0L24.125 1ZM10.375 8.375L11.375 8.37532V8.375H10.375ZM3 15.75L2 15.75V15.75L3 15.75ZM10.375 23.125L11.375 23.1253V23.125H10.375ZM1 15.75L0 15.75V15.75L1 15.75ZM47.25 15.75L48.25 15.75V15.75L47.25 15.75ZM37.875 23.125H36.875V23.1253L37.875 23.125ZM45.25 15.75L46.25 15.75V15.75L45.25 15.75ZM37.875 8.375H36.875V8.37532L37.875 8.375ZM24.125 3L24.125 2H24.125L24.125 3ZM13.833 13.292H12.833V13.2921L13.833 13.292ZM24.125 23.583L24.125 24.583H24.125L24.125 23.583ZM34.416 13.292L35.416 13.2921V13.292H34.416ZM9.375 29.5V30.5H10.375H11.375C11.375 29.3954 10.4796 28.5 9.375 28.5V29.5ZM10.375 30.5L9.375 30.4997V30.5V31.5V32.5C10.4798 32.5 11.3747 31.6042 11.375 30.5003L10.375 30.5ZM9.375 31.5V30.5H4V31.5V32.5H9.375V31.5ZM4 31.5V30.5C2.89543 30.5 2 31.3954 2 32.5H3H4V31.5ZM3 32.5H2V47.708H3H4V32.5H3ZM3 47.708L2 47.7077V47.708V48.708V49.708C3.10478 49.708 3.99965 48.8122 4 47.7083L3 47.708ZM2 48.708V47.708L2 47.7077L1 47.708L5.96046e-08 47.7083C0.000350296 48.8122 0.895222 49.708 2 49.708V48.708ZM1 47.708H2V32.5H1H0V47.708H1ZM1 32.5H2C2 31.3954 2.89543 30.5 4 30.5V29.5V28.5C1.79086 28.5 0 30.2909 0 32.5H1ZM4 29.5V30.5H9.375V29.5V28.5H4V29.5ZM44.25 29.5V30.5C45.3546 30.5 46.25 31.3954 46.25 32.5H47.25H48.25C48.25 30.2909 46.4591 28.5 44.25 28.5V29.5ZM47.25 32.5H46.25V47.708H47.25H48.25V32.5H47.25ZM47.25 47.708L46.25 47.7077V47.708V48.708V49.708C47.3548 49.708 48.2496 48.8122 48.25 47.7083L47.25 47.708ZM46.25 48.708V47.708V47.7077L45.25 47.708L44.25 47.7083C44.2504 48.8122 45.1452 49.708 46.25 49.708V48.708ZM45.25 47.708H46.25V32.5H45.25H44.25V47.708H45.25ZM45.25 32.5H46.25C46.25 31.3954 45.3546 30.5 44.25 30.5V31.5V32.5H45.25ZM44.25 31.5V30.5H38.875V31.5V32.5H44.25V31.5ZM38.875 31.5V30.5V30.4997L37.875 30.5L36.875 30.5003C36.8754 31.6042 37.7702 32.5 38.875 32.5V31.5ZM37.875 30.5H38.875V29.5V28.5C37.7704 28.5 36.875 29.3954 36.875 30.5H37.875ZM38.875 29.5V30.5H44.25V29.5V28.5H38.875V29.5ZM31.959 29.5L31.9588 30.5C33.0634 30.5002 33.959 31.3959 33.959 32.5H34.959H35.959C35.959 30.2909 34.1677 28.5005 31.9592 28.5L31.959 29.5ZM34.959 32.5H33.959V45.25H34.959H35.959V32.5H34.959ZM34.959 45.25L33.959 45.2497L33.9583 45.25L33.959 46.25L33.9596 47.25C35.063 47.2493 35.9586 46.3546 35.959 45.2503L34.959 45.25ZM33.959 46.25V45.25V45.2497L32.959 45.25L31.959 45.2503C31.9593 46.3542 32.8542 47.25 33.959 47.25V46.25ZM32.959 45.25H33.959V32.5H32.959H31.959V45.25H32.959ZM32.959 32.5H33.959C33.959 31.395 33.0628 30.5007 31.9596 30.5L31.959 31.5L31.9583 32.5H31.959H32.959ZM31.959 31.5V30.5H16.292V31.5V32.5H31.959V31.5ZM16.292 31.5V30.5C15.1874 30.5 14.292 31.3954 14.292 32.5H15.292H16.292V32.5V31.5ZM15.292 32.5H14.292V45.25H15.292H16.292V32.5H15.292ZM15.292 45.25L14.292 45.2497L14.2917 45.25L14.292 46.25L14.2923 47.25C15.3964 47.2496 16.2916 46.3544 16.292 45.2503L15.292 45.25ZM14.292 46.25V45.25V45.2497L13.292 45.25L12.292 45.2503C12.2923 46.3542 13.1872 47.25 14.292 47.25V46.25ZM13.292 45.25H14.292V32.5H13.292H12.292V45.25H13.292ZM13.292 32.5H14.292C14.292 31.3954 15.1874 30.5 16.292 30.5V29.5V28.5C14.0829 28.5 12.292 30.2909 12.292 32.5H13.292ZM16.292 29.5V30.5H31.959V29.5V28.5H16.292V29.5ZM24.4424 1.00391L24.417 2.00358C30.5178 2.15837 35.416 7.15342 35.416 13.292H36.416H37.416C37.416 6.06601 31.6503 0.18646 24.4677 0.00422794L24.4424 1.00391ZM36.416 13.292L35.4161 13.2797L35.4122 13.5971L36.4121 13.6094L37.412 13.6217L37.4159 13.3043L36.416 13.292ZM36.4121 13.6094L35.4124 13.584C35.2575 19.6846 30.2632 24.5828 24.125 24.583L24.125 25.583L24.125 26.583C31.3508 26.5828 37.2294 20.817 37.4118 13.6348L36.4121 13.6094ZM24.125 25.583L24.1373 24.5831L23.8199 24.5792L23.8076 25.5791L23.7953 26.579L24.1127 26.5829L24.125 25.583ZM23.8076 25.5791L23.833 24.5794C17.8292 24.4273 12.9891 19.5876 12.8366 13.584L11.8369 13.6094L10.8372 13.6348C11.0168 20.7033 16.7138 26.3996 23.7823 26.5788L23.8076 25.5791ZM11.8369 13.6094L12.8368 13.5971L12.8329 13.2797L11.833 13.292L10.8331 13.3043L10.837 13.6217L11.8369 13.6094ZM11.833 13.292H12.833C12.833 7.05591 17.8889 2.00016 24.125 2L24.125 1L24.125 0C16.7844 0.000190079 10.833 5.95129 10.833 13.292H11.833ZM24.125 1L24.1127 1.99992L24.4301 2.00383L24.4424 1.00391L24.4547 0.00398201L24.1373 7.57575e-05L24.125 1ZM9.375 7.375V8.375H10.375H11.375C11.375 7.27043 10.4796 6.375 9.375 6.375V7.375ZM10.375 8.375L9.375 8.37468V8.375V9.375V10.375C10.4798 10.375 11.3746 9.47917 11.375 8.37532L10.375 8.375ZM9.375 9.375V8.375C5.3019 8.375 2 11.6769 2 15.75L3 15.75L4 15.75C4 12.7815 6.40647 10.375 9.375 10.375V9.375ZM3 15.75L2 15.75C2.0002 19.8229 5.30196 23.125 9.375 23.125V22.125V21.125C6.40663 21.125 4.00015 18.7184 4 15.75L3 15.75ZM9.375 22.125V23.125H10.375H11.375C11.375 22.0204 10.4796 21.125 9.375 21.125V22.125ZM10.375 23.125L9.375 23.1247V23.125V24.125V25.125C10.4798 25.125 11.3746 24.2292 11.375 23.1253L10.375 23.125ZM9.375 24.125V23.125C5.30205 23.125 2.00015 19.823 2 15.75L1 15.75L0 15.75C0.000196755 20.9275 4.1974 25.125 9.375 25.125V24.125ZM1 15.75L2 15.75C2 11.6769 5.3019 8.375 9.375 8.375V7.375V6.375C4.19733 6.375 3.15905e-06 10.5723 0 15.75L1 15.75ZM38.875 7.375V8.375C42.9481 8.375 46.25 11.6769 46.25 15.75L47.25 15.75L48.25 15.75C48.25 10.5723 44.0527 6.375 38.875 6.375V7.375ZM47.25 15.75L46.25 15.75C46.2498 19.823 42.948 23.125 38.875 23.125V24.125V25.125C44.0526 25.125 48.2498 20.9275 48.25 15.75L47.25 15.75ZM38.875 24.125V23.125V23.1247L37.875 23.125L36.875 23.1253C36.8754 24.2292 37.7702 25.125 38.875 25.125V24.125ZM37.875 23.125H38.875V22.125V21.125C37.7704 21.125 36.875 22.0204 36.875 23.125H37.875ZM38.875 22.125V23.125C42.948 23.125 46.2498 19.8229 46.25 15.75L45.25 15.75L44.25 15.75C44.2499 18.7184 41.8434 21.125 38.875 21.125V22.125ZM45.25 15.75L46.25 15.75C46.25 11.6769 42.9481 8.375 38.875 8.375V9.375V10.375C41.8435 10.375 44.25 12.7815 44.25 15.75L45.25 15.75ZM38.875 9.375V8.375V8.37468L37.875 8.375L36.875 8.37532C36.8754 9.47917 37.7702 10.375 38.875 10.375V9.375ZM37.875 8.375H38.875V7.375V6.375C37.7704 6.375 36.875 7.27043 36.875 8.375H37.875ZM24.125 3L24.125 2C17.889 2.00019 12.833 7.05585 12.833 13.292H13.833H14.833C14.833 8.16049 18.9935 4.00016 24.125 4L24.125 3ZM13.833 13.292L12.833 13.2921C12.8334 19.5279 17.8892 24.5828 24.125 24.583L24.125 23.583L24.125 22.583C18.9936 22.5828 14.8333 18.4231 14.833 13.2919L13.833 13.292ZM24.125 23.583L24.125 24.583C30.3609 24.5828 35.4156 19.5278 35.416 13.2921L34.416 13.292L33.416 13.2919C33.4157 18.4232 29.2562 22.5828 24.125 22.583L24.125 23.583ZM34.416 13.292H35.416C35.416 7.05598 30.3612 2.00019 24.125 2L24.125 3L24.125 4C29.2564 4.00016 33.416 8.16036 33.416 13.292H34.416Z"
                                    fill="#EDBB58" mask="url(#path-1-outside-1_208_326)" />
                            </svg>
                        </div>
                        <h4>Gobierno<br />Corporativo</h4>
                        <p>
                            Fortalecimiento institucional, directorios y protocolos familiares.
                        </p>
                        <RouterLink class="serviceCta" :to="{ name: 'gobiernoCorporativo' }"
                            aria-label="Ver Gobierno Corporativo">
                            <svg width="38" height="39" viewBox="0 0 38 39" fill="none"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <ellipse cx="18.7041" cy="19.5" rx="19.5" ry="18.7041"
                                    transform="rotate(-90 18.7041 19.5)" fill="var(--color-amarillo)" />
                                <path d="M15.025 30L13.25 28.225L21.475 20L13.25 11.775L15.025 10L25.025 20L15.025 30Z"
                                    fill="var(--color-blanco)" />
                            </svg>
                        </RouterLink>
                    </article>

                    <article class="serviceCard">
                        <div class="serviceIcon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2">
                                    <path
                                        d="M12.501 20.93c-.866.25-1.914-.166-2.176-1.247a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.074.26 1.49 1.296 1.252 2.158M19 22v-6m3 3l-3-3l-3 3" />
                                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
                                </g>
                            </svg>
                        </div>
                        <h4>Transformación<br />Operacional</h4>
                        <p>
                            Implementación de ERP's, optimización de procesos, back office y herramientas de gestión.
                        </p>
                        <RouterLink class="serviceCta" :to="{ name: 'transformacionOperacional' }"
                            aria-label="Ver Transformación Operacional">
                            <svg width="38" height="39" viewBox="0 0 38 39" fill="none"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <ellipse cx="18.7041" cy="19.5" rx="19.5" ry="18.7041"
                                    transform="rotate(-90 18.7041 19.5)" fill="var(--color-amarillo)" />
                                <path d="M15.025 30L13.25 28.225L21.475 20L13.25 11.775L15.025 10L25.025 20L15.025 30Z"
                                    fill="var(--color-blanco)" />
                            </svg>
                        </RouterLink>
                    </article>
                </div>
            </div>
        </section>

        <section ref="reviewsRef" class="reviews">
            <div class="reviewsInner">
                <div class="reviewsTitle">
                    <h2>¿Por que eligen inspira?</h2>
                    <span class="reviewsUnderline" aria-hidden="true"></span>
                </div>

                <div class="reviewsGrid">
                    <article v-for="review in reviews" :key="review.title" class="review">
                        <div class="reviewBubble">
                            <h3 class="reviewBubbleTitle">{{ review.title }}</h3>
                            <p class="reviewBubbleText">{{ review.text }}</p>
                        </div>

                        <div class="reviewPerson">
                            <img class="reviewAvatar" :src="fotoperfil" alt="" aria-hidden="true" />
                            <div class="reviewPersonText">
                                <div class="reviewPersonName">{{ review.name }}</div>
                                <div class="reviewPersonRole">{{ review.role }}</div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        <Miembros />
        <FormularioSection />
    </main>
    <Footer />
</template>

<style scoped>
.home {
    min-height: calc(100vh - 80px);
}

h5 {
    font-weight: 400;
}

.hero {
    position: relative;
    min-height: calc(100vh - 80px);
    background-image: var(--hero-image);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center calc(18% + var(--hero-parallax, 0px));
    will-change: background-position;
}

.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(0deg,
            rgba(9, 22, 41, 0.62) 0%,
            rgba(9, 22, 41, 0.38) 28%,
            rgba(9, 22, 41, 0) 65%);
}

.heroContent {
    position: absolute;
    left: 80px;
    right: 80px;
    bottom: 34px;
    max-width: 820px;
    color: var(--color-blanco);
    z-index: 1;
}

.heroContent h1 {
    margin-bottom: 1rem;
}

.heroContent h6 {
    margin: 0;
    font-weight: 400;
    color: rgba(249, 249, 249, 0.92);
}

.heroContent p {
    max-width: 680px;
    color: rgba(249, 249, 249, 0.92);
}

@media (max-width: 820px) {
    .heroContent {
        left: 24px;
        right: 24px;
        bottom: 44px;
    }
}

.services {
    position: relative;
    padding: 84px 0 96px;
    --reveal-title-opacity: 1;
    --reveal-title-y: 0px;
    --reveal-cards-opacity: 1;
    --reveal-cards-y: 0px;
    background-image:
        linear-gradient(0deg, rgba(9, 22, 41, 0.82) 0%, rgba(9, 22, 41, 0.82) 100%),
        var(--services-image);
    background-size: cover;
    background-position: center calc(50% + var(--services-parallax, 0px));
    will-change: background-position;
}

.servicesInner {
    margin: 0 auto;
    padding: 0 80px;
}

.servicesTitle {
    text-align: center;
    color: var(--color-blanco);
    margin-bottom: 48px;
    opacity: var(--reveal-title-opacity);
    transform: translateY(var(--reveal-title-y));
    transition: opacity 160ms linear, transform 160ms linear;
}

.servicesTitle h2 {
    margin: 0;
}

.servicesUnderline {
    display: inline-block;
    width: 96px;
    height: 2px;
    background: var(--color-dorado);
    margin-top: 14px;
}

.servicesGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 22px;
}

.serviceCard {
    background: rgba(9, 22, 41, 0.65);
    border-radius: 14px;
    padding: 34px 26px;
    text-align: center;
    color: var(--color-blanco);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    opacity: var(--reveal-cards-opacity);
    --card-translate-y: var(--reveal-cards-y);
    --card-scale: 1;
    transform: translateY(var(--card-translate-y)) scale(var(--card-scale));
    transform-origin: center;
    will-change: transform, opacity;
    transition: opacity 160ms linear, transform 160ms linear;
}

.serviceCard:hover,
.serviceCard:focus-within {
    --card-scale: 1.05;
}

@media (prefers-reduced-motion: reduce) {

    .servicesTitle,
    .serviceCard,
    .reviewsTitle,
    .review {
        transition: none;
        transform: none;
        opacity: 1;
    }
}

.serviceIcon {
    color: var(--color-amarillo);
    display: grid;
    place-items: center;
    margin-bottom: 18px;
    height: 56px;
}

.serviceIcon svg {
    width: 44px;
    height: 44px;
}

.serviceCard h4 {
    margin: 0 0 14px;
    color: var(--color-amarillo);
    font-size: 1.5rem;
    /* 24px */
    font-weight: 600;
    line-height: 1.2;
    min-height: 2.4em;
}

.serviceCard p {
    color: rgba(249, 249, 249, 0.92);
    font-size: 1.25rem;
    /* 20px */
    font-weight: 400;
    max-width: 100%;
    margin: 0 auto;
    width: 100%;
    padding: 0 6px;
}

.serviceCta {
    margin-top: auto;
    padding-top: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transform: translateY(0);
    transition: transform 160ms ease, filter 160ms ease;
}

.serviceCta svg {
    width: 38px;
    height: 39px;
    display: block;
}

.serviceCta:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
}

.serviceCta:focus-visible {
    outline: 2px solid var(--color-amarillo);
    outline-offset: 4px;
    border-radius: 999px;
}

@media (max-width: 1024px) {
    .servicesInner {
        padding: 0 24px;
    }

    .servicesGrid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .servicesGrid {
        grid-template-columns: 1fr;
    }
}

.reviews {
    background: var(--color-azul);
    padding: 80px 0;
    --reveal-title-opacity: 1;
    --reveal-title-y: 0px;
    --reveal-cards-opacity: 1;
    --reveal-cards-y: 0px;
}

.reviewsInner {
    margin: 0 auto;
    padding: 0 129px;
}

.reviewsTitle {
    text-align: center;
    color: var(--color-blanco);
    margin-bottom: 56px;
    opacity: var(--reveal-title-opacity);
    transform: translateY(var(--reveal-title-y));
    transition: opacity 160ms linear, transform 160ms linear;
}

.reviewsTitle h2 {
    margin: 0;
}

.reviewsUnderline {
    display: inline-block;
    width: 120px;
    height: 2px;
    background: var(--color-dorado);
    margin-top: 14px;
}

.reviewsGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
}

.review {
    display: grid;
    justify-items: center;
    text-align: center;
    opacity: var(--reveal-cards-opacity);
    transform: translateY(var(--reveal-cards-y));
    transition: opacity 160ms linear, transform 160ms linear;
}

.reviewBubble {
    width: 100%;
    background: var(--color-blanco);
    color: var(--color-azul);
    border-radius: 18px;
    padding: 44px 40px;
    position: relative;
}

.reviewBubble::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid var(--color-blanco);
}

.reviewBubbleTitle {
    margin: 0 0 18px;
    font-size: 1.5rem;
    font-weight: 700;
}

.reviewBubbleText {
    margin: 0;
    font-size: 1.05rem;
    line-height: 25px;
    color: rgba(9, 22, 41, 0.8);
}

.reviewPerson {
    display: grid;
    justify-items: center;
    margin-top: 28px;
}

.reviewAvatar {
    width: 64px;
    height: 64px;
    border-radius: 999px;
    object-fit: cover;
}

.reviewPersonText {
    margin-top: 18px;
    color: var(--color-blanco);
}

.reviewPersonName {
    font-size: 1.5rem;
    font-weight: 700;
}

.reviewPersonRole {
    margin-top: 6px;
    color: rgba(249, 249, 249, 0.88);
}

@media (max-width: 1024px) {
    .reviewsInner {
        padding: 0 24px;
    }

    .reviewsGrid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .reviewsGrid {
        grid-template-columns: 1fr;
    }

    .reviewBubble {
        padding: 38px 28px;
    }
}
</style>
