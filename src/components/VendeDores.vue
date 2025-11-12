<template>
    <div class="container-fluid my-1 p-3 border rounded-3 shadow-sm bg-light">
        <!-- Título principal -->
        <div class="position-relative mb-4">
            <h3 class="text-center m-0">
                <i class="bi bi-person-gear me-2"></i>Lista de Vendedores
            </h3>
            <button type="button"
                class="btn btn-smborder border-primary position-absolute end-0 top-50 translate-middle-y border-2 rounded-0 text-primary shadow-none me-0"
                style="--bs-btn-hover-bg: var(--bs-primary-bg-subtle)" @click="limpiarPagina"
                title="Limpiar formulario">
                <i class="bi bi-arrow-counterclockwise"></i>
            </button>
        </div>

        <!-- Botón para limpiar formulario -->

        <div>
        </div>

        <!-- Formulario para añadir o modificar vendedores -->
        <form @submit.prevent="guardarVendedor" class="mb-4">
            <div class="row g-3 align-items-end mb-3 d-flex justify-content-between me-5 ms-5">
                <!-- Campo de nombre -->
                <div class="col-md-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" @blur="capitalizarTexto('nombre')"
                        v-model="nuevoVendedor.nombre" required />
                </div>

                <!-- Campo de apellidos -->
                <div class="col-md-3 me-5">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="apellidos" v-model="nuevoVendedor.apellidos" required>
                    </input>
                </div>

                <!-- Campo de fecha de entrada -->
                <div class="col-md-2 me-5">
                    <label for="fechaEntrada" class="form-label">Fecha de entrada</label>
                    <input type="date" class="form-control w-auto" id="fechaEntrada"
                        v-model="nuevoVendedor.fechaEntrada" @change="onFechaChangue" required />
                </div>
            </div>
            <div class="row g-3 align-items-end d-flex justify-content-between ms-5 me-4">
                <!-- Campo de genero-->
                <div class="col-md-3">
                    <label>Genero</label>
                    <div class="col-md-3  d-flex gap-4">
                        <div>
                            <label for="genero">Mujer
                                <input type="radio" v-model="nuevoVendedor.genero" class="form-input"
                                    value="Mujer" /></label>
                        </div>
                        <div>
                            <label for="genero">Hombre
                                <input type="radio" v-model="nuevoVendedor.genero" class="form-input"
                                    value="Hombre" /></label>
                        </div>
                        <div>
                            <label for="genero">Otro
                                <input type="radio" v-model="nuevoVendedor.genero" class="form-input"
                                    value="Otro" /></label>
                        </div>
                    </div>
                </div>
                <!-- Concesionario al que pertenece-->
                <div class="col-md-3 ms-5">
                    <label for="concesionario" class="form-label ms-2
                    ">Concesionario </label>
                    <select id="concesionario" v-model="nuevoVendedor.concesionario" class="form-select ms-2
                    " required>
                        <option disabled value="">Selecciona un conesionario</option>
                        <option v-for="concesionario in listaConcesionarios" :key="concesionario"
                            :value="concesionario">
                            {{ concesionario }}
                        </option>
                    </select>
                </div>
                <!-- Antiguedad -->
                <div class="col-md-3 ms-5 me-3 form-check">
                    <div class="ms-1">
                        <label for="antiguedad" class="form-label ms-5">Antigüedad</label>
                    </div>
                    <div class="col-md-3 me-1 ms-5">
                        <input type="checkbox" class="form-check-input align-center ms-1" id="antiguedad"
                            v-model="nuevoVendedor.antiguedad" />
                    </div>
                </div>
                <!-- Botón de acción: Añadir o Modificar -->
                <div class="flex-grow d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" :disabled="botonDeshabilitado">
                        {{ editando ? "Modificar" : "Añadir" }}
                    </button>
                </div>
            </div>
        </form>

        <!-- Tabla que muestra la lista de vendedores cargados -->
        <table class="table table-bordered table-striped table-hover table-sm align-middle table-responsive">
            <thead class="thead-dark table-primary text-center">
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Fecha de entrada</th>
                    <th>Genero</th>
                    <th>Concesionario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="vendedor in vendedores" :key="vendedor.id">
                    <td>{{ vendedor.nombre }}</td>
                    <td>{{ vendedor.apellidos }}</td>
                    <td>{{ formatearFecha(vendedor.fechaEntrada) }}</td>
                    <td>{{ vendedor.genero }}</td>
                    <td>{{ vendedor.concesionario }}</td>
                    <td class="align-middle text-center">
                        <!-- Botón para eliminar un vendedor -->
                        <button class="btn btn-danger btn-sm ms-1 me-2 shadow-none rounded-0"
                            @click="borrarVendedor(vendedor.id)">
                            <i class="bi bi-trash"></i>
                        </button>

                        <!-- Botón para editar un vendedor -->
                        <button class="btn btn-warning btn-sm shadow-none rounded-0"
                            @click="editarVendedor(vendedor.id)">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { addVendedor, deleteVendedor, updateVendedor, getVendedores } from '../api/vendedores';
