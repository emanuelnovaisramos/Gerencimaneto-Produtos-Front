import { useMutation } from "@tanstack/react-query"
import { API_URL } from "../config"


const deleteProduct = async (id: number) => {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id)
    })
}