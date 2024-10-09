import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer, Form } from "antd";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FormInput, ModalNotification, MultipleAction, Search, TableData } from "./components";
import { ListConfig, WhyChooseType } from "./type";
import { HttpStatusCode, path, txt } from "core/constants";
import { Pagination } from "core/components";
import { formatDate } from "core/utils/utils";
import api from "./api";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ResponseData } from "core/types/utils.type";
import { useQueryConfig } from "./hooks/useQueryConfig";

export default function WhyChoose() {
  const routePage = `${path.ROUTE_ADMIN}${path.ROUTE_WHY_CHOOSE}`;
  // const routeOriginalPage = `${path.ROUTE_ADMIN}${path.ROUTE_WHY_CHOOSE}`;
  const queryKey = "whychoose";
  const queryConfig = useQueryConfig();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();
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
  const showDrawer = (idEdit?: number) => {
    setOpen(true);
    setId(idEdit);
  };
  const onClose = () => {
    setOpen(false);
    setId(undefined);
    form.resetFields();
    setImageUrl("");
  };

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
    await refetch();
    // Xử lý trường hợp xóa trang cuối
    // Kiểm tra lại dữ liệu sau khi invalidate
    const updatedBrandList = queryClient.getQueryData([
      queryKey,
      queryConfig,
    ]) as { data: ResponseData };
    // Điều hướng về trang đầu tiên nếu không còn dữ liệu trên trang hiện tại
    if (
      updatedBrandList.data.statusCode === HttpStatusCode.NotFound &&
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
        des: item.des,
        publish: item.publish === 1 ? true : false,
        thumb: `${import.meta.env.VITE_BASE_URL_IMAGE}/${item.thumb}`,
        created_at: formatDate(item.created_at),
        sort: item.sort,
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

  // Create
  const create = useMutation({
    mutationFn: (body: any) => api.create(body),
  });
  const onFinishCreate = (values: WhyChooseType) => {
    const formData = new FormData();
    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof WhyChooseType)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        value = value !== undefined && value !== null ? value : "";
        formData.append(key as string, value as string | File);
      });
    }
    if (fileImg) {
      formData.append("file", fileImg);
    }

    create.mutate(formData, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          setOpen(false);
          toast.success(res.data.message);
          form.resetFields();
          // resetQuery();
          refetch();
          setFileImg(undefined);
        } else {
          const formError = res.data.errors;
          if (formError) {
            form.setFields([
              {
                name: formError[0].field,
                errors: [formError[0].message], // Gán lỗi cho trường username
              },
            ]);
          }
        }
      },
      onError: () => {
        toast.error(txt.CREATE_FAILED);
      },
    });
  };

  // Update
  const update = useMutation({
    mutationFn: (body: any) => api.update(id ? id : 0, body),
  });
  const onFinishEdit = (values: WhyChooseType) => {
    const formData = new FormData();
    if (values && typeof values === "object") {
      (Object.keys(values) as (keyof WhyChooseType)[]).forEach((key) => {
        let value = values[key];
        if (key === "file") return;
        value = value !== undefined && value !== null ? value : "";
        formData.append(key as string, value as string | File);
      });
    }
    if (fileImg) {
      formData.append("file", fileImg);
    }
    update.mutate(formData, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          setOpen(false);
          toast.success(res.data.message);
          // resetQuery();
          refetch();
          setId(undefined);
          setFileImg(undefined);
          form.resetFields();
        } else {
          const formError = res.data.errors;
          if (formError) {
            form.setFields([
              {
                name: formError[0].field,
                errors: [formError[0].message], // Gán lỗi cho trường username
              },
            ]);
          }
        }
      },
      onError: () => {
        toast.error(txt.UPDATE_FAILED);
      },
    });
  };

  // Update publish
  const updatePublishMutation = useMutation({
    mutationFn: (id: number) => api.updatePublish(id),
    onSuccess: (res) => {
      toast.success(res.data.message);
      resetQuery();
    },
  });

  const updateSort = useMutation({
    mutationFn: ({ id, sort }: { id: number | string; sort: number | string }) =>
      api.updateSort(id, sort),
  });
  const onChangeSort = (id: number, sortValue: number,) => {
    updateSort.mutate({ id, sort: sortValue }, {
      onSuccess: (res) => {
        toast.success(res.data.message)
      }
    });
  };

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

  const [option, setOption] = useState<string>("Chọn thao tác");
  const selectedMultipleAction = (values: any) => {
    setOption(values);
    showModal();
  };

  return (
    <div className="">
      <div className="bg-[#FFFFFF]">
        {selectedRowKeys.length === 0 ? (
          <Search
            queryConfig={queryConfig}
            path={routePage}
            showDrawer={showDrawer}
          />
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
          showDrawer={showDrawer}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          isLoading={isLoading}
          onChangeSort={onChangeSort}
        />

        {Data?.data.pagination && (
          <Pagination
            path={routePage}
            queryConfig={queryConfig}
            pageSize={Data?.data.pagination.totalPage}
          />
        )}
      </div>
      <Drawer
        size="large"
        title={id ? `Cập nhật` : `Thêm`}
        onClose={onClose}
        open={open}
      >
        {id ? (
          <FormInput
            form={form}
            onFinish={onFinishEdit}
            id={id}
            onClose={onClose}
            // fileImg={fileImg}
            imageUrl={imageUrl}
            setFileImg={setFileImg}
            setImageUrl={setImageUrl}
          />
        ) : (
          <FormInput
            form={form}
            onFinish={onFinishCreate}
            onClose={onClose}
            // fileImg={fileImg}
            imageUrl={imageUrl}
            setFileImg={setFileImg}
            setImageUrl={setImageUrl}
          />
        )}
      </Drawer>
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
