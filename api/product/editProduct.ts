import { Product } from "@/types/product"
import { useMutation } from "@tanstack/react-query"
import { API_URL } from "../config"


const editProduct = async (editProduct: Product) => {
    const res = await fetch(`${API_URL}/produtos/${editProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify(editProduct),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}

export const useEditProduct = () => {
    return useMutation({
        mutationFn: (product: Product) => editProduct(product)
    })
}