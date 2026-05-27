<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import karlaImgUrl from '../assets/images/karlafoto.jpeg'
import percyImgUrl from '../assets/images/prueba 2 tovar.png'

const specialistsRef = ref(null)

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

const updateScrollFx = () => {
    rafId = undefined
    if (typeof window === 'undefined') return

    const section = specialistsRef.value
    if (!section) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const headerEl = section.querySelector('.specialistsHeader')
    const cards = section.querySelectorAll('.specialist')

    if (reduceMotion) {
        headerEl?.style.setProperty('--specialists-header-opacity', '1')
        headerEl?.style.setProperty('--specialists-header-y', '0px')

        cards.forEach((cardEl) => {
            cardEl.style.setProperty('--specialist-opacity', '1')
            cardEl.style.setProperty('--specialist-x', '0px')
        })
        return
    }

    const eased = smoothstep(revealProgressForTop(section, 1.15, 0.45))
    const minOpacity = 0.35
    const opacity = minOpacity + (1 - minOpacity) * eased

    if (headerEl) {
        const headerY = -18 + 18 * eased
        headerEl.style.setProperty('--specialists-header-opacity', `${opacity}`)
        headerEl.style.setProperty('--specialists-header-y', `${headerY}px`)
    }

    cards.forEach((cardEl, index) => {
        const baseX = index % 2 === 1 ? 36 : -36
        const x = baseX * (1 - eased)
        cardEl.style.setProperty('--specialist-opacity', `${opacity}`)
        cardEl.style.setProperty('--specialist-x', `${x}px`)
    })
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


    <main class="miembros">
        <section ref="specialistsRef" class="specialists" aria-label="Nuestros especialistas">
            <header class="specialistsHeader">
                <h2 class="specialistsTitle">Nuestros Especialistas</h2>
                <span class="specialistsUnderline" aria-hidden="true"></span>
            </header>

            <div class="specialistsGrid">
                <article class="specialist" aria-label="Karla Chumpitaz">
                    <div class="specialistPhoto">
                        <img class="specialistImg" :src="karlaImgUrl" alt="Retrato de Karla Chumpitaz" />

                        <h6 class="specialistExperience">
                            18 años de <br />
                            experiencia
                        </h6>

                        <!-- <button class="specialistAction" type="button" aria-label="Ver perfil">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor"
                                    d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364l-1.414-1.414z" />
                            </svg>
                        </button> -->
                    </div>

                    <div class="specialistInfo">
                        <h6 class="specialistRole">
                            Ejecutiva Senior en Estrategia <br> y Finanzas Corporativas
                        </h6>
                        <h5 class="specialistName">Karla Chumpitaz</h5>
                        <h6 class="specialistBio">
                            Administradora de Empresas con maestría, con Maestría Ejecutiva por INCAE Business School y
                            Directora Independiente por ESADE. Más de 18 años liderando finanzas corporativas,
                            estrategia, gobierno corporativo y transformación empresarial.
                        </h6>
                    </div>
                </article>

                <article class="specialist" aria-label="Percy Tovar">
                    <div class="specialistPhoto">
                        <img class="specialistImg" :src="percyImgUrl" alt="Retrato de Percy Tovar" />

                        <h6 class="specialistExperience">
                            25 años de <br />
                            experiencia
                        </h6>

                        <!-- <button class="specialistAction" type="button" aria-label="Ver perfil">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor"
                                    d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364l-1.414-1.414z" />
                            </svg>
                        </button> -->
                    </div>

                    <div class="specialistInfo">
                        <h6 class="specialistRole">
                            Ejecutivo Senior en Finanzas, <br>Contabilidad y tributación
                        </h6>
                        <h5 class="specialistName">Percy Tovar</h5>
                        <h6 class="specialistBio">
                            Contador Público Colegiado, MBA por ESAN y doctorado en Administración de Negocios. Más de
                            25 años de experiencia en gestión financiera, contable, tributaria, implementación SAP y
                            optimización de procesos corporativos.
                        </h6>
                    </div>
                </article>
            </div>
        </section>
    </main>


</template>

<style scoped>
.miembros {

    background: var(--color-blanco);
}

.specialists {
    padding: 80px 0 80px 0;
}

.specialistsHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 5rem;
    margin: 0 auto 56px;
    opacity: var(--specialists-header-opacity, 1);
    transform: translateY(var(--specialists-header-y, 0px));
    will-change: transform, opacity;
    transition: opacity 160ms linear, transform 160ms linear;
}

