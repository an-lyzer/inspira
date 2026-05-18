<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import bgUrl from '../assets/images/imagenplaneacion.jpg'

const formRef = ref(null)
const formVisible = ref(false)

const form = ref({
    nombre: '',
    correo: '',
    telefono: '',
    servicio: '',
    descripcion: '',
})

const submitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)

async function handleSubmit() {
    submitMessage.value = ''
    submitError.value = false

    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL
    if (!endpoint) {
        submitError.value = true
        submitMessage.value = 'Falta configurar el envío (VITE_GOOGLE_SHEETS_WEBAPP_URL).'
        return
    }

    submitting.value = true

    try {
        const payload = new URLSearchParams()
        payload.set('nombre', form.value.nombre ?? '')
        payload.set('correo', form.value.correo ?? '')
        payload.set('telefono', form.value.telefono ?? '')
        payload.set('servicio', form.value.servicio ?? '')
        payload.set('descripcion', form.value.descripcion ?? '')
        payload.set('sentAt', new Date().toISOString())
        if (typeof window !== 'undefined') {
            payload.set('page', window.location.href)
        }

        // Nota: Apps Script suele requerir `mode: 'no-cors'` si no habilitas CORS.
        // En ese modo no podemos leer la respuesta, pero el envío se realiza.
        await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            body: payload,
        })

        submitMessage.value = '¡Gracias! Te contactaremos pronto.'
        form.value = { nombre: '', correo: '', telefono: '', servicio: '', descripcion: '' }
    } catch (error) {
        submitError.value = true
        submitMessage.value = 'No se pudo enviar. Intenta nuevamente.'
        console.error('Error enviando a Google Sheets:', error)
    } finally {
        submitting.value = false
    }
}

let formObserver

onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        formVisible.value = true
        return
    }

    formObserver = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (!entry?.isIntersecting) return
            if (entry.intersectionRatio < 0.2) return

            formVisible.value = true
            formObserver?.disconnect()
            formObserver = undefined
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -35% 0px'
        }
    )

    if (formRef.value) {
        formObserver.observe(formRef.value)
    }
})

onBeforeUnmount(() => {
    formObserver?.disconnect()
    formObserver = undefined
})
</script>

<template>
    <section ref="formRef" class="formSection" :class="{ 'formSection--visible': formVisible }"
        :style="{ '--form-bg': `url(${bgUrl})` }" aria-label="Formulario de contacto">
        <div class="formSectionInner">
            <div class="formLeft">
                <div class="formIcon" aria-hidden="true">
                    <svg class="formIconSvg" width="36" height="33" viewBox="0 0 36 33" fill="none"
                        xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
                        <path
                            d="M18 0C8.06087 0 0 6.48576 0 14.4976C0 22.5094 8.06087 28.9951 18 28.9951C19.5652 28.9951 21.2087 28.8425 22.7739 28.461L31.7739 31.971C31.8522 31.971 31.9304 32.0473 32.087 32.0473C32.2435 32.0473 32.4 31.971 32.5565 31.8947C32.7913 31.7421 32.8696 31.4368 32.8696 31.2079L32.0087 23.5776C34.5913 21.0596 36 17.7786 36 14.4976C36 6.48576 27.9391 0 18 0Z"
                            fill="currentColor" />
                    </svg>
                </div>

                <h2 class="formTitle">
                    Impulsa tu proyecto hoy.
                    <br />
                    Contáctanos y da el
                    <br />
                    siguiente paso.
                </h2>

                <p class="formSubtitle">
                    Te acompañamos en cada decisión financiera, patrimonial y
                    corporativa con una visión clara y estratégica.
                </p>
            </div>

            <div class="formCard" role="group" aria-label="Agenda tu asesoría">
                <div class="formCardInner">
                    <h3 class="formCardTitle">
                        No esperes más y despega
                        <br />
                        tus finanzas. Agenta tú
                        <br />
                        asesoría ahora.
                    </h3>

                    <form class="form" @submit.prevent="handleSubmit">
                        <label class="field">
                            <span class="label">Nombre/Empresa</span>
                            <input class="input" type="text" name="nombre" placeholder="Nombre/Empresa"
                                v-model.trim="form.nombre" autocomplete="organization" />
                        </label>

                        <label class="field">
                            <span class="label">Correo *</span>
                            <input class="input" type="email" name="correo" placeholder="Correo" required
                                v-model.trim="form.correo" autocomplete="email" />
                        </label>

                        <label class="field">
                            <span class="label">Teléfono *</span>
                            <input class="input" type="tel" name="telefono" placeholder="Teléfono" required
                                v-model.trim="form.telefono" autocomplete="tel" />
                        </label>

                        <label class="field">
                            <span class="label">Servicio a Consultar</span>
                            <select class="input select" name="servicio" v-model="form.servicio" required>
                                <option value="" disabled>Selecciona un servicio</option>
                                <option value="Transformación Operacional">Transformación Operacional</option>
                                <option value="Asesoría Financiera">Asesoría Financiera</option>
                                <option value="Estructuración Patrimonial">Estructuración Patrimonial</option>
                                <option value="Gobierno Corporativo">Gobierno Corporativo</option>
                            </select>
                        </label>

                        <label class="field">
                            <span class="label">Descripción</span>
                            <textarea class="input textarea" name="descripcion" placeholder="Cuéntanos más detalles..."
                                v-model.trim="form.descripcion" rows="3"></textarea>
                        </label>

                        <button class="submit" type="submit" :disabled="submitting">
                            {{ submitting ? 'Enviando…' : 'Enviar' }}
                        </button>

                        <p v-if="submitMessage" class="formStatus" :class="{ 'formStatus--error': submitError }"
                            role="status" aria-live="polite">
                            {{ submitMessage }}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.formSection {
    background-image:
        linear-gradient(0deg, rgba(9, 22, 41, 0.78), rgba(9, 22, 41, 0.78)),
        var(--form-bg);
    background-size: cover;
    background-position: center;
    padding: 72px 0;
    color: var(--color-blanco);
}