import Swal from "sweetalert2";

const vendedores = ref([])
const nuevoVendedor = ref({
    nombre: "",
    apellidos: "",
    fechaEntrada: "",
    genero: "",
    concesionario: "",
    antiguedad: false
})
const listaConcesionarios = [
    "IES TEIS Motor - Vigo",
    "IES TEIS Motor - Madrid",
    "IES TEIS Motor - Barcelona",
    "IES TEIS Motor - Bilbao",
    "IES TEIS Motor - Sevilla"
]

const editando = ref(false)
const vendedorEditandoId = ref("")


async function cargarVendedor() {
    try {
        Swal.fire({
            icon: 'success',
            title: "Listando Vendedores...",
            showConfirmButton: false,
            timer: 1500
        });
        vendedores.value = await getVendedores()
    } catch (error) {
        console.error("Error al cargar los vendedores", error)
    }
}

onMounted(async () => {
    await cargarVendedor()
})

async function guardarVendedor() {
    if (!nuevoVendedor.value.nombre.trim() || !nuevoVendedor.value.apellidos.trim() || !nuevoVendedor.value.fechaEntrada.trim()) {
        alert("Rellena todos los campos")
        return
    }

    const result = await Swal.fire({
        title: editando.value
            ? "¿Desea modificar este vendedor?"
            : "¿Desea añadir este vendedor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: editando.value ? "Modificar" : "Grabar",
        cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
        return
    }

    if (editando.value) {
        const index = vendedores.value.findIndex((vendedor) => vendedor.id === vendedorEditandoId.value)
        if (index !== -1) {
            vendedores.value[index] = { ...nuevoVendedor.value }
        }
        try {
            await updateVendedor(vendedorEditandoId.value, nuevoVendedor.value)
            Swal.fire({
                icon: "success",
                title: "Vendedor actualizado",
                showConfirmButton: false,
                timer: 1500,
            });
            limpiarPagina()

        } catch (error) {
            console.error("Ha sucedido un error al actualizar", error)
            Swal.fire({
                icon: "error",
                title: "Error al actualizar vendedor",
                text: "Inténtalo más tarde",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    } else {
        const vendedorNuevo = {
            id: String(vendedores.value.length > 0 ? vendedores.value.length + 1 : 1),
            nombre: nuevoVendedor.value.nombre,
            apellidos: nuevoVendedor.value.apellidos,
            fechaEntrada: nuevoVendedor.value.fechaEntrada,
            genero: nuevoVendedor.value.genero,
            concesionario: nuevoVendedor.value.concesionario,
            antiguedad: nuevoVendedor.value.antiguedad
        }

        try {
            await addVendedor(vendedorNuevo)
            vendedores.value.push(vendedorNuevo)
            Swal.fire({
                icon: "success",
                title: "Vendedor añadido",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al añadir vendedor", error)
            Swal.fire({
                icon: "error",
                title: "Error al añadir vendedor",
                text: "Inténtalo más tarde",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    limpiarPagina()

}
async function borrarVendedor(id) {
    try {
        const result = await Swal.fire({
            title: "¿Está seguro que quiere eliminar este vendedor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        })
        if (!result.isConfirmed) {
            return
        }
        await deleteVendedor(id)
        vendedores.value = vendedores.value.filter((vendedor) => vendedor.id !== id)
        Swal.fire({
            icon: "success",
            title: "Vendedor eliminado",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.error("Error al eliminar vendedor", error)
        Swal.fire({
            icon: "error",
            title: "Error al eliminar vendedor",
            text: "Inténtalo más tarde",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

async function editarVendedor(id) {
    editando.value = true
    nuevoVendedor.value = { ...vendedores.value.find((vendedor) => vendedor.id === id) }
    vendedorEditandoId.value = id
}

function capitalizarTexto(campo) {
    if (nuevoVendedor.value[campo]) {
        nuevoVendedor.value[campo] = nuevoVendedor.value[campo]
            .toLowerCase()
            .split(' ')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }
}

function limpiarPagina() {
    nuevoVendedor.value = {
        nombre: "",
        apellidos: "",
        fechaEntrada: "",
        genero: "",
        concesionario: "",
        antiguedad: false
    };
    editando.value = false;
    vendedorEditandoId.value = "";
}

function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const [year, month, day] = fechaISO.split("-");
    return `${day}-${month}-${year}`;
}



</script>
<style scoped></style>