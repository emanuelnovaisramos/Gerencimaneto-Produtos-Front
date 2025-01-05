import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config';

const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/produtos`, {
        method: 'GET',
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
};

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(),
    })
};