import ProductViewComponent from "../components/productViewComponent";
import useProductApi from "../api/productAPI/useProductApi";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { getAllProducts } = useProductApi();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                if (response.status === 200) {
                    setProducts(response.data);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-2">
            <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, idx) => (
                    <ProductViewComponent key={idx} {...product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;