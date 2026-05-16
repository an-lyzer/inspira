<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import karlaImgUrl from './assets/images/karlafoto.jpeg'
import percyImgUrl from './assets/images/prueba 2 tovar.png'

const specialistsRef = ref(null)
const specialistsVisible = ref(false)

let specialistsObserver

onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        specialistsVisible.value = true
        return
    }

    specialistsObserver = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (!entry?.isIntersecting) return
            if (entry.intersectionRatio < 0.2) return

            specialistsVisible.value = true
            specialistsObserver?.disconnect()
            specialistsObserver = undefined
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -35% 0px'
        }
    )

    if (specialistsRef.value) {
        specialistsObserver.observe(specialistsRef.value)
    }
})

onBeforeUnmount(() => {
    specialistsObserver?.disconnect()
    specialistsObserver = undefined
})
</script>

<template>


    <main class="miembros">
        <section ref="specialistsRef" class="specialists" :class="{ 'specialists--visible': specialistsVisible }"
            aria-label="Nuestros especialistas">
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
                          Administradora de Empresas por USIL, con Maestría Ejecutiva por INCAE Business School y Directora Independiente por ESADE. Más de 18 años liderando finanzas corporativas, estrategia, gobierno corporativo y transformación empresarial.
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
                            Contador Público Colegiado, MBA por ESAN y doctorado en Administración de Negocios. Más de 25 años de experiencia en gestión financiera, contable, tributaria, implementación SAP y optimización de procesos corporativos.
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
    opacity: 0;
    transform: translateY(-18px);
    transition: opacity 620ms ease, transform 620ms ease;
}

.specialists--visible .specialistsHeader {
    opacity: 1;
    transform: translateY(0);
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

    opacity: 0;
    --member-x: -36px;
    transform: translateX(var(--member-x));
    transition: opacity 620ms ease, transform 620ms ease;
    will-change: transform, opacity;
}

.specialistsGrid .specialist:nth-child(even) {
    --member-x: 36px;
}

.specialists--visible .specialist {
    opacity: 1;
    transform: translateX(0);
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
}

@media (max-width: 420px) {
    .specialistBio {
        font-size: 1.15rem;
    }
}
</style>