.formSectionInner {
    width: 100%;
    padding-left: 11.0625rem;
    padding-right: 11.0625rem;
    display: grid;
    grid-template-columns: 1fr minmax(360px, 520px);
    column-gap: 6.9375rem;
    align-items: center;
}

.formLeft {
    max-width: 540px;
    opacity: 0;
    transform: translateX(-36px);
    transition: opacity 620ms ease, transform 620ms ease;
    will-change: transform, opacity;
}

.formCard {
    opacity: 0;
    transform: translateX(36px);
    transition: opacity 620ms ease, transform 620ms ease;
    will-change: transform, opacity;
}

.formSection--visible .formLeft,
.formSection--visible .formCard {
    opacity: 1;
    transform: translateX(0);
}

.formIcon {
    width: 87px;
    height: 87px;
    border-radius: 999px;
    background: rgba(249, 249, 249, 0.12);
    position: relative;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-amarillo);
}

.formIconSvg {
    display: block;
    width: 36px;
    height: 33px;
}

.formTitle {
    margin: 0 0 18px;
    font-family: var(--font-header);
    font-size: var(--fs-h1);
    line-height: 1.12;
    font-weight: 700;
}

.formSubtitle {
    margin: 0;
    font-size: var(--fs-h6);
    color: rgba(249, 249, 249, 0.82);
    max-width: 560px;
}

.formCard {
    background: var(--color-blanco);
    color: var(--color-azul);
    border-radius: 8px;
}

@media (prefers-reduced-motion: reduce) {

    .formLeft,
    .formCard {
        transition: none;
        transform: none;
        opacity: 1;
    }
}

.formCardInner {
    padding: 34px 34px 30px;
}

.formCardTitle {
    margin: 0 0 18px;
    font-family: var(--font-header);
    font-size: 24px;
    line-height: 1.36;
    font-weight: 600;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.field {
    display: grid;
    gap: 8px;
}

.label {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 1rem;
}

.input {
    height: 44px;
    border-radius: 6px;
    border: none;
    background: var(--color-plomo);
    padding: 0 14px;
    outline: none;
    color: var(--color-azul);
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 600;
}

.input::placeholder {
    color: rgba(9, 22, 41, 0.4);
    font-weight: 400;
}

.select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23091629%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 16px;
    padding-right: 40px;
    
    background-color: var(--color-plomo);
    color: var(--color-azul);
}

.select option {
    background-color: var(--color-blanco);
    color: var(--color-azul);
}

.select:invalid {
    color: rgba(9, 22, 41, 0.4);
    font-weight: 400;
}

.textarea {
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    resize: vertical;
    font-family: var(--font-body);
    font-weight: 400;
}

.submit {
    margin-top: 8px;
    height: 52px;
    border-radius: 8px;
    border: none;
    background: var(--color-azul);
    color: var(--color-blanco);
    font-weight: 700;
    font-size: var(--fs-h6);
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
}

.submit:hover,
.submit:focus-visible {
    background: var(--color-dorado);
    color: var(--color-blanco);
}

.submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.formStatus {
    margin-top: 10px;
    font-size: var(--fs-p);
    color: var(--color-plomoazul);
    text-align: center;
}

.formStatus--error {
    color: var(--color-dorado);
    font-weight: 600;
}

@media (max-width: 820px) {
    .formSection {
        padding: 44px 0;
    }

    .formSectionInner {
        padding-left: 24px;
        padding-right: 24px;
        grid-template-columns: 1fr;
        gap: 28px;
        align-items: start;
    }

    .formTitle {
        font-size: var(--fs-h2);
    }

    .formCardInner {
        padding: 24px;
    }
}
</style>
