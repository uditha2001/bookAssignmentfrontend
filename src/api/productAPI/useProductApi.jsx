import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const useProductApi = () => {
    const axiosPrivate = useAxiosPrivate();
    
    const getAllProducts = async (params) => {
        const response = await axiosPrivate.get("/product/allProducts");
        return response;
    };
    
    const createProduct = async (productData) => {
        const response = await axiosPrivate.post("/product", productData);
        return response;
    };
    const getProductCategory = async () => {
        const response = await axiosPrivate.get(`/product/category`);
        return response;
    };
   const createContent = async (productId, images) => {
    const formData = new FormData();

    images.forEach((image) => {
        formData.append('images', image); // Key must match 'images' in backend
    });

    const response = await axiosPrivate.post(
        `/product/content?productId=${productId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response;
};

    return { getAllProducts, createProduct, getProductCategory,createContent };
    }

export default useProductApi;