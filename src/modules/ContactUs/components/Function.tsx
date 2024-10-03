import { path } from "core/constants";
import { useNavigate } from "react-router-dom";
export default function Function() {
  const navigate = useNavigate();
  return (
    <div className="px-[15px] justify-between flex pt-4">
      <div className="flex">
        <button
          onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_ROLE}`)}
          className="flex items-center font-medium hover:text-blue"
        >
          <span>Quyền / Vai Trò</span>
        </button>
      </div>
    </div>
  );
}
