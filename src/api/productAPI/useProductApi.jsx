import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const useProductApi = () => {
    const axiosPrivate = useAxiosPrivate();
    
    const getAllProducts = async (params) => {
        const response = await axiosPrivate.get("/product/allProducts");
        return response;
    };
    
    const getProductById = async (id) => {
        try {
        const response = await axiosPrivate.get(`/products/${id}`);
        return response.data;
        } catch (error) {
        throw error;
        }
    };
    
    return { getAllProducts, getProductById };
    }

export default useProductApi;