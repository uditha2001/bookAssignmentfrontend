import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const useProductApi = () => {
    const axiosPrivate = useAxiosPrivate();
    
    const getAllProducts = async (params) => {
        const response = await axiosPrivate.get("/product/allProducts");
        return response;
    };
    
    const createProduct = async (newProduct) => {
        const response = await axiosPrivate.post("/product", newProduct);
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
const getOwnerProducts = async (userId) => {
    const response = await axiosPrivate.get('/product/ownerProducts', {
        params: { userId }
    });
    return response;
};
const createAttribute = async (productId, productsAtribute) => {
    const response = await axiosPrivate.post(
        '/product/attribute',
        productsAtribute,
        { params: { productId } }
    );
    return response;
};
const getProductById = async (productId) => {
    const response = await axiosPrivate.get("/product/productById", {
      params: { productId },
    });
    return response;
};




    return { 
        getAllProducts, 
        createProduct, 
        getProductCategory,
        createContent, 
        getOwnerProducts, 
        createAttribute,
        getProductById
    };
    }

export default useProductApi;