<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Header from './header.vue'
import heroBgUrl from '../assets/images/business-team-concept.jpg'
import misionIconSvg from '../assets/images/vecteezy_missile.svg?raw'
import Miembros from './Miembros.vue';
import Footer from './footer.vue';

const valoresRef = ref(null)

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

    const section = valoresRef.value
    if (!section) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) {
        section.style.setProperty('--valores-title-opacity', '1')
        section.style.setProperty('--valores-title-y', '0px')
        section.style.setProperty('--valores-cards-opacity', '1')
        section.style.setProperty('--valores-cards-y', '0px')
        return
    }

    const eased = smoothstep(revealProgressForTop(section))
    const minOpacity = 0.25
    const opacity = minOpacity + (1 - minOpacity) * eased
    const titleY = -18 + 18 * eased
    const cardsY = 32 * (1 - eased)

    section.style.setProperty('--valores-title-opacity', `${opacity}`)
    section.style.setProperty('--valores-title-y', `${titleY}px`)
    section.style.setProperty('--valores-cards-opacity', `${opacity}`)
    section.style.setProperty('--valores-cards-y', `${cardsY}px`)
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
    <div class="banner_nosotros" :style="{ '--about-hero-image': `url(${heroBgUrl})` }" aria-label="Nosotros">
        <div class="banner_nosotros_inner">
            <h1 class="banner_nosotros_title">
                <span class="banner_nosotros_bar" aria-hidden="true"></span>
                Nosotros
            </h1>
        </div>
    </div>

    <div class="quienessomos">

        <h2>¿Quiénes somos?</h2>
        <h5>
            Somos una firma boutique de asesoría estratégica y financiera que acompaña a accionistas y familias
            empresarias en la toma de decisiones clave. Combinamos análisis riguroso, experiencia empresarial y una
            mirada de largo plazo para ordenar la gestión, fortalecer el gobierno corporativo y proteger el
            patrimonio.
        </h5>
        <div class="misionVisionWrap">
            <div class="mision">
                <h4>Misión</h4>
                <span class="misionIcon" aria-hidden="true" v-html="misionIconSvg"></span>
                <h6>
                    Acompañamos a accionistas y familias empresarias a potenciar sus negocios, ordenar su gestión
                    financiera y de gobierno corporativo, y preparar sus empresas para crecer, institucionalizarse y
                    trascender con éxito hacia la siguiente generación.
                </h6>
            </div>
            <div class="vision">
                <h4>Visión</h4>
                <svg class="visionIcon" width="229" height="129" viewBox="0 0 229 129" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_254_600)">
                        <path
                            d="M164.659 110.576C182.282 101.118 197.687 86.5507 208.486 66.8639C166.854 -9.03131 56.6892 -8.87789 15 66.8639C25.8399 86.5583 41.3037 101.141 58.9845 110.6C91.6797 128.092 131.976 128.118 164.659 110.576ZM194.834 67.9825C162.643 128.059 60.8201 127.884 28.6197 67.9462C28.235 67.2315 28.2704 66.4036 28.6398 65.7452C36.441 51.2279 48.3428 40.2176 62.3592 32.7187C92.143 16.784 131.489 16.7576 161.255 32.7335C175.218 40.2278 187.076 51.2427 194.859 65.7909C195.24 66.5034 195.203 67.3263 194.834 67.9825Z"
                            fill="currentColor" />
                        <path
                            d="M139.788 38.8158C124.298 23.3252 99.181 23.3252 83.6909 38.8158C68.2007 54.3055 68.2007 79.4222 83.6909 94.9123C99.181 110.402 124.298 110.402 139.788 94.9123C155.278 79.4222 155.278 54.3055 139.788 38.8158ZM111.739 38.0237C127.666 38.0237 140.579 50.9367 140.579 66.8639C140.579 82.7914 127.666 95.704 111.739 95.704C95.8118 95.704 82.8992 82.7914 82.8992 66.8639C82.8992 50.9367 95.8118 38.0237 111.739 38.0237Z"
                            fill="currentColor" />
                        <path
                            d="M92.2704 106.607C77.3729 99.2946 67.4933 84.0724 67.4933 66.8639C67.4933 49.6544 77.3725 34.4331 92.2704 27.1207C68.0076 31.6538 45.5661 44.8029 33.2385 66.8639C45.5661 88.9243 68.0076 102.074 92.2704 106.607Z"
                            fill="currentColor" />
                        <path
                            d="M131.122 27.0786C146.067 34.3731 155.986 49.6212 155.986 66.8638C155.986 84.1068 146.067 99.3545 131.122 106.649C155.438 102.157 177.927 88.9891 190.248 66.8638C177.927 44.738 155.438 31.5714 131.122 27.0786Z"
                            fill="currentColor" />
                        <path
                            d="M128.894 49.7094C119.42 40.2359 104.058 40.2359 94.5845 49.7094C85.1105 59.1829 85.1105 74.5447 94.5845 84.0182C104.058 93.4922 119.42 93.4922 128.894 84.0182C138.367 74.5447 138.367 59.1829 128.894 49.7094Z"
                            fill="currentColor" />
                    </g>
                    <defs>
                        <clipPath id="clip0_254_600">
                            <rect width="229" height="129" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <h6>
                    Ser la firma boutique peruana referente en asesoría estratégica, financiera y patrimonial para
                    empresas y familias empresarias que buscan profesionalizar su gestión, fortalecer su gobierno
                    corporativo y construir un legado sostenible.
                </h6>
            </div>
        </div>

    </div>
    <div ref="valoresRef" class="valores">
        <div class="valores_inner">
            <div class="valoresTitle">
                <h2>Nuestros valores
                </h2>
            </div>
            <p class="valores_texto">
                Ellos guían cada recomendación y cada conversación con nuestros clientes. Nos comprometemos a
                escuchar, analizar con rigor y actuar con transparencia para construir decisiones financieras sólidas y
                un legado sostenible.
            </p>

            <div class="valores_cards">
                <div class="valorCard">
                    <div class="valorIcon" aria-hidden="true">
                        <svg viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="valores-people-mask" maskUnits="userSpaceOnUse" x="5.375" y="3.91699" width="49"
                                height="50" fill="black">
                                <rect fill="white" x="5.375" y="3.91699" width="49" height="50" />
                                <path
                                    d="M14.75 33.417C15.3023 33.417 15.75 33.8647 15.75 34.417C15.7498 34.9691 15.3022 35.417 14.75 35.417H9.375C8.82272 35.417 8.375 35.8647 8.375 36.417V51.625C8.37482 52.1771 7.92718 52.625 7.375 52.625C6.82282 52.625 6.37518 52.1771 6.375 51.625V36.417C6.375 34.7601 7.71815 33.417 9.375 33.417H14.75ZM49.625 33.417C51.2819 33.417 52.625 34.7601 52.625 36.417V51.625C52.6248 52.1771 52.1772 52.625 51.625 52.625C51.0728 52.625 50.6252 52.1771 50.625 51.625V36.417C50.625 35.8647 50.1773 35.417 49.625 35.417H44.25C43.6978 35.417 43.2502 34.9691 43.25 34.417C43.25 33.8647 43.6977 33.417 44.25 33.417H49.625ZM37.334 33.417C38.9905 33.4173 40.334 34.7604 40.334 36.417V49.167C40.3338 49.7189 39.8859 50.1666 39.334 50.167C38.7818 50.167 38.3342 49.7191 38.334 49.167V36.417C38.334 35.8649 37.886 35.4173 37.334 35.417H21.667C21.1147 35.417 20.667 35.8647 20.667 36.417V49.167C20.6668 49.719 20.219 50.1668 19.667 50.167C19.1148 50.167 18.6672 49.7191 18.667 49.167V36.417C18.667 34.7601 20.0101 33.417 21.667 33.417H37.334ZM29.8174 4.9209C36.459 5.08941 41.791 10.5267 41.791 17.209L41.7871 17.5264C41.6184 24.1678 36.182 29.4998 29.5 29.5L29.1826 29.4961C22.6465 29.3304 17.3779 24.0624 17.2119 17.5264L17.208 17.209C17.208 10.4206 22.7116 4.91717 29.5 4.91699L29.8174 4.9209ZM14.75 11.292C15.3023 11.292 15.75 11.7397 15.75 12.292C15.7498 12.8441 15.3022 13.292 14.75 13.292C11.2292 13.292 8.375 16.1462 8.375 19.667C8.37518 23.1877 11.2293 26.042 14.75 26.042C15.3023 26.042 15.75 26.4897 15.75 27.042C15.7498 27.5941 15.3022 28.042 14.75 28.042C10.1247 28.042 6.37518 24.2922 6.375 19.667C6.375 15.0416 10.1246 11.292 14.75 11.292ZM44.25 11.292C48.8754 11.292 52.625 15.0416 52.625 19.667C52.6248 24.2922 48.8753 28.042 44.25 28.042C43.6978 28.042 43.2502 27.5941 43.25 27.042C43.25 26.4897 43.6977 26.042 44.25 26.042C47.7707 26.042 50.6248 23.1877 50.625 19.667C50.625 16.1462 47.7708 13.292 44.25 13.292C43.6978 13.292 43.2502 12.8441 43.25 12.292C43.25 11.7397 43.6977 11.292 44.25 11.292ZM29.5 6.91699C23.8162 6.91717 19.208 11.5252 19.208 17.209C19.2084 22.8925 23.8164 27.4998 29.5 27.5C35.1836 27.4998 39.7907 22.8925 39.791 17.209C39.791 11.5252 35.1838 6.91717 29.5 6.91699Z" />
                            </mask>
                            <path
                                d="M14.75 33.417C15.3023 33.417 15.75 33.8647 15.75 34.417C15.7498 34.9691 15.3022 35.417 14.75 35.417H9.375C8.82272 35.417 8.375 35.8647 8.375 36.417V51.625C8.37482 52.1771 7.92718 52.625 7.375 52.625C6.82282 52.625 6.37518 52.1771 6.375 51.625V36.417C6.375 34.7601 7.71815 33.417 9.375 33.417H14.75ZM49.625 33.417C51.2819 33.417 52.625 34.7601 52.625 36.417V51.625C52.6248 52.1771 52.1772 52.625 51.625 52.625C51.0728 52.625 50.6252 52.1771 50.625 51.625V36.417C50.625 35.8647 50.1773 35.417 49.625 35.417H44.25C43.6978 35.417 43.2502 34.9691 43.25 34.417C43.25 33.8647 43.6977 33.417 44.25 33.417H49.625ZM37.334 33.417C38.9905 33.4173 40.334 34.7604 40.334 36.417V49.167C40.3338 49.7189 39.8859 50.1666 39.334 50.167C38.7818 50.167 38.3342 49.7191 38.334 49.167V36.417C38.334 35.8649 37.886 35.4173 37.334 35.417H21.667C21.1147 35.417 20.667 35.8647 20.667 36.417V49.167C20.6668 49.719 20.219 50.1668 19.667 50.167C19.1148 50.167 18.6672 49.7191 18.667 49.167V36.417C18.667 34.7601 20.0101 33.417 21.667 33.417H37.334ZM29.8174 4.9209C36.459 5.08941 41.791 10.5267 41.791 17.209L41.7871 17.5264C41.6184 24.1678 36.182 29.4998 29.5 29.5L29.1826 29.4961C22.6465 29.3304 17.3779 24.0624 17.2119 17.5264L17.208 17.209C17.208 10.4206 22.7116 4.91717 29.5 4.91699L29.8174 4.9209ZM14.75 11.292C15.3023 11.292 15.75 11.7397 15.75 12.292C15.7498 12.8441 15.3022 13.292 14.75 13.292C11.2292 13.292 8.375 16.1462 8.375 19.667C8.37518 23.1877 11.2293 26.042 14.75 26.042C15.3023 26.042 15.75 26.4897 15.75 27.042C15.7498 27.5941 15.3022 28.042 14.75 28.042C10.1247 28.042 6.37518 24.2922 6.375 19.667C6.375 15.0416 10.1246 11.292 14.75 11.292ZM44.25 11.292C48.8754 11.292 52.625 15.0416 52.625 19.667C52.6248 24.2922 48.8753 28.042 44.25 28.042C43.6978 28.042 43.2502 27.5941 43.25 27.042C43.25 26.4897 43.6977 26.042 44.25 26.042C47.7707 26.042 50.6248 23.1877 50.625 19.667C50.625 16.1462 47.7708 13.292 44.25 13.292C43.6978 13.292 43.2502 12.8441 43.25 12.292C43.25 11.7397 43.6977 11.292 44.25 11.292ZM29.5 6.91699C23.8162 6.91717 19.208 11.5252 19.208 17.209C19.2084 22.8925 23.8164 27.4998 29.5 27.5C35.1836 27.4998 39.7907 22.8925 39.791 17.209C39.791 11.5252 35.1838 6.91717 29.5 6.91699Z"
                                fill="currentColor" />
                            <path
                                d="M15.75 34.417L16.75 34.4173V34.417H15.75ZM8.375 51.625L9.375 51.6253V51.625H8.375ZM6.375 51.625H5.375L5.375 51.6253L6.375 51.625ZM52.625 51.625L53.625 51.6253V51.625H52.625ZM50.625 51.625H49.625V51.6253L50.625 51.625ZM43.25 34.417H42.25V34.4173L43.25 34.417ZM37.334 33.417L37.3342 32.417H37.334V33.417ZM40.334 49.167L41.334 49.1673V49.167H40.334ZM39.334 50.167V51.167H39.3346L39.334 50.167ZM38.334 49.167H37.334V49.1673L38.334 49.167ZM37.334 35.417L37.3346 34.417H37.334V35.417ZM20.667 36.417H19.667V36.417H20.667ZM20.667 49.167L21.667 49.1673V49.167H20.667ZM19.667 50.167V51.167H19.6673L19.667 50.167ZM18.667 49.167H17.667V49.1673L18.667 49.167ZM18.667 36.417H17.667V36.417H18.667ZM29.8174 4.9209L29.8427 3.92113L29.8297 3.92097L29.8174 4.9209ZM41.791 17.209L42.791 17.2213V17.209H41.791ZM41.7871 17.5264L42.7869 17.5518L42.787 17.5387L41.7871 17.5264ZM29.5 29.5L29.4877 30.5H29.5L29.5 29.5ZM29.1826 29.4961L29.1573 30.4959L29.1703 30.496L29.1826 29.4961ZM17.2119 17.5264L16.2119 17.5387L16.2122 17.5518L17.2119 17.5264ZM17.208 17.209H16.2079L16.2081 17.2213L17.208 17.209ZM29.5 4.91699L29.5123 3.91699L29.5 3.91699L29.5 4.91699ZM15.75 12.292L16.75 12.2923V12.292H15.75ZM8.375 19.667L7.375 19.667V19.667L8.375 19.667ZM15.75 27.042L16.75 27.0423V27.042H15.75ZM6.375 19.667L5.375 19.667V19.667L6.375 19.667ZM52.625 19.667L53.625 19.667V19.667L52.625 19.667ZM43.25 27.042H42.25V27.0423L43.25 27.042ZM50.625 19.667L51.625 19.667V19.667L50.625 19.667ZM43.25 12.292H42.25V12.2923L43.25 12.292ZM29.5 6.91699L29.5 5.91699H29.5L29.5 6.91699ZM19.208 17.209H18.208V17.209L19.208 17.209ZM29.5 27.5L29.5 28.5H29.5L29.5 27.5ZM39.791 17.209L40.791 17.209V17.209H39.791ZM14.75 33.417V34.417H15.75H16.75C16.75 33.3124 15.8546 32.417 14.75 32.417V33.417ZM15.75 34.417L14.75 34.4167V34.417V35.417V36.417C15.8548 36.417 16.7497 35.5212 16.75 34.4173L15.75 34.417ZM14.75 35.417V34.417H9.375V35.417V36.417H14.75V35.417ZM9.375 35.417V34.417C8.27043 34.417 7.375 35.3124 7.375 36.417H8.375H9.375V35.417ZM8.375 36.417H7.375V51.625H8.375H9.375V36.417H8.375ZM8.375 51.625L7.375 51.6247V51.625V52.625V53.625C8.47978 53.625 9.37465 52.7292 9.375 51.6253L8.375 51.625ZM7.375 52.625V51.625L7.375 51.6247L6.375 51.625L5.375 51.6253C5.37535 52.7292 6.27022 53.625 7.375 53.625V52.625ZM6.375 51.625H7.375V36.417H6.375H5.375V51.625H6.375ZM6.375 36.417H7.375C7.375 35.3124 8.27043 34.417 9.375 34.417V33.417V32.417C7.16586 32.417 5.375 34.2079 5.375 36.417H6.375ZM9.375 33.417V34.417H14.75V33.417V32.417H9.375V33.417ZM49.625 33.417V34.417C50.7296 34.417 51.625 35.3124 51.625 36.417H52.625H53.625C53.625 34.2079 51.8341 32.417 49.625 32.417V33.417ZM52.625 36.417H51.625V51.625H52.625H53.625V36.417H52.625ZM52.625 51.625L51.625 51.6247V51.625V52.625V53.625C52.7298 53.625 53.6246 52.7292 53.625 51.6253L52.625 51.625ZM51.625 52.625V51.625V51.6247L50.625 51.625L49.625 51.6253C49.6254 52.7292 50.5202 53.625 51.625 53.625V52.625ZM50.625 51.625H51.625V36.417H50.625H49.625V51.625H50.625ZM50.625 36.417H51.625C51.625 35.3124 50.7296 34.417 49.625 34.417V35.417V36.417H50.625ZM49.625 35.417V34.417H44.25V35.417V36.417H49.625V35.417ZM44.25 35.417V34.417V34.4167L43.25 34.417L42.25 34.4173C42.2504 35.5212 43.1452 36.417 44.25 36.417V35.417ZM43.25 34.417H44.25V33.417V32.417C43.1454 32.417 42.25 33.3124 42.25 34.417H43.25ZM44.25 33.417V34.417H49.625V33.417V32.417H44.25V33.417ZM37.334 33.417L37.3338 34.417C38.4384 34.4172 39.334 35.3129 39.334 36.417H40.334H41.334C41.334 34.2079 39.5427 32.4175 37.3342 32.417L37.334 33.417ZM40.334 36.417H39.334V49.167H40.334H41.334V36.417H40.334ZM40.334 49.167L39.334 49.1667L39.3333 49.167L39.334 50.167L39.3346 51.167C40.438 51.1663 41.3336 50.2716 41.334 49.1673L40.334 49.167ZM39.334 50.167V49.167V49.1667L38.334 49.167L37.334 49.1673C37.3343 50.2712 38.2292 51.167 39.334 51.167V50.167ZM38.334 49.167H39.334V36.417H38.334H37.334V49.167H38.334ZM38.334 36.417H39.334C39.334 35.312 38.4378 34.4177 37.3346 34.417L37.334 35.417L37.3333 36.417H37.334H38.334ZM37.334 35.417V34.417H21.667V35.417V36.417H37.334V35.417ZM21.667 35.417V34.417C20.5624 34.417 19.667 35.3124 19.667 36.417H20.667H21.667V36.417V35.417ZM20.667 36.417H19.667V49.167H20.667H21.667V36.417H20.667ZM20.667 49.167L19.667 49.1667L19.6667 49.167L19.667 50.167L19.6673 51.167C20.7714 51.1666 21.6666 50.2714 21.667 49.1673L20.667 49.167ZM19.667 50.167V49.167V49.1667L18.667 49.167L17.667 49.1673C17.6673 50.2712 18.5622 51.167 19.667 51.167V50.167ZM18.667 49.167H19.667V36.417H18.667H17.667V49.167H18.667ZM18.667 36.417H19.667C19.667 35.3124 20.5624 34.417 21.667 34.417V33.417V32.417C19.4579 32.417 17.667 34.2079 17.667 36.417H18.667ZM21.667 33.417V34.417H37.334V33.417V32.417H21.667V33.417ZM29.8174 4.9209L29.792 5.92058C35.8928 6.07536 40.791 11.0704 40.791 17.209H41.791H42.791C42.791 9.983 37.0253 4.10345 29.8427 3.92122L29.8174 4.9209ZM41.791 17.209L40.7911 17.1967L40.7872 17.5141L41.7871 17.5264L42.787 17.5387L42.7909 17.2213L41.791 17.209ZM41.7871 17.5264L40.7874 17.501C40.6325 23.6016 35.6382 28.4998 29.5 28.5L29.5 29.5L29.5 30.5C36.7258 30.4998 42.6044 24.734 42.7868 17.5518L41.7871 17.5264ZM29.5 29.5L29.5123 28.5001L29.1949 28.4962L29.1826 29.4961L29.1703 30.496L29.4877 30.4999L29.5 29.5ZM29.1826 29.4961L29.208 28.4964C23.2042 28.3442 18.3641 23.5046 18.2116 17.501L17.2119 17.5264L16.2122 17.5518C16.3918 24.6202 22.0888 30.3166 29.1573 30.4958L29.1826 29.4961ZM17.2119 17.5264L18.2118 17.5141L18.2079 17.1967L17.208 17.209L16.2081 17.2213L16.212 17.5387L17.2119 17.5264ZM17.208 17.209H18.208C18.208 10.9729 23.2639 5.91715 29.5 5.91699L29.5 4.91699L29.5 3.91699C22.1594 3.91718 16.208 9.86828 16.208 17.209H17.208ZM29.5 4.91699L29.4877 5.91692L29.8051 5.92082L29.8174 4.9209L29.8297 3.92097L29.5123 3.91707L29.5 4.91699ZM14.75 11.292V12.292H15.75H16.75C16.75 11.1874 15.8546 10.292 14.75 10.292V11.292ZM15.75 12.292L14.75 12.2917V12.292V13.292V14.292C15.8548 14.292 16.7496 13.3962 16.75 12.2923L15.75 12.292ZM14.75 13.292V12.292C10.6769 12.292 7.375 15.5939 7.375 19.667L8.375 19.667L9.375 19.667C9.375 16.6985 11.7815 14.292 14.75 14.292V13.292ZM8.375 19.667L7.375 19.667C7.3752 23.7399 10.677 27.042 14.75 27.042V26.042V25.042C11.7816 25.042 9.37515 22.6354 9.375 19.6669L8.375 19.667ZM14.75 26.042V27.042H15.75H16.75C16.75 25.9374 15.8546 25.042 14.75 25.042V26.042ZM15.75 27.042L14.75 27.0417V27.042V28.042V29.042C15.8548 29.042 16.7496 28.1462 16.75 27.0423L15.75 27.042ZM14.75 28.042V27.042C10.677 27.042 7.37515 23.74 7.375 19.667L6.375 19.667L5.375 19.667C5.3752 24.8445 9.5724 29.042 14.75 29.042V28.042ZM6.375 19.667L7.375 19.667C7.375 15.5939 10.6769 12.292 14.75 12.292V11.292V10.292C9.57233 10.292 5.375 14.4893 5.375 19.667L6.375 19.667ZM44.25 11.292V12.292C48.3231 12.292 51.625 15.5939 51.625 19.667L52.625 19.667L53.625 19.667C53.625 14.4893 49.4277 10.292 44.25 10.292V11.292ZM52.625 19.667L51.625 19.667C51.6248 23.74 48.323 27.042 44.25 27.042V28.042V29.042C49.4276 29.042 53.6248 24.8445 53.625 19.667L52.625 19.667ZM44.25 28.042V27.042V27.0417L43.25 27.042L42.25 27.0423C42.2504 28.1462 43.1452 29.042 44.25 29.042V28.042ZM43.25 27.042H44.25V26.042V25.042C43.1454 25.042 42.25 25.9374 42.25 27.042H43.25ZM44.25 26.042V27.042C48.323 27.042 51.6248 23.7399 51.625 19.667L50.625 19.667L49.625 19.6669C49.6249 22.6354 47.2184 25.042 44.25 25.042V26.042ZM50.625 19.667L51.625 19.667C51.625 15.5939 48.3231 12.292 44.25 12.292V13.292V14.292C47.2185 14.292 49.625 16.6985 49.625 19.667L50.625 19.667ZM44.25 13.292V12.292V12.2917L43.25 12.292L42.25 12.2923C42.2504 13.3962 43.1452 14.292 44.25 14.292V13.292ZM43.25 12.292H44.25V11.292V10.292C43.1454 10.292 42.25 11.1874 42.25 12.292H43.25ZM29.5 6.91699L29.5 5.91699C23.264 5.91719 18.208 10.9728 18.208 17.209H19.208H20.208C20.208 12.0775 24.3685 7.91715 29.5 7.91699L29.5 6.91699ZM19.208 17.209L18.208 17.209C18.2084 23.4449 23.2642 28.4998 29.5 28.5L29.5 27.5L29.5 26.5C24.3686 26.4998 20.2083 22.3401 20.208 17.2089L19.208 17.209ZM29.5 27.5L29.5 28.5C35.7359 28.4998 40.7906 23.4448 40.791 17.209L39.791 17.209L38.791 17.2089C38.7907 22.3402 34.6312 26.4998 29.5 26.5L29.5 27.5ZM39.791 17.209H40.791C40.791 10.973 35.7362 5.91719 29.5 5.91699L29.5 6.91699L29.5 7.91699C34.6314 7.91715 38.791 12.0774 38.791 17.209H39.791Z"
                                fill="currentColor" mask="url(#valores-people-mask)" />
                        </svg>
                    </div>
                    <h3>Integridad y confianza</h3>
                    <p>Actuamos con ética, transparencia y confidencialidad, construyendo relaciones sólidas de
                        largo
                        plazo.</p>
                </div>

                <div class="valorCard">
                    <div class="valorIcon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M16.0002 12C16.0002 14.2091 14.2094 16 12.0002 16C9.79111 16 8.00024 14.2091 8.00024 12C8.00024 9.79086 9.79111 8 12.0002 8C14.2094 8 16.0002 9.79086 16.0002 12ZM14.5002 12C14.5002 13.3807 13.381 14.5 12.0002 14.5C10.6195 14.5 9.50024 13.3807 9.50024 12C9.50024 10.6193 10.6195 9.5 12.0002 9.5C13.381 9.5 14.5002 10.6193 14.5002 12Z"
                                fill="currentColor" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.39213 12.7884C2.24299 12.2738 2.24299 11.7262 2.39213 11.2116C3.59931 7.0456 7.44308 4 11.9982 4C16.5533 4 20.3971 7.0456 21.6043 11.2116C21.7534 11.7262 21.7534 12.2738 21.6043 12.7884C20.3971 16.9544 16.5533 20 11.9982 20C7.44308 20 3.59931 16.9544 2.39213 12.7884ZM3.83286 11.6291C4.85923 8.08706 8.12854 5.5 11.9982 5.5C15.8678 5.5 19.1372 8.08706 20.1635 11.6291C20.2336 11.871 20.2336 12.129 20.1635 12.3709C19.1372 15.9129 15.8678 18.5 11.9982 18.5C8.12854 18.5 4.85923 15.9129 3.83286 12.3709C3.76275 12.129 3.76275 11.871 3.83286 11.6291Z"
                                fill="currentColor" />
                        </svg>

                    </div>
                    <h3>Vision estratégica</h3>
                    <p>Analizamos cada decisión con rigor financiero y enfoque empresarial, identificando
                        oportunidades
                        que permitan ordenar, fortalecer y proyectar el crecimiento</p>
                </div>

                <div class="valorCard">
                    <div class="valorIcon" aria-hidden="true">
                        <svg viewBox="0 0 52 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.6655 27.0208V5.19396H21.8649V27.0208L17.7652 23.0263L13.6655 27.0208ZM27.3311 31.3005V-6.21875H35.5304V22.741L27.3311 31.3005ZM0 41.144V16.6067H8.19932V32.5845L0 41.144ZM0 48.1343L17.6285 29.7313L27.3311 38.4335L42.6365 22.4557H38.2635V16.7493H51.929V31.0152H46.4628V26.4501L27.6044 46.1371L17.9019 37.4349L7.6527 48.1343H0Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Trascendencia</h3>
                    <p>Impulsamos decisiones que fortalecen el patrimonio, proyectan el negocio y preservan el
                        legado en
                        el tiempo.</p>
                </div>
            </div>


        </div>
    </div>
    <Miembros></Miembros>
    <Footer />
