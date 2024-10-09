import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "core/components";
import React, { useMemo, useState } from "react";
import {
  Function,
  ModalNotification,
  MultipleAction,
  Search,
} from "./components";
import TableData from "./components/TableData";
import api from "./api";
import { toast } from "react-toastify";
import { HttpStatusCode, path, txt } from "core/constants";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ResponseData } from "core/types/utils.type";
import { ListConfig } from "./type";
import { useQueryConfig } from "./hooks/useQueryConfig";
import { formatDate } from "core/utils/utils";

export default function News() {
  const routePage = `${path.ROUTE_ADMIN}${path.ROUTE_NEWS}`;
  const queryKey = "news";
  const navigate = useNavigate();
  const queryConfig = useQueryConfig();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOption("Chọn thao tác");
  };
  // const getByIdMutation = useMutation({
  //   mutationFn: (id: any) => api.getById(id),
  // });
  // Data
  const {
    data: Data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKey, queryConfig],
    queryFn: () => {
      return api.getAll(queryConfig as ListConfig);
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const dataList = Data?.data.data;

  const resetQuery = async () => {
    // Invalidate the query to refresh the data
    await refetch();
    // Xử lý trường hợp xóa trang cuối
    // Kiểm tra lại dữ liệu sau khi invalidate
    const updatedData = queryClient.getQueryData([queryKey, queryConfig]) as {
      data: ResponseData;
    };
    // Điều hướng về trang đầu tiên nếu không còn dữ liệu trên trang hiện tại
    if (
      updatedData.data.statusCode === HttpStatusCode.NotFound &&
      queryConfig.page !== "1"
    ) {
      navigate({
        pathname: routePage,
        search: createSearchParams({
          ...queryConfig,
          page: "1",
        }).toString(),
      });
    }
  };

  const dataSource = useMemo(
    () =>
      dataList?.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
        description: item.description,
        image_url: item.image_url,
        publish: item.publish === 1 ? true : false,
        created_at: formatDate(item.created_at),
        slug: item.slug,
      })) || [],
    [dataList]
  );

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => api.delete(id),
    onSuccess: async (res) => {
      await resetQuery();
      toast.success(res.data.message);
    },
    onError: () => {
      toast.error(txt.DELETE_FAILED);
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: (ids: any) => api.deleteAll(ids),
    onSuccess: async (res) => {
      await resetQuery();
      handleCancel();
      setSelectedRowKeys([]);
      toast.success(res.data.message);
    },
    onError: () => {
      toast.error(txt.DELETE_FAILED);
    },
  });

  const updateAllPublishMutation = useMutation({
    mutationFn: (publish: number) =>
      api.updatePublishAll(selectedRowKeys as any, publish),
    onSuccess: (res) => {
      toast.success(res.data.message);
      handleCancel();
      setSelectedRowKeys([]);
      resetQuery();
    },
  });

  // Update publish
  const updatePublishMutation = useMutation({
    mutationFn: (id: number) => api.updatePublish(id),
    onSuccess: (res) => {
      toast.success(res.data.message);
      resetQuery();
    },
  });

  //Nhiều Item
  const [option, setOption] = useState<string>("Chọn thao tác");
  const selectedMultipleAction = (values: any) => {
    setOption(values);
    showModal();
  };

  const showEdit = async (idEdit: number | string) => {
    navigate(`${path.ROUTE_ADMIN}${path.ROUTE_NEWS_UPDATE}/${idEdit}`);
  };

  return (
    <div className="">
      {/* {getDataMutationExport.isPending ? <LoadingPage /> : <></>} */}
      <Function
        // handleExportExcel={handleExportExcel}
        // setIsModalOpen={setIsModalOpen}
        pathCreate={`${path.ROUTE_ADMIN}${path.ROUTE_NEWS_CREATE}`}
      />
      <div className="pb-[15px] bg-[#FFFFFF] ">
        {selectedRowKeys.length === 0 ? (
          <Search queryConfig={queryConfig} path={routePage} />
        ) : (
          <MultipleAction
            selectedRowKeys={selectedRowKeys}
            selectedMultipleAction={selectedMultipleAction}
            option={option}
          />
        )}
        <TableData
          dataSource={dataSource}
          deleteMutation={deleteMutation}
          updatePublishMutation={updatePublishMutation}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          isLoading={isLoading}
          showEdit={showEdit}
        />
        {Data?.data.pagination && (
          <Pagination
            path={routePage}
            queryConfig={queryConfig}
            pageSize={Data?.data.pagination.totalPage}
          />
        )}
      </div>
      <ModalNotification
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        option={option}
        selectedRowKeys={selectedRowKeys}
        updateAllPublishMutation={updateAllPublishMutation}
        deleteAllMutation={deleteAllMutation}
      />
    </div>
  );
}
