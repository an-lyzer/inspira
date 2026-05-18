<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
import heroBgUrl from '../assets/images/apretonmanos.jpg'
import logoUrl from '../assets/images/logo.jpeg'
import FormularioSection from './FormularioSection.vue'
</script>

<template>
    <Header />
    <main class="contacto">
        <section class="contactHero" :style="{ '--contact-hero-image': `url(${heroBgUrl})` }" aria-label="Contacto">
            <div class="contactHeroInner">
                <h1 class="contactHeroTitle">
                    <span class="contactHeroBar" aria-hidden="true"></span>
                    Contacto
                </h1>
            </div>
        </section>

        <section class="contactSection" aria-label="Información de contacto">
            <div class="contactContainer">
                <div class="contactLeft">
                    <h2 class="contactHeading">Whatsapp</h2>
                    <div class="contactList">
                        <a class="contactItem" href="tel:+51938948349">(+51) 991 686 073</a>
                        <a class="contactItem" href="tel:+51938948349">(+51) 938 948 349</a>
                    </div>

                    <a class="contactEmail" href="mailto:inspira@gmail.com">karla.chumpitaz@inspirafinancial.pe</a>

                    <address class="contactAddress">
                        <div>Centro Inspira</div>
                        <div>Calle Los Sauces</div>
                        <div>San Isidro</div>
                        <div>Lima, Perú</div>
                    </address>
                </div>

                <div class="contactCard" role="group" aria-label="Horario y redes">
                    <div class="contactCardContent">
                        <div class="contactMeta">Horario de Atención:</div>
                        <div class="contactHoursTitle">Lunes a Viernes</div>
                        <div class="contactHours">9am - 6pm</div>

                        <div class="contactMeta contactMetaSpacer">Síguenos:</div>
                        <div class="socialRow" aria-label="Redes sociales">
                            <a class="socialLink" href="#" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor"
                                        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03c-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85c3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12a2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                                </svg>
                            </a>
                        </div>

                        <img class="cardLogo" :src="logoUrl" alt="" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>

        <FormularioSection />
    </main>

    <Footer />
</template>

<style scoped>
.contactHero {
    position: relative;
    height: 197px;
    background-image:
        linear-gradient(90deg, rgba(9, 22, 41, 0.75) 0%, rgba(9, 22, 41, 0.2) 55%, rgba(9, 22, 41, 0) 100%),
        var(--contact-hero-image);
    background-size: cover;
    background-position: center;
}

.contactHeroInner {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 167px;
    padding-right: 80px;
    padding-bottom: 0;
}

.contactHeroTitle {
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

.contactHeroBar {
    width: 2px;
    height: 1em;
    background: currentColor;
    opacity: 0.9;
}

.contactSection {
    background: var(--color-blanco);
    color: var(--color-blanco);
    padding: 64px 0;
}

.contactContainer {
    width: 100%;
    padding-left: 167px;
    padding-right: 80px;
    display: grid;
    grid-template-columns: max-content minmax(320px, 640px);
    column-gap: clamp(28px, 7.57vw, 109px);
    align-items: start;
}

.contactLeft {
    color: var(--color-azul);
}

.contactHeading {
    margin: 0 0 24px;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 600;
    color: var(--color-azul);
}

.contactList {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.contactItem {
    text-decoration: none;
    font-family: var(--font-header);
    font-size: var(--fs-h3);
    font-weight: 400;
    color: inherit;
}

.contactEmail {
    display: inline-block;
    margin-top: 56px;
    text-decoration: none;
    font-family: var(--font-header);
    font-size: var(--fs-h3);
    font-weight: 600;
    color: inherit;
}

.contactAddress {
    margin-top: 18px;
    font-style: normal;
    font-size: var(--fs-h6);
    font-weight: 400;
    line-height: 1.8;
    color: inherit;
}

.contactAddress div:first-child {
    font-weight: 600;
}

.contactCard {
    background: var(--color-plomo);
    color: var(--color-azul);
    min-height: 330px;
    position: relative;
    overflow: hidden;
}

.contactCardContent {
    padding: 48px 56px;
}

.contactMeta {
    font-size: var(--fs-p);
    color: rgba(9, 22, 41, 0.9);
}

.contactMetaSpacer {
    margin-top: 28px;
    color: var(--color-dorado);
    font-weight: 600;
}

.contactHoursTitle {
    margin-top: 16px;
    font-family: var(--font-header);
    font-size: var(--fs-h5);
    font-weight: 700;
}

.contactHours {
    margin-top: 6px;
    font-size: var(--fs-h6);
}

.socialRow {
    margin-top: 18px;
    display: flex;
    gap: 22px;
    align-items: center;
}

.socialLink {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    text-decoration: none;
    color: var(--color-azul);
}

.socialLink svg {
    width: 34px;
    height: 34px;
    display: block;
}

.socialLink:hover,
.socialLink:focus-visible {
    opacity: 0.85;
}

.cardLogo {
    position: absolute;
    right: 40px;
    bottom: 24px;
    width: 260px;
    height: auto;
    opacity: 0.18;
    pointer-events: none;
    filter: grayscale(1);
}

@media (max-width: 820px) {
    .contactHero {
        height: 260px;
    }

    .contactHeroInner {
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 28px;
    }

    .contactHeroTitle {
        font-size: var(--fs-h2);
    }

    .contactSection {
        padding: 40px 0;
    }

    .contactContainer {
        padding-left: 24px;
        padding-right: 24px;
        grid-template-columns: 1fr;
        gap: 28px;
    }

    .contactItem,
    .contactEmail {
        font-size: var(--fs-h5);
    }

    .contactCardContent {
        padding: 28px 24px;
    }

    .cardLogo {
        width: 200px;
        right: 18px;
        bottom: 18px;
    }
}
</style>