</template>

<style scoped>
.banner_nosotros {
    position: relative;
    height: 197px;
    background-image:
        linear-gradient(90deg, rgba(9, 22, 41, 0.75) 0%, rgba(9, 22, 41, 0.2) 55%, rgba(9, 22, 41, 0) 100%),
        var(--about-hero-image);
    background-size: cover;
    background-position: center;
}

.banner_nosotros_inner {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 167px;
    padding-right: 80px;
    padding-bottom: 0;
}

.banner_nosotros_title {
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

.banner_nosotros_bar {
    width: 2px;
    height: 1em;
    background: currentColor;
    opacity: 0.9;
}

@media (max-width: 820px) {
    .banner_nosotros {
        height: 130px;
    }

    .banner_nosotros_inner {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
    }

    .banner_nosotros_title {
        font-size: var(--fs-h3, 1.65rem);
        line-height: 1.15;
    }
}

.quienessomos {
    padding: 88px 0 88px 0;
    text-align: center;
    color: var(--color-azul);
}

.quienessomos h2 {
    margin: 0;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 700;
    position: relative;
    padding-bottom: 18px;
    display: inline-block;
}

.quienessomos h2::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 96px;
    height: 2px;
    background: var(--color-dorado);

}

.quienessomos>h5 {
    margin: 26px auto 0;
    max-width: 980px;
    padding: 5px 24px;
    font-size: var(--fs-h6);
    line-height: 1.55;
    font-weight: 400;
    color: var(--color-azul);
}

