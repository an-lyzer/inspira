<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import logoUrl from '../assets/images/logopng.png'

const isServicesOpen = ref(false)
const servicesWrapRef = ref(null)

const isMobileMenuOpen = ref(false)
const isMobileServicesOpen = ref(false)
const mobileMenuWrapRef = ref(null)

const closeServices = () => {
    isServicesOpen.value = false
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    isMobileServicesOpen.value = false
    document.body.style.overflow = ''
}

const openServices = () => {
    isServicesOpen.value = true
}

const toggleServices = async () => {
    isServicesOpen.value = !isServicesOpen.value
    await nextTick()
}

const toggleMobileMenu = async () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (!isMobileMenuOpen.value) isMobileServicesOpen.value = false
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
    await nextTick()
}

const toggleMobileServices = async () => {
    isMobileServicesOpen.value = !isMobileServicesOpen.value
    await nextTick()
}

const onDocumentPointerDown = (event) => {
    if (isServicesOpen.value) {
        const wrap = servicesWrapRef.value
        if (wrap && !wrap.contains(event.target)) closeServices()
    }

    if (isMobileMenuOpen.value) {
        const mobileWrap = mobileMenuWrapRef.value
        if (mobileWrap && !mobileWrap.contains(event.target)) closeMobileMenu()
    }
}

const onDocumentKeyDown = (event) => {
    if (event.key !== 'Escape') return
    if (isServicesOpen.value) closeServices()
    if (isMobileMenuOpen.value) closeMobileMenu()
}

const onMenuItemClick = () => {
    closeServices()
}

const onMobileItemClick = () => {
    closeMobileMenu()
}

onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
    document.addEventListener('keydown', onDocumentKeyDown)
})

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    document.removeEventListener('keydown', onDocumentKeyDown)

    document.body.style.overflow = ''
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

            <div ref="mobileMenuWrapRef" class="mobileMenuWrap">
                <button class="mobileMenuButton" type="button" aria-label="Abrir menú"
                    :aria-expanded="isMobileMenuOpen ? 'true' : 'false'" aria-haspopup="menu" @click="toggleMobileMenu">
                    <svg class="mobileMenuIcon" xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                        viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
                    </svg>
                </button>

                <transition name="mobileOverlayFade">
                    <div v-if="isMobileMenuOpen" class="mobileMenuOverlay" aria-hidden="true" @click="closeMobileMenu">
                    </div>
                </transition>

                <transition name="mobileDrawerSlide">
                    <aside v-if="isMobileMenuOpen" class="mobileMenuPanel" role="menu" aria-label="Menú móvil">
                        <div class="mobileMenuHeader">
                            <a class="mobileMenuBrand" href="/" aria-label="Inspira Financial Capital"
                                @click="onMobileItemClick">
                                <img class="mobileMenuBrandLogo" :src="logoUrl" alt="Inspira Financial Capital" />
                            </a>

                            <button class="mobileMenuClose" type="button" aria-label="Cerrar menú"
                                @click="closeMobileMenu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    aria-hidden="true" focusable="false">
                                    <path fill="currentColor"
                                        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-6.89 6.3-1.42-1.41L10.59 12 3.69 5.71 5.11 4.29 12 10.59l6.89-6.3z" />
                                </svg>
                            </button>
                        </div>

                        <a class="mobileMenuLink" role="menuitem" href="/" @click="onMobileItemClick">Inicio</a>

                        <div class="mobileMenuGroup">
                            <button class="mobileMenuLink mobileMenuLinkButton" type="button" role="menuitem"
                                aria-haspopup="menu" :aria-expanded="isMobileServicesOpen ? 'true' : 'false'"
                                @click="toggleMobileServices">
                                Servicios
                                <span class="caret" :class="{ isOpen: isMobileServicesOpen }" aria-hidden="true"></span>
                            </button>

                            <div v-if="isMobileServicesOpen" class="mobileSubmenu" role="menu" aria-label="Servicios">
                                <a class="mobileSubmenuLink" role="menuitem" href="/transformacion-operacional"
                                    @click="onMobileItemClick">
                                    Transformación Operacional
                                </a>
                                <a class="mobileSubmenuLink" role="menuitem" href="/Asesoriafinanciera"
                                    @click="onMobileItemClick">
                                    Asesoría Financiera
                                </a>
                                <a class="mobileSubmenuLink" role="menuitem" href="/estructuracion-patrimonial"
                                    @click="onMobileItemClick">
                                    Estructuración Patrimonial
                                </a>
                                <a class="mobileSubmenuLink" role="menuitem" href="/gobierno-corporativo"
                                    @click="onMobileItemClick">
                                    Gobierno Corporativo
                                </a>
                            </div>
                        </div>

                        <a class="mobileMenuLink" role="menuitem" href="/miembros"
                            @click="onMobileItemClick">Nosotros</a>
                        <a class="mobileMenuLink" role="menuitem" href="/contacto"
                            @click="onMobileItemClick">Contáctanos</a>
                    </aside>
                </transition>
            </div>

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
    <div class="headerSpacer" aria-hidden="true"></div>
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

