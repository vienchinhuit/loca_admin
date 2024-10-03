import { useNavigate } from "react-router-dom";

interface Props {
  // handleExportExcel: () => Promise<void>;
  // setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  pathCreate: string
}
export default function Function({ 
  // handleExportExcel, 
  pathCreate }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-[15px] justify-between flex py-2">
      <div className="flex">
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center font-medium hover:text-blue"
        >
          <i className="fi fi-rr-download"></i>
          <span className="ml-2">Nhập dữ liệu</span>
        </button>
        <button
          // onClick={() => handleExportExcel()}
          className="flex items-center font-medium ml-5 hover:text-blue"
        >
          <i className="fi fi-rr-upload"></i>
          <span className="ml-2">Xuất dữ liệu</span>
        </button>
        <button
          onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_BRAND}`)}
          className="flex items-center font-medium ml-5 hover:text-blue"
        >
          <span>Nhãn hiệu</span>
        </button>
        <button
          onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_PRODUCT_TYPE}`)}
          className="flex items-center font-medium ml-5 hover:text-blue"
        >
          <span>Loại sản phẩm</span>
        </button>
        <button
          onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_PRODUCT_UNIT}`)}
          className="flex items-center font-medium ml-5 hover:text-blue"
        >
          <span>Đơn vị</span>
        </button> */}
      </div>
      <button
          onClick={() => navigate(pathCreate)}
          className="flex items-center ml-3 px-[15px] text-[12px] rounded-[3px] border text-[#ffffff] border-[#EFEFEF] bg-[#1677ff] hover:border-[#1677ff] hover:bg-[#ffffff] hover:text-[#1677ff]"
        >
          <i className="fi fi-rr-plus"></i>
          <span className="ml-[6px] font-bold py-3">Thêm</span>
        </button>
    </div>
  );
}