.misionVisionWrap {
    margin: 52px auto 0;
    max-width: 1100px;
    padding: 0 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(28px, 14vw, 260px);
    row-gap: 56px;
    align-items: start;
}

.mision,
.vision {
    display: grid;
    grid-template-rows: auto 160px auto;
    justify-items: center;
    align-items: start;
    text-align: center;
}

.mision h4,
.vision h4 {
    margin: 0 0 22px;
    font-family: var(--font-header);

    font-weight: 700;
    color: var(--color-azul);
}

.misionIcon,
.visionIcon {
    display: block;
    width: min(220px, 100%);
    height: 160px;
    object-fit: contain;
    object-position: center;
    align-self: center;
    color: var(--color-azul);
}

:deep(.misionIcon svg) {
    width: 100%;
    height: 100%;
    display: block;
}

:deep(.misionIcon svg path) {
    fill: currentColor !important;
    stroke: currentColor !important;
}

.mision h6,
.vision h6 {
    margin: 22px 0 0;
    max-width: 360px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--color-azul);
}

@media (max-width: 900px) {
    .quienessomos {
        padding: 64px 0 40px;
    }

    .quienessomos h2 {
        font-size: var(--fs-h3, 1.65rem);
        padding-bottom: 14px;
    }

    .quienessomos>h5 {
        margin-top: 18px;
        font-size: var(--fs-p, 1rem);
        line-height: 1.65;
        padding-left: 20px;
        padding-right: 20px;
    }

    .misionVisionWrap {
        grid-template-columns: 1fr;
        row-gap: 44px;
    }

    .mision,
    .vision {
        grid-template-rows: auto 150px auto;
    }

    .mision h4,
    .vision h4 {
        margin-bottom: 16px;
        font-size: var(--fs-h4, 1.5rem);
        line-height: 1.2;
    }

    .misionIcon,
    .visionIcon {
        height: 130px;
    }

    .mision h6,
    .vision h6 {
        max-width: 52ch;
        font-size: var(--fs-p, 1rem);
        line-height: 1.65;
    }
}

