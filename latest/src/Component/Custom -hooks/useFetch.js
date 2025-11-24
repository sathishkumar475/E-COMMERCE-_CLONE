import { useEffect, useState } from "react";
import axios from "axios";
function useFetch(url) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { products, error, isloading, setProducts };
}
export default useFetch;
