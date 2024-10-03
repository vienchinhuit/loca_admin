import { Empty, Popconfirm, Spin, Table, TableColumnsType, TableProps } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ResponseData } from "core/types/utils.type";
import { DataType } from "../type";
import { Loading } from "core/components";
import { iconPng } from "core/constants";

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
  // showUpdate: (idEdit: number, city?: number, district?: number, city_name?: string, district_name?: string, ward_name?: string) => void;
  isLoading: boolean;
  showEdit: (idEdit: number | string) => void
}
export default function TableData({
  dataSource,
  deleteMutation,
  updatePublishMutation,
  selectedRowKeys,
  setSelectedRowKeys,
  isLoading,
  showEdit
}: Props) {
  const columns: TableColumnsType<DataType> = [
    {
      title: `Tiêu đề`,
      dataIndex: "heading",
      width: 220
    },
    {
      title: `Mô tả`,
      dataIndex: "description",
      width: 300,
      render: (_text,record) => (
        <div className="truncate">
          {record.description}
        </div>
      ),
    },
    
    {
      title: "Hiển thị",
      dataIndex: "publish",
      className: "row_content",
      width: 100,
      key: "publish",
      render: (_text,record) => (
        <div className="">
          <input
            checked={record.publish}
            type="checkbox"
            onChange={()=>updatePublishMutation.mutate(record.id)
            }
          />
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      className: "row_content",
      width: 110
    },
    {
      title: "Tính năng",
      dataIndex: "action",
      className: "row_content",
      width: 120,
      fixed: 'right',
      key: "action",
      render: (_text,record) => (
        <div className=" mr-5">
          <button
            onClick={() => showEdit(record.slug)}
            className=" p-2 text-[#30A4EE] hover:text-[#2385C7]"
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
    <div className="w-full mt-3 relative">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 500 }}
          className="min-h-10"
          locale={{
            emptyText: (
              isLoading? 
              <></>
               : <Empty
               image={Empty.PRESENTED_IMAGE_SIMPLE}
               description="Dữ liệu rỗng"
             />
            ),
          }}
        />
        {isLoading && (
        <div className="loading-overlay">
          <Spin indicator={<Loading />}/>
        </div>
      )}
    </div>
  );
}