.headerSpacer {
    display: none;
    height: 80px;
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

.mobileMenuWrap {
    display: none;
    position: relative;
    justify-self: end;
}

.mobileMenuButton {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 0.5rem;
    color: var(--color-azul);
    cursor: pointer;
    line-height: 0;
}

.mobileMenuButton:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--color-azul) 35%, transparent);
    outline-offset: 2px;
    border-radius: 10px;
}

.mobileMenuIcon {
    display: block;
}

.mobileMenuOverlay {
    position: fixed;
    inset: 0;
    background: color-mix(in srgb, var(--color-azul) 22%, transparent);
    z-index: 9998;
}

.mobileMenuPanel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(320px, 82vw);
    padding: 10px;
    background: #fff;
    border-left: 1px solid color-mix(in srgb, var(--color-azul) 12%, var(--color-blanco));
    z-index: 9999;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.mobileMenuHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 6px 10px;
}

.mobileMenuBrand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
}

.mobileMenuBrandLogo {
    height: 48px;
    width: auto;
    display: block;
    object-fit: contain;
}

.mobileMenuClose {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 10px;
    border-radius: 12px;
    color: var(--color-azul);
    cursor: pointer;
    line-height: 0;
}

.mobileMenuClose:hover,
.mobileMenuClose:focus-visible {
    background: color-mix(in srgb, var(--color-azul) 8%, var(--color-blanco));
    outline: none;
}

.mobileMenuLink {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    text-decoration: none;
    color: var(--color-azul);
    font-weight: 500;
    font-size: var(--fs-h6);
    padding: 14px 14px;
    border-radius: 12px;
}

.mobileMenuLink:hover,
.mobileMenuLink:focus-visible {
    background: color-mix(in srgb, var(--color-azul) 8%, var(--color-blanco));
    outline: none;
}

.mobileMenuLinkButton {
    background: transparent;
    border: 0;
    cursor: pointer;
}

.mobileMenuGroup {
    display: block;
}

.mobileSubmenu {
    padding: 6px 0 10px;
}

.mobileSubmenuLink {
    display: block;
    text-decoration: none;
    color: var(--color-azul);
    font-weight: 400;
    font-size: var(--fs-p);
    padding: 10px 14px;
    border-radius: 10px;
}

.mobileSubmenuLink:hover,
.mobileSubmenuLink:focus-visible {
    background: color-mix(in srgb, var(--color-azul) 8%, var(--color-blanco));
    outline: none;
}

.mobileOverlayFade-enter-active,
.mobileOverlayFade-leave-active {
    transition: opacity 140ms ease;
}

.mobileOverlayFade-enter-from,
.mobileOverlayFade-leave-to {
    opacity: 0;
}

.mobileDrawerSlide-enter-active,
.mobileDrawerSlide-leave-active {
    transition: transform 180ms ease;
}

.mobileDrawerSlide-enter-from,
.mobileDrawerSlide-leave-to {
    transform: translateX(102%);
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
    background: linear-gradient(90deg, var(--color-azul) 0 50%, var(--color-dorado) 50% 100%);
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
    .siteHeader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .headerSpacer {
        display: block;
    }

    .container {
        padding-left: 16px;
        padding-right: 16px;
        grid-template-columns: 1fr auto;
    }

    .brand {
        min-width: 0;
        flex: 1;
    }

    .nav {
        display: none;
    }

    .mobileMenuWrap {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
    }

    .boton-contacto {
        display: none;
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

@media (max-width: 420px) {
    .brandLogo {
        height: 54px;
    }
}
</style>
