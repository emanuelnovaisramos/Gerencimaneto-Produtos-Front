import { useMutation } from "@tanstack/react-query"
import { API_URL } from "./config"


const deleteProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
    })
    console.log(res)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: (id: string) => deleteProduct(id)
    })
}