import axios from "axios";

const API_URL = "http://localhost:3000/vendedores";

export async function getVendedores() {
    try {
        const res = await axios.get(API_URL)
        return res.data
    } catch (error) {
        console.error("Ha sucedido un error al conseguir los datos", error)
    }
}

export async function addVendedor(vendedor) {
    try {
        await axios.post(API_URL, vendedor)
    } catch (error) {
        console.error("Ha sucedido un error al añadir los datos", error)
    }
    
}

export async function deleteVendedor(id) {
    try {
        await axios.delete(API_URL + `/${id}`)
    } catch (error) {
        console.error("Ha sucedido un error al eliminar el vendedor", error)
    }
    
}

export async function updateVendedor(id, vendedor) {
    try {
        await axios.put(API_URL + `/${id}`, vendedor)
    } catch (error) {
        console.error("Ha sucedido un error al actualizar el vendedor", error)
    }
}