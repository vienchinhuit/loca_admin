import {
  Empty,
  Popconfirm,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { iconPng } from "core/constants";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ResponseData } from "core/types/utils.type";
import { DataType } from "../type";
import { Loading } from "core/components";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
interface Props {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;

  dataSource: DataType[];
  deleteMutation: UseMutationResult<
    AxiosResponse<ResponseData, any>,
    Error,
    string | number,
    unknown
  >;
  updatePublishMutation: UseMutationResult<
    AxiosResponse<ResponseData, any>,
    Error,
    number,
    unknown
  >;
  showDrawer: (idEdit?: number) => void;
  isLoading: boolean;
}
export default function TableData({
  dataSource,
  deleteMutation,
  updatePublishMutation,
  showDrawer,
  selectedRowKeys,
  setSelectedRowKeys,
  isLoading,
}: Props) {
  const columns: TableColumnsType<DataType> = [
    {
      title: `Ảnh`,
      dataIndex: "image",
      width: 150,
      className: "row_content",
      render: (_text, record) => (
        <img className="w-20 object-fit mx-auto" src={record.thumb} alt="" />
      ),
    },
    {
      title: `Tiêu đề`,
      dataIndex: "name",
      width: 200,
    },
    {
      title: `Nội dung`,
      dataIndex: "des",
      width: 700,
    },
    {
      title: `Ngày tạo`,
      dataIndex: "created_at",
      className: "row_content",
    },
    {
      title: "Kích hoạt",
      dataIndex: "publish",
      className: "row_content",
      key: "publish",
      render: (_text, record) => (
        <div className="">
          <input
            checked={record.publish}
            type="checkbox"
            onChange={() => updatePublishMutation.mutate(record.id)}
          />
        </div>
      ),
    },
    {
      title: "Tính năng",
      dataIndex: "action",
      className: "row_content",
      key: "action",
      render: (_text, record) => (
        <div className=" mr-5">
          <button
            onClick={() => showDrawer(record.id)}
            className="p-2 text-[#30A4EE] hover:text-[#2385C7]"
          >
            <img src={iconPng.icEdit} width={16} />
          </button>
          <Popconfirm
            title="Xóa"
            description="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <button className="p-2 text-[#F00] hover:text-[#8E0002]">
              <img src={iconPng.icTrash} width={16} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className="table w-full mt-3 relative">
      <Table
        rowSelection={rowSelection}
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        className="min-h-10"
        locale={{
          emptyText: isLoading ? (
            <></>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Dữ liệu rỗng"
            />
          ),
        }}
      />
      {isLoading && (
        <div className="loading-overlay">
          <Spin indicator={<Loading />} />
        </div>
      )}
    </div>
  );
}
