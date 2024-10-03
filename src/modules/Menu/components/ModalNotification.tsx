import { UseMutationResult } from "@tanstack/react-query";
import { Modal } from "antd";
import { AxiosResponse } from "axios";
import { ResponseData } from "core/types/utils.type";
interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  option: string;
  selectedRowKeys: React.Key[]
  deleteAllMutation: UseMutationResult<AxiosResponse<ResponseData, any>, Error, any, unknown>
  updateAllPublishMutation: UseMutationResult<AxiosResponse<ResponseData, any>, Error, number, unknown>
}
export default function ModalNotification({
  isModalOpen,
  handleOk,
  handleCancel,
  option,
  selectedRowKeys,
  deleteAllMutation,
  updateAllPublishMutation
}: Props) {
  const checkAction = (optionAction: string) => {
    switch (optionAction) {
      case "option1":
        return (
          <div className="w-full">
            <div className="flex text-right w-full justify-center my-7 ">
              <button
                onClick={() => updateAllPublishMutation.mutate(0)}
                className="px-4 py-1 border-gray-400 border-[1px] rounded-md hover:bg-gray-200"
              >
                Ngưng hoạt động
              </button>
              <button
                onClick={() => updateAllPublishMutation.mutate(1)}
                className="px-4 py-1 ml-3 border-gray-400 border-[1px] rounded-md hover:bg-green-100"
              >
                Đang hoạt động
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full">
            <div className="my-5">
              Thao tác này sẽ xóa {selectedRowKeys.length} dữ liệu. Thao tác này
              không thể khôi phục.
            </div>
            <div className="flex text-right w-full justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-1 border-red-400 border-[1px] rounded-md hover:bg-red-100"
              >
                Thoát
              </button>
              <button
                onClick={() => deleteAllMutation.mutate(selectedRowKeys)}
                className="px-4 py-1 ml-3 bg-red-400 rounded-md text-white hover:opacity-80"
              >
                Xóa
              </button>
            </div>
          </div>
        );
    }
  };
  return (
    <Modal
      title={option === "option1" ? "Cập nhật trạng thái" : "Xóa dữ liệu"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {checkAction(option)}
    </Modal>
  );
}
