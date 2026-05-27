<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
    <Header />

    <main class="legal" aria-label="Aviso legal">
        <section class="legalSection">
            <div class="legalContainer">
                <h1 class="legalTitle">Aviso Legal</h1>

                <p class="legalText">
                    El presente sitio web es administrado por [Nombre de la Empresa], empresa dedicada a brindar
                    servicios
                    de conversión de vehículos y maquinaria a GNV en el Perú.
                </p>

                <p class="legalText">
                    Toda la información publicada en este sitio web tiene carácter informativo y comercial. Si bien
                    buscamos mantener la información actualizada y precisa, no garantizamos que el contenido se
                    encuentre
                    libre de errores o interrupciones.
                </p>

                <p class="legalText">
                    Los textos, imágenes, logotipos, diseños, marcas y demás contenido disponible en este sitio web son
                    propiedad de [Nombre de la Empresa] o cuentan con autorización para su uso, encontrándose protegidos
                    por la legislación peruana sobre propiedad intelectual. Queda prohibida su reproducción,
                    distribución o modificación sin autorización previa y por escrito.
                </p>

                <p class="legalText">
                    El usuario se compromete a hacer un uso adecuado del sitio web y a no realizar actividades que
                    puedan
                    afectar su funcionamiento, seguridad o contenido.
                </p>

                <p class="legalText">
                    La empresa podrá modificar el contenido del sitio web, así como el presente aviso legal, en
                    cualquier
                    momento y sin previo aviso.
                </p>
            </div>
        </section>
    </main>

    <Footer />
</template>

<style scoped>
.legalSection {
    background: var(--color-blanco);
    color: var(--color-azul);
    padding: 64px 0;
}

.legalContainer {
    width: 100%;
    padding-left: 167px;
    padding-right: 80px;
    max-width: 1100px;
}

.legalTitle {
    margin: 0 0 18px;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 700;
    color: var(--color-azul);
}

.legalText {
    margin: 0 0 14px;
    font-size: var(--fs-h6);
    line-height: 1.8;
    color: rgba(9, 22, 41, 0.9);
}

.legalText:last-child {
    margin-bottom: 0;
}

@media (max-width: 820px) {
    .legalSection {
        padding: 40px 0;
    }

    .legalContainer {
        padding-left: 24px;
        padding-right: 24px;
    }
}
</style>
