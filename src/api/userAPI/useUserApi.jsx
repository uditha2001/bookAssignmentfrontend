import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const useUserApi = () => {
  const axiosPrivate = useAxiosPrivate();

const login = async (userName, password) => {
  const response = await axiosPrivate.post('/authentication', null, {
    params: { userName, password }
  });
  return response;
};




  return { login};
};

export default useUserApi;