.valores {
    margin-top: 0;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 84px 0 96px;
    background: var(--color-azul);
    color: var(--color-blanco);
    --valores-title-opacity: 1;
    --valores-title-y: 0px;
    --valores-cards-opacity: 1;
    --valores-cards-y: 0px;
}

.valores_inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
}

.valoresTitle {
    opacity: var(--valores-title-opacity);
    transform: translateY(var(--valores-title-y));
    transition: opacity 160ms linear, transform 160ms linear;
}

.valores_inner h2 {
    margin: 0;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 600;
    position: relative;
    padding-bottom: 18px;
    display: inline-block;
    color: var(--color-blanco);
}

.valores_inner h2::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 92px;
    height: 2px;
    background: var(--color-dorado);
}

.valores_cards {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
    align-items: stretch;
}

.valorCard {
    background: var(--color-blanco);
    color: var(--color-azul);
    border-radius: 22px;
    border: 1px solid var(--color-plomo);
    padding: 52px 42px;
    min-height: 340px;
    display: grid;
    justify-items: center;
    align-content: start;
    opacity: var(--valores-cards-opacity);
    transform: translateY(var(--valores-cards-y));
    will-change: transform, opacity;
    transition: opacity 160ms linear, transform 160ms linear;
}

.valorIcon {
    width: 68px;
    height: 68px;
    color: var(--color-dorado);
    margin-bottom: 22px;
}

