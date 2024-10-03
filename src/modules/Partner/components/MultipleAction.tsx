import { Select } from "antd";
interface Props {
  selectedRowKeys: React.Key[];
  selectedMultipleAction: (values: any) => void
  option: string
}
const { Option } = Select;
//
export default function MultipleAction({
  selectedRowKeys,
  selectedMultipleAction,
option,
}: Props) {
  return (
    <div className="action-multip w-full text-[13px] bg-[#f5f5f5] py-[12px] px-[10px]">
      <div className="filters">
        <div className="flex text-black items-center w-full">
          <span>Đã chọn {selectedRowKeys.length} trên trang này</span>
          <Select value={option} onChange={selectedMultipleAction} placeholder="Chọn thao tác" className="rounded-lg ml-3 w-[10%]">
            <Option value='option1'>Cập nhật trạng thái</Option>
            <Option value='option2'>Xóa tất cả</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