.specialistsTitle {
    font-family: var(--font-header);
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: center;
    width: 100%;
}

.specialistsUnderline {
    display: inline-block;
    width: 120px;
    height: 2px;
    background: var(--color-dorado);
    margin-top: 18px;
}

.specialistsGrid {
    width: 100%;
    padding: 0 80px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(40px, 8vw, 62px);
    row-gap: 62px;
    align-items: start;
    justify-items: center;
    max-width: calc(2 * (288px + 40px + 28rem) + 62px + 160px);
    margin: 0 auto;
}

.specialist {
    display: grid;
    grid-template-columns: 288px minmax(0, 1fr);
    column-gap: 40px;
    align-items: center;
    width: 100%;
    max-width: calc(288px + 40px + 28rem);

    opacity: var(--specialist-opacity, 1);
    transform: translateX(var(--specialist-x, 0px));
    transition: opacity 160ms linear, transform 160ms linear;
    will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {

    .specialistsHeader,
    .specialist {
        transition: none;
        transform: none;
        opacity: 1;
    }
}

.specialistPhoto {
    position: relative;
    width: 288px;
    height: 297px;
    overflow: hidden;
    background: var(--color-plomo);
}

.specialistImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.specialistExperience {
    position: absolute;
    left: 22px;
    bottom: 22px;
    color: rgba(249, 249, 249, 0.95);
    font-family: var(--font-header);
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.15;
    white-space: pre-line;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.55);
}

.specialistAction {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 37.41px;
    height: 39px;
    border-radius: 999px;
    border: none;
    background: var(--color-amarillo);
    color: var(--color-blanco);
    display: grid;
    place-items: center;
    cursor: pointer;
}

.specialistAction svg {
    width: 28px;
    height: 28px;
}

.specialistAction:hover,
.specialistAction:focus-visible {
    filter: brightness(0.98);
}

.specialistInfo {
    min-width: 0;
}

.specialistRole {
    color: var(--color-dorado);
    font-family: var(--font-header);
    font-size: 1.18rem;
    font-weight: 600;
    line-height: 1.35;
    min-height: 2.5em;
    opacity: 1;
}

.specialistName {
    margin-top: 22px;
    font-family: var(--font-header);

    font-weight: 700;
}

.specialistBio {
    margin-top: 14px;
    line-height: 1.35;
    color: rgba(9, 22, 41, 0.88);
    max-width: 28rem;
    font-weight: 400;
    opacity: 0.7;
}

@media (max-width: 1366px) and (min-width: 1121px) {
    .specialistRole {
        font-size: 0.85rem;
        line-height: 1.3;
        min-height: 0;
    }

    .specialistName {
        margin-top: 16px;
        font-size: 0.85rem;
    }

    .specialistBio {
        margin-top: 10px;
        max-width: 25rem;
        font-size: 0.85rem;
        line-height: 1.28;
    }
}

@media (max-width: 1120px) {
    .specialistsGrid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 820px) {
    .specialistsHeader {
        padding: 0 24px;
        margin-bottom: 54px;
    }

    .specialistsTitle {
        font-size: var(--fs-h3, 1.65rem);
        line-height: 1.15;
    }

    .specialistsGrid {
        padding: 0 24px;
    }

    .specialist {
        grid-template-columns: 1fr;
        row-gap: 26px;
        justify-items: center;
        text-align: center;
    }

    .specialistInfo {
        text-align: center;
    }

    .specialistPhoto {
        width: min(100%, 288px);
        height: 297px;
    }

    .specialistExperience {
        font-size: 1rem;
    }

    .specialistRole {
        font-size: 1rem;
        line-height: 1.35;
        min-height: 0;
    }

    .specialistName {
        margin-top: 14px;
        font-size: 1.25rem;
    }

    .specialistBio {
        font-size: 0.98rem;
        line-height: 1.55;
        max-width: 48ch;
        opacity: 0.78;
    }
}

@media (max-width: 420px) {
    .specialistsTitle {
        font-size: var(--fs-h4, 1.35rem);
    }

    .specialistRole {
        font-size: 0.95rem;
    }

    .specialistName {
        font-size: 1.15rem;
    }

    .specialistBio {
        font-size: 0.95rem;
    }
}
</style>
