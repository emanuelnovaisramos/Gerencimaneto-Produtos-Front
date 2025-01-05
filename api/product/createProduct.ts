import { Product } from "@/types/product"
import { useMutation } from "@tanstack/react-query"
import { API_URL } from "../config"


const createProduct = async (newProduct: Product) => {
    const res = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        body: JSON.stringify(newProduct),
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

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (product: Product) => createProduct(product)
    })
}