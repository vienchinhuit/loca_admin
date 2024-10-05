// import { path } from "core/constants";
import { useNavigate } from "react-router-dom";

interface Props {
  // handleExportExcel: () => Promise<void>;
  // setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  pathCreate: string
}
export default function Function({ 
  // handleExportExcel, 
  // setIsModalOpen, 
  pathCreate }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-[15px] justify-between flex py-2">
      <div className="flex">
      </div>
      <button
          onClick={() => navigate(pathCreate)}
          className="flex items-center ml-3 px-[15px] text-[12px] rounded-[3px] border text-[#ffffff] border-[#EFEFEF] bg-green hover:border-green hover:bg-[#ffffff] hover:text-green"
        >
          <i className="fi fi-rr-plus"></i>
          <span className="ml-[6px] font-bold py-3">Thêm</span>
        </button>
    </div>
  );
}
