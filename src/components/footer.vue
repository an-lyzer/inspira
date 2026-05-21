<script setup>
import logoUrl from '../assets/images/logo.jpeg'
</script>

<template>
    <footer class="siteFooter" aria-label="Pie de página">
        <div class="footerContainer">
            <div class="footerBrand">
                <RouterLink class="footerBrandLink" :to="{ name: 'home' }" aria-label="Inspira Financial Capital">
                    <img class="footerLogo" :src="logoUrl" alt="Inspira Financial Capital" />
                </RouterLink>
                <p class="footerCopy">© 2026 Inspira Financial Capital. All rights reserved</p>
            </div>

            <div class="footerCol">
                <h4 class="footerTitle">Servicios</h4>
                <ul class="footerList">
                    <li>
                        <RouterLink class="footerLink" :to="{ name: 'Asesoriafinanciera' }">Asesoría Financiera</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="footerLink" :to="{ name: 'estructuracionPatrimonial' }">Estructuración Patrimonial</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="footerLink" :to="{ name: 'gobiernoCorporativo' }">Gobierno Corporativo</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="footerLink" :to="{ name: 'transformacionOperacional' }">Transformación Operacional</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="footerCol">
                <h4 class="footerTitle">Acerca de</h4>
                <ul class="footerList">
                    <li><RouterLink class="footerLink" :to="{ name: 'nosotros' }">Nosotros</RouterLink></li>
                    <li><RouterLink class="footerLink" :to="{ name: 'contacto' }">Contacto</RouterLink></li>
                </ul>
            </div>

            <div class="footerCol">
                <h4 class="footerTitle">Ayuda</h4>
                <ul class="footerList">
                    <!-- <li><a class="footerLink" href="#">Preguntas</a></li> -->
                    <li><a class="footerLink" href="#">Terms of service</a></li>
                    <li><a class="footerLink" href="#">Legal</a></li>
                    <li><a class="footerLink" href="#">Privacy Policy</a></li>
                </ul>
            </div>

            <div class="footerCol">
                <h4 class="footerTitle">Siguenos</h4>
                <ul class="footerList">
                    
                    <li><a class="footerLink" href="#">LinkedIn</a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.siteFooter {
    background: var(--color-blanco);
    color: var(--color-azul);
    padding: 64px 0;
}

.footerContainer {
    width: 100%;
    padding-left: 80px;
    padding-right: 80px;
    display: grid;
    grid-template-columns: 1.4fr repeat(4, 1fr);
    column-gap: 72px;
    row-gap: 48px;
    align-items: start;
}

.footerBrand {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.footerBrandLink {
    display: inline-flex;
    text-decoration: none;
}

.footerLogo {
    height: 44px;
    width: auto;
    object-fit: contain;
    display: block;
}

.footerCopy {
    font-size: var(--fs-p);
    line-height: 1.6;
    margin: 0;
}

.footerTitle {
    font-family: var(--font-header);
    font-size: var(--fs-h5);
    font-weight: 700;
    margin: 0 0 20px;
}

.footerList {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.footerLink {
    text-decoration: none;
    font-size: var(--fs-h6);
    font-weight: 500;
    color: var(--color-azul);
    opacity: 0.86;
}

.footerLink:hover,
.footerLink:focus-visible {
    opacity: 1;
}

@media (max-width: 820px) {
    .siteFooter {
        padding: 40px 0;
    }

    .footerContainer {
        padding-left: 24px;
        padding-right: 24px;
        grid-template-columns: 1fr 1fr;
        column-gap: 24px;
        row-gap: 32px;
    }

    .footerBrand {
        grid-column: 1 / -1;
    }
}
</style>
