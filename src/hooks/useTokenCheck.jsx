import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useTokenCheck() {
  const navigate = useNavigate();
  const token = Cookies.get("access_token");
  useEffect(() => {
    if (!token) {
      toast.error("Sesi Kadaluarsa");
      navigate("/login", {
        replace: true,
      });
    }
  }, []);
}
