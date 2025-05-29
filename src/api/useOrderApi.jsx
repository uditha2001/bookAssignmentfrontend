import useAxiosPrivate from "../hooks/useAxiosPrivate"
const useOrderApi=()=>{
 const axiosPrivate = useAxiosPrivate();
 const submitOrder = async (userId) => {
   const response = await axiosPrivate.post(`/cart/submit/${userId}`);
   return response.data;
 };
 return {
   submitOrder,
 };

}
export default useOrderApi;