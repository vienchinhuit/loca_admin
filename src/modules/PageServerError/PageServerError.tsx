import { useNavigate } from "react-router-dom";
import ServerError from "../../assets/images/ServerError.jpg";
export default function PageServerError() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex-col justify-center">
      <img src={ServerError} alt="" className="mx-auto mt-12 w-[600px]" />
      <div className="flex justify-center">
        <button onClick={()=>navigate(-1)} className="bg-blue px-7 py-2 font-bold text-white rounded-lg">
          Trở về trang trước đó
        </button>
      </div>
    </div>
  );
}
