<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
    <Header />

    <main class="terms" aria-label="Términos de servicio">
        <section class="termsSection">
            <div class="termsContainer">
                <h1 class="termsTitle">Términos de Servicio</h1>

                <p class="termsText">
                    Bienvenido al sitio web de [Nombre de la Empresa]. Al acceder y utilizar este sitio web, el usuario
                    acepta cumplir los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos,
                    deberá abstenerse de utilizar este sitio web.
                </p>

                <h2 class="termsHeading">1. Objeto del sitio web</h2>
                <p class="termsText">
                    El presente sitio web tiene como finalidad brindar información sobre los servicios ofrecidos por la
                    empresa, incluyendo conversión de vehículos y maquinaria a GNV, mantenimiento, asesoría técnica,
                    cotizaciones y otros servicios relacionados.
                </p>

                <h2 class="termsHeading">2. Uso adecuado del sitio</h2>
                <p class="termsText">
                    El usuario se compromete a utilizar este sitio web de manera responsable, respetando la legislación
                    peruana vigente y evitando cualquier acción que pueda afectar el funcionamiento, seguridad o
                    disponibilidad del sitio.
                </p>
                <p class="termsText">Queda prohibido:</p>
                <ul class="termsList">
                    <li>Utilizar el sitio con fines ilícitos o fraudulentos</li>
                    <li>Intentar acceder sin autorización a sistemas o información del sitio web</li>
                    <li>Introducir virus, malware o cualquier código malicioso</li>
                    <li>Copiar, reproducir o distribuir contenido sin autorización previa</li>
                </ul>

                <h2 class="termsHeading">3. Información y cotizaciones</h2>
                <p class="termsText">
                    Toda información publicada en este sitio web es referencial y puede estar sujeta a cambios sin
                    previo aviso.
                </p>
                <p class="termsText">
                    Las cotizaciones solicitadas mediante formularios, WhatsApp u otros medios de contacto no
                    constituyen una obligación contractual hasta ser confirmadas formalmente por la empresa.
                </p>

                <h2 class="termsHeading">4. Propiedad intelectual</h2>
                <p class="termsText">
                    Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseños, gráficos y
                    marcas, son propiedad de [Nombre de la Empresa] o cuentan con autorización para su uso, estando
                    protegidos por la normativa peruana sobre propiedad intelectual.
                </p>
                <p class="termsText">Queda prohibida la reproducción total o parcial del contenido sin autorización
                    expresa.</p>

                <h2 class="termsHeading">5. Responsabilidad</h2>
                <p class="termsText">
                    La empresa no garantiza que el sitio web esté libre de errores, interrupciones o fallas técnicas
                    permanentes.
                </p>
                <p class="termsText">
                    Asimismo, la empresa no será responsable por daños o perjuicios derivados del uso indebido del sitio
                    web o de la información contenida en él.
                </p>

                <h2 class="termsHeading">6. Enlaces a terceros</h2>
                <p class="termsText">
                    El sitio web podrá contener enlaces a páginas externas de terceros. La empresa no se responsabiliza
                    por el contenido, políticas o prácticas de dichos sitios web.
                </p>

                <h2 class="termsHeading">7. Protección de datos personales</h2>
                <p class="termsText">
                    El tratamiento de datos personales se realiza conforme a nuestra Política de Privacidad y a la Ley
                    N.° 29733 – Ley de Protección de Datos Personales del Perú.
                </p>

                <h2 class="termsHeading">8. Modificaciones</h2>
                <p class="termsText">
                    La empresa se reserva el derecho de modificar los presentes términos de servicio en cualquier
                    momento y sin previo aviso. Las modificaciones entrarán en vigencia desde su publicación en el sitio
                    web.
                </p>

                <h2 class="termsHeading">9. Legislación aplicable</h2>
                <p class="termsText">
                    Los presentes términos se rigen por las leyes de la República del Perú. Cualquier controversia será
                    sometida a la jurisdicción de los tribunales competentes del Perú.
                </p>
            </div>
        </section>
    </main>

    <Footer />
</template>

<style scoped>
.termsSection {
    background: var(--color-blanco);
    color: var(--color-azul);
    padding: 64px 0;
}

.termsContainer {
    width: 100%;
    padding-left: 167px;
    padding-right: 80px;
    max-width: 1100px;
}

.termsTitle {
    margin: 0 0 18px;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 700;
    color: var(--color-azul);
}

.termsHeading {
    margin: 22px 0 10px;
    font-family: var(--font-header);
    font-size: var(--fs-h5);
    font-weight: 700;
    color: var(--color-azul);
}

.termsText {
    margin: 0 0 14px;
    font-size: var(--fs-h6);
    line-height: 1.8;
    color: rgba(9, 22, 41, 0.9);
}

.termsList {
    margin: 0 0 14px;
    padding-left: 18px;
    display: grid;
    gap: 8px;
    font-size: var(--fs-h6);
    line-height: 1.7;
    color: rgba(9, 22, 41, 0.9);
}

.termsText:last-child {
    margin-bottom: 0;
}

@media (max-width: 820px) {
    .termsSection {
        padding: 40px 0;
    }

    .termsContainer {
        padding-left: 24px;
        padding-right: 24px;
    }
}
</style>
