import ProductViewComponent from "../components/productViewComponent";
import useProductApi from "../api/productAPI/useProductApi";
import { useState, useEffect } from "react";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { getAllProducts } = useProductApi();
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                if (response.status === 200) {
                    console.log("Products fetched successfully:", response.data);
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
        {successMessage && (
          <div className="mb-4">
            <SuccessMessage
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          </div>
        )}
        {errorMessage && (
          <div className="mb-4">
            <ErrorMessage
              message={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, idx) => (
            <ProductViewComponent
              key={idx}
              {...product}
              setSuccess={setSuccessMessage}
              setError={setErrorMessage}
            />
          ))}
        </div>
      </div>
    );
};

export default HomePage;