import { HttpStatusCode, path, txt } from "../../core/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer, Form } from "antd";
import { useMemo, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import userApi from "./api";
import {
  contactUS,
  ListConfig,
} from "./type";
import { ResponseData } from "core/types/utils.type";
import { formatDate } from "core/utils/utils";
import { toast } from "react-toastify";
import { HelmetPage, Pagination } from "core/components";
import { FormInput, ModalNotification, MultipleAction, Search} from "./components";
import TableData from "./components/TableData";
import { useQueryConfig } from "./hooks/useQueryConfig";



export default function ContactUsList() {
  const routePage = `${path.ROUTE_ADMIN}${path.ROUTE_CONTACT_US}`
  const queryKey = 'contactUs'
  const titlePage = txt.CONTACT_US_TITLE
  const queryConfig = useQueryConfig();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
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
  };

  // Data
  const { data: Data, isLoading, refetch } = useQuery({
    queryKey: [queryKey, queryConfig],
    queryFn: () => {
      return userApi.getAll(
        queryConfig as ListConfig
      );
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const dataList = Data?.data.data;
  console.log(dataList);
  

  const resetQuery = async () => {
    await refetch();
    // Xử lý trường hợp xóa trang cuối
    // Kiểm tra lại dữ liệu sau khi invalidate
    const updatedData = queryClient.getQueryData([
      queryKey,
      queryConfig,
    ]) as { data: ResponseData };
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
        email: item.email,
        phone: item.phone,
        address: item.address,
        content: item.content,
        publish: item.publish === 1 ? true : false,
        created_at: formatDate(item.created_at),
      })) || [],
    [dataList]
  );

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => userApi.delete(id),
    onSuccess: async (res) => {
      await resetQuery();
      toast.success(res.data.message);
    },
    onError: () => {
      toast.error(txt.DELETE_FAILED);
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: (ids: any) => userApi.deleteAll(ids),
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
    mutationFn: (body: any) => userApi.create(body),
  });
  const onFinishCreate = (values: contactUS) => {
    const result = {
      ...values,
      publish: values.publish === undefined ? 1 : values.publish,
    };
    create.mutate(result, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          setOpen(false);
          toast.success(res.data.message);
          resetQuery();
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
        toast.error(txt.CREATE_FAILED);
      },
    });
  };

  // Update
  const update = useMutation({
    mutationFn: (body: any) => userApi.update(id ? id : 0, body),
  });
  const onFinishEdit = (values: contactUS) => {
    console.log(values);
    
    const result = {
      ...values,
      publish: values.publish === undefined ? 1 : values.publish,
    };
    update.mutate(result, {
      onSuccess: (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          setOpen(false);
          toast.success(res.data.message);
          resetQuery();
          setId(undefined);
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
    mutationFn: (id: number) => userApi.updatePublish(id),
    onSuccess: (res) => {
      toast.success(res.data.message);
      resetQuery();
    },
  });
  const updateAllPublishMutation = useMutation({
    mutationFn: (active: number) =>
      userApi.updatePublishAll(selectedRowKeys as any, active),
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
    <div className="pt-5">
      <HelmetPage
        title={titlePage}
        content={`Quản lý ${titlePage}`}
      />
      {/* <Function/> */}
      <div className="py-[15px] bg-[#FFFFFF]">
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
        title={
          id
            ? `Cập nhật`
            : `Thêm`
        }
        onClose={onClose}
        open={open}
      >
        {id ? (
          <FormInput
            form={form}
            onFinish={onFinishEdit}
            id={id}
            onClose={onClose}
          />
        ) : (
          <FormInput form={form} onFinish={onFinishCreate} onClose={onClose} />
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
