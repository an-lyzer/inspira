<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
    <Header />

    <main class="privacy" aria-label="Política de privacidad">
        <section class="privacySection">
            <div class="privacyContainer">
                <h1 class="privacyTitle">Política de Privacidad</h1>

                <p class="privacyText">
                    En cumplimiento de la Ley N.° 29733 – Ley de Protección de Datos Personales y su reglamento aprobado
                    por el Decreto Supremo N.° 003-2013-JUS, [Nombre de la Empresa] informa a los usuarios del presente
                    sitio web sobre el tratamiento de sus datos personales.
                </p>

                <h2 class="privacyHeading">1. Datos recopilados</h2>
                <p class="privacyText">
                    Podremos recopilar información proporcionada voluntariamente por el usuario mediante formularios de
                    contacto, cotizaciones o comunicaciones directas, tales como:
                </p>
                <ul class="privacyList">
                    <li>Nombres y apellidos</li>
                    <li>Número telefónico</li>
                    <li>Correo electrónico</li>
                    <li>Datos del vehículo o empresa</li>
                    <li>Otra información relacionada con la solicitud del servicio</li>
                </ul>

                <h2 class="privacyHeading">2. Finalidad del tratamiento</h2>
                <p class="privacyText">Los datos personales serán utilizados para:</p>
                <ul class="privacyList">
                    <li>Atender consultas y solicitudes de cotización</li>
                    <li>Brindar información sobre nuestros servicios</li>
                    <li>Coordinar evaluaciones técnicas o servicios</li>
                    <li>Mejorar la atención y experiencia del usuario</li>
                    <li>
                        Enviar información comercial relacionada con nuestros servicios, cuando el usuario lo autorice
                    </li>
                </ul>

                <h2 class="privacyHeading">3. Protección de la información</h2>
                <p class="privacyText">
                    La empresa adopta medidas de seguridad razonables para proteger los datos personales contra pérdida,
                    acceso no autorizado, alteración o divulgación indebida.
                </p>

                <h2 class="privacyHeading">4. Compartición de datos</h2>
                <p class="privacyText">
                    La empresa no vende ni comparte datos personales con terceros, salvo obligación legal o cuando sea
                    necesario para la prestación del servicio solicitado.
                </p>

                <h2 class="privacyHeading">5. Derechos ARCO</h2>
                <p class="privacyText">El usuario podrá ejercer sus derechos de:</p>
                <ul class="privacyList">
                    <li>Acceso</li>
                    <li>Rectificación</li>
                    <li>Cancelación</li>
                    <li>Oposición</li>
                </ul>
                <p class="privacyText">
                    respecto a sus datos personales, enviando una solicitud al correo electrónico: [correo@empresa.com].
                </p>

                <h2 class="privacyHeading">6. Uso de cookies</h2>
                <p class="privacyText">
                    Este sitio web puede utilizar cookies para mejorar la navegación y analizar estadísticas de uso. El
                    usuario puede configurar su navegador para rechazar el uso de cookies si así lo desea.
                </p>

                <h2 class="privacyHeading">7. Modificaciones</h2>
                <p class="privacyText">
                    La empresa podrá actualizar la presente Política de Privacidad en cualquier momento para adecuarla a
                    cambios normativos o mejoras en sus procesos.
                </p>
            </div>
        </section>
    </main>

    <Footer />
</template>

<style scoped>
.privacySection {
    background: var(--color-blanco);
    color: var(--color-azul);
    padding: 64px 0;
}

.privacyContainer {
    width: 100%;
    padding-left: 167px;
    padding-right: 80px;
    max-width: 1100px;
}

.privacyTitle {
    margin: 0 0 18px;
    font-family: var(--font-header);
    font-size: var(--fs-h2);
    font-weight: 700;
    color: var(--color-azul);
}

.privacyHeading {
    margin: 22px 0 10px;
    font-family: var(--font-header);
    font-size: var(--fs-h5);
    font-weight: 700;
    color: var(--color-azul);
}

.privacyText {
    margin: 0 0 14px;
    font-size: var(--fs-h6);
    line-height: 1.8;
    color: rgba(9, 22, 41, 0.9);
}

.privacyList {
    margin: 0 0 14px;
    padding-left: 18px;
    display: grid;
    gap: 8px;
    font-size: var(--fs-h6);
    line-height: 1.7;
    color: rgba(9, 22, 41, 0.9);
}

.privacyText:last-child {
    margin-bottom: 0;
}

@media (max-width: 820px) {
    .privacySection {
        padding: 40px 0;
    }

    .privacyContainer {
        padding-left: 24px;
        padding-right: 24px;
    }
}
</style>
