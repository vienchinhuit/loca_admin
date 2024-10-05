import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { AxiosResponse } from "axios";
import {
  ErrorExcel,
  ResponseData,
  ResponseValidator,
} from "core/types/utils.type";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import { toast } from "react-toastify";
import productApi from "../api";
import { HttpStatusCode } from "core/constants";
import { Loading } from "core/components";
import classNames from "classnames";
interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  option: string;
  selectedRowKeys: React.Key[];
  deleteAllMutation: UseMutationResult<
    AxiosResponse<ResponseData, any>,
    Error,
    any,
    unknown
  >;
  updateAllPublishMutation: UseMutationResult<
    AxiosResponse<ResponseData, any>,
    Error,
    number,
    unknown
  >;
}
export default function ModalNotification({
  isModalOpen,
  handleOk,
  handleCancel,
  option,
  selectedRowKeys,
  deleteAllMutation,
  updateAllPublishMutation,
}: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<RcFile | null>(null);
  const [errorArrExcel, setErrorArrExcel] = useState<ErrorExcel[]>([]);
  const [message, setMessage] = useState<{
    total: number;
    successTotal: number;
    failedTotal: number;
  }>({ total: 0, successTotal: 0, failedTotal: 0 });

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
                Đang ẩn
              </button>
              <button
                onClick={() => updateAllPublishMutation.mutate(1)}
                className="px-4 py-1 ml-3 border-gray-400 border-[1px] rounded-md hover:bg-green-100"
              >
                Đang hiển thị
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
            <div className="flex items-center justify-center text-center">
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

  const handleBeforeUpload = (file: RcFile) => {
    const isXlsx =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXlsx) {
      toast.error("You can only upload XLSX files!");
    }
    return isXlsx;
  };

  const handleChange = (info: { file: RcFile }) => {
    setFile(info.file);
    setFileName(info.file.name);
  };

  const importExcelMutation = useMutation({
    mutationFn: (file: any) => productApi.importExcel(file),
  });

  const [notification, setNotification] = useState<string>("");
  const [notificationError, setNotificationError] = useState<string>("");

  const importFileExcel = async () => {
    setNotificationError("");
    setMessage({ total: 0, successTotal: 0, failedTotal: 0 });
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    importExcelMutation.mutate(formData, {
      onSuccess: (res) => {
        setErrorArrExcel([]);
        const response = res.data;
        if (response.statusCode === HttpStatusCode.Ok) {
          setFileName("Kéo thả file vào đây hoặc tải lên từ thiết bị");
          setFile(null);
          setNotification(response.message);
          setMessage({
            total: response.total,
            successTotal: response.successTotal,
            failedTotal: response.failedTotal,
          });
          const errors = response.errors as ErrorExcel[];
          setErrorArrExcel(
            errors.map((err: ErrorExcel) => ({
              STT: err.STT, // Lấy giá trị STT từ lỗi
              Msg: err.Msg, // Lấy giá trị Msg từ lỗi
            }))
          );
        } else {
          const errors = response.errors as ResponseValidator[];
          setNotificationError(errors[0].message);
        }
      },
      onError: () => {
        toast.error("Thất bại");
      },
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = import.meta.env.VITE_BASE_URL_EXCEL_SAMPLE_PRODUCT; // Đường dẫn tới file Excel trong thư mục public
    link.download = "file_mau.xlsx"; // Tên file khi tải về
    link.click();
  };

  const handleCancelImport = () => {
    handleCancel();
    setMessage({ total: 0, successTotal: 0, failedTotal: 0 });
    setFile(null);
    setFileName("Kéo thả file vào đây hoặc tải lên từ thiết bị");
    setNotificationError("");
    setNotification("");
    setErrorArrExcel([]);
  };

  const modalImport = () => {
    return (
      <>
        <div className="my-5 text-[14px]">
          <p>
            - Tải file mẫu{" "}
            <span className="cursor-pointer text-blue" onClick={handleDownload}>
              tại đây
            </span>
            .
          </p>
        </div>
        <Dragger
          customRequest={({ file }) => handleChange({ file: file as RcFile })}
          beforeUpload={handleBeforeUpload}
          showUploadList={false}
          multiple={false}
          accept=".xlsx"
          className="mb-3"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text text-gray-400">
            {fileName
              ? fileName
              : "Kéo thả file vào đây hoặc tải lên từ thiết bị"}
          </p>
        </Dragger>
        <div className="no-scrollbar">
          <div
            className={classNames(
              "overflow-auto custom-scroll-notification pr-2 my-2",
              {
                "h-[300px]": errorArrExcel.length !== 0,
                "": errorArrExcel.length === 0,
              }
            )}
          >
            {notificationError !== "" ? (
              <div className="text-red-600 my-3 w-full bg-red-200 rounded-md flex px-5 py-3">
                {notificationError}
              </div>
            ) : importExcelMutation.isPending ? (
              <div className="flex-col items-center justify-center text-center">
                <Loading />
                <div>Đang nhập dữ liệu vui lòng chờ ...</div>
              </div>
            ) : notification !== "" ? (
              <>
                <div className="text-black my-3">{notification}</div>
                <div className="text-green-700 my-3 w-full bg-green-200 rounded-md flex px-5 py-3">
                  Dòng thêm thành công: {message.successTotal}
                </div>
                <div className="text-red-600 my-3 w-full bg-red-200 rounded-md flex px-5 py-3">
                  Số dòng thất bại: {message.failedTotal}
                </div>
                {errorArrExcel.map((error) => (
                  <div className="text-red-600 my-3 w-full bg-red-200 rounded-md flex px-5 py-3">
                    STT {error.STT}: {error.Msg}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="sticky flex bottom-0">
          <button
            onClick={handleCancelImport}
            className="ml-[63%] border-blue border-[1px] mr-3 w-24 px-2 py-1 text-gray-700 mt-4 rounded-md hover:bg-gray-100"
          >
            Thoát
          </button>
          <button
            disabled={importExcelMutation.isPending ? true : false}
            onClick={importFileExcel}
            className="bg-blue w-24 px-2 py-1 text-white mt-4 rounded-md hover:bg-blue/90"
          >
            Nhập file
          </button>
        </div>
      </>
    );
  };
  return (
    <Modal
      title={
        selectedRowKeys.length === 0
          ? "Nhập file"
          : option === "option1"
          ? "Cập nhật trạng thái"
          : "Xóa dữ liệu"
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      height="500px"
    >
      {selectedRowKeys.length === 0 ? modalImport() : checkAction(option)}
    </Modal>
  );
}