.valorIcon svg {
    width: 100%;
    height: 100%;
}

.valorCard h3 {
    margin: 0;
    font-family: var(--font-header);
    font-size: var(--fs-h4);
    font-weight: 700;
    color: var(--color-azul);
}

.valorCard p {
    margin-top: 12px;
    max-width: 360px;
    font-size: var(--fs-h6);
    line-height: 1.65;
    color: var(--color-azul);
}

.valores_texto {
    margin: 44px auto 0;
    max-width: 860px;
    font-size: var(--fs-h6);
    line-height: 1.7;
    color: var(--color-blanco);
}

@media (max-width: 1100px) {
    .valores_cards {
        gap: 28px;
    }

    .valorCard {
        padding: 48px 34px;
    }
}

@media (max-width: 900px) {
    .valores {
        padding: 64px 0 72px;
    }

    .valores_inner h2 {
        font-size: var(--fs-h3, 1.65rem);
        padding-bottom: 14px;
    }

    .valores_texto {
        margin-top: 26px;
        font-size: var(--fs-p, 1rem);
        line-height: 1.7;
    }

    .valores_cards {
        grid-template-columns: 1fr;
        gap: 22px;
    }

    .valorCard {
        padding: 34px 24px;
        min-height: 0;
    }

    .valorIcon {
        width: 56px;
        height: 56px;
        margin-bottom: 16px;
    }

    .valorCard h3 {
        font-size: var(--fs-h5, 1.25rem);
        line-height: 1.2;
    }

    .valorCard p {
        font-size: var(--fs-p, 1rem);
        line-height: 1.65;
    }
}

@media (prefers-reduced-motion: reduce) {

    .valoresTitle,
    .valorCard {
        transition: none;
        transform: none;
        opacity: 1;
    }
}
</style>
