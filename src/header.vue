<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import logoUrl from './assets/images/logo.jpeg'

const isServicesOpen = ref(false)
const servicesWrapRef = ref(null)

const closeServices = () => {
    isServicesOpen.value = false
}

const openServices = () => {
    isServicesOpen.value = true
}

const toggleServices = async () => {
    isServicesOpen.value = !isServicesOpen.value
    await nextTick()
}

const onDocumentPointerDown = (event) => {
    if (!isServicesOpen.value) return
    const wrap = servicesWrapRef.value
    if (!wrap) return
    if (wrap.contains(event.target)) return
    closeServices()
}

const onDocumentKeyDown = (event) => {
    if (!isServicesOpen.value) return
    if (event.key === 'Escape') closeServices()
}

const onMenuItemClick = () => {
    closeServices()
}

onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
    document.addEventListener('keydown', onDocumentKeyDown)
})

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    document.removeEventListener('keydown', onDocumentKeyDown)
})
</script>

<template>
    <header class="siteHeader">
        <div class="container">
            <a class="brand" href="/" aria-label="Inspira Financial Capital">
                <img class="brandLogo" :src="logoUrl" alt="Inspira Financial Capital" />
            </a>

            <nav class="nav" aria-label="Navegación principal">
                <a class="navLink isActive" href="/">Inicio</a>

                <div ref="servicesWrapRef" class="navItem" :class="{ isOpen: isServicesOpen }"
                    @mouseenter="openServices" @mouseleave="closeServices">
                    <button class="navLink navButton" type="button" aria-haspopup="menu"
                        :aria-expanded="isServicesOpen ? 'true' : 'false'" @click="toggleServices">
                        Servicios
                        <span class="caret" :class="{ isOpen: isServicesOpen }" aria-hidden="true"></span>
                    </button>

                    <transition name="servicesFade">
                        <div v-if="isServicesOpen" class="servicesMenu" role="menu" aria-label="Servicios">
                            <a class="servicesMenuItem" role="menuitem" href="/transformacion-operacional"
                                @click="onMenuItemClick">
                                Transformación Operacional
                            </a>
                            <a class="servicesMenuItem" role="menuitem" href="/Asesoriafinanciera"
                                @click="onMenuItemClick">
                                Asesoría Financiera
                            </a>
                            <a class="servicesMenuItem" role="menuitem" href="/estructuracion-patrimonial"
                                @click="onMenuItemClick">
                                Estructuración Patrimonial
                            </a>
                            <a class="servicesMenuItem" role="menuitem" href="/gobierno-corporativo"
                                @click="onMenuItemClick">
                                Gobierno Corporativo
                            </a>
                        </div>
                    </transition>
                </div>

                <a class="navLink" href="/miembros">Nosotros</a>
            </nav>

            <a class="boton-contacto" href="/contacto">
                Contáctanos
                <span class="ctaArrow" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                </span>
            </a>
        </div>
    </header>
</template>

<style scoped>
.siteHeader {
    background: var(--color-blanco);
    font-family: var(--font-header);
    height: 80px;
    position: relative;
    z-index: 9999;
    overflow: visible;

}

.container {
    width: 100%;
    height: 80px;
    padding-left: 80px;
    padding-right: 0;
    display: grid;
    grid-template-columns: auto 1fr 272px;
    align-items: center;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    text-decoration: none;
    color: var(--color-azul);
    min-width: 15rem;
}

.brandLogo {
    height: 66px;
    width: auto;
    display: block;
    object-fit: contain;
}

.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.5rem;
}

.navLink {
    font: inherit;
    background: transparent;
    border: none;
    color: var(--color-azul);
    text-decoration: none;
    font-weight: 500;
    font-size: var(--fs-h6);
    cursor: pointer;
    padding: 0.5rem 0;
}

.navLink:hover {
    opacity: 0.8;
}

.navButton {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.navItem {
    position: relative;
    display: inline-flex;
    align-items: center;
    --services-menu-gap: 8px;
}

.navItem::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: var(--services-menu-gap);
    background: transparent;
    pointer-events: none;
}

.navItem.isOpen::after {
    pointer-events: auto;
}

.servicesMenu {
    position: absolute;
    top: calc(100% + var(--services-menu-gap));
    left: 0;
    transform: none;
    min-width: 285px;
    --menu-pad: 8px;
    --menu-item-pad: 18px;
    padding: var(--menu-pad);
    background: #fff;
    border-radius: 14px;
    border: 1px solid color-mix(in srgb, var(--color-azul) 12%, var(--color-blanco));
    /* box-shadow: 0 14px 42px color-mix(in srgb, var(--color-azul) 18%, transparent); */
    z-index: 10000;
    translate: calc((var(--menu-pad) + var(--menu-item-pad)) * -1) 0;
}

.servicesFade-enter-active,
.servicesFade-leave-active {
    transition: opacity 120ms ease, transform 120ms ease;
}

.servicesFade-enter-from,
.servicesFade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.servicesMenuItem {
    display: block;
    text-decoration: none;
    color: var(--color-azul);
    font-weight: 400;
    font-size: var(--fs-h6);
    padding: var(--menu-item-pad);
    border-radius: 12px;
}

.servicesMenuItem:hover,
.servicesMenuItem:focus-visible {
    background: color-mix(in srgb, var(--color-azul) 8%, var(--color-blanco));
    outline: none;
}

.caret {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid currentColor;
    opacity: 0.8;
    transform: translateY(1px) rotate(0deg);
    transition: transform 180ms ease;
    transform-origin: 50% 50%;
}

.caret.isOpen {
    transform: translateY(1px) rotate(180deg);
}

.isActive {
    position: relative;
}

.boton-contacto {
    background: linear-gradient(90deg, var(--color-dorado) 0 50%, var(--color-azul) 50% 100%);
    background-size: 200% 100%;
    background-position: 100% 0;
    color: var(--color-blanco);
    text-decoration: none;
    width: 272px;
    height: 80px;
    padding: 0;
    border-radius: 0;
    font-weight: 600;
    font-size: var(--fs-h5);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    white-space: nowrap;
    transition: background-position 260ms ease;
}

.boton-contacto:hover,
.boton-contacto:focus-visible {
    background-position: 0 0;
}

.ctaArrow {
    display: inline-flex;
    align-items: center;
    line-height: 0;

}

.ctaArrow svg {
    display: block;
    width: 28.8px;
    height: 28.8px;
}

@media (min-width: 821px) {
    .container {
        position: relative;
    }

    .nav {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .boton-contacto {
        grid-column: 3;
        justify-self: end;
    }
}

@media (max-width: 820px) {
    .container {
        flex-wrap: wrap;
        gap: 0.875rem;
    }

    .brand {
        min-width: 0;
        flex: 1;
    }

    .nav {
        order: 3;
        flex-basis: 100%;
        justify-content: flex-start;
        gap: 1.5rem;
    }

    .servicesMenu {
        left: 0;
        transform: none;
        min-width: 280px;
        translate: 0 0;
    }

    .navItem {
        --services-menu-gap: 0px;
    }
}
</style>
