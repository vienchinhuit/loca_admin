import { Form, Modal, Tabs } from "antd";
import { useState } from "react";
import { FormInput, Notification, SideBar } from "./components";
import { useMutation, useQuery } from "@tanstack/react-query";
import profileApi from "./api";
import { User } from "modules/Users/type";
import { HttpStatusCode, txt } from "core/constants";
import { toast } from "react-toastify";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // const [option, setOption] = useState(1);
  const [option] = useState(1);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // form.resetFields();
  };
  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return profileApi.getProfile();
    },
  });
  const profile = profileData?.data.data;

  const update = useMutation({
    mutationFn: (body: any) => profileApi.update(profile?.id ? profile.id : 0, body),
  });
  const onFinishEdit = (values: User) => {
    update.mutate(values, {
      onSuccess: async (res) => {
        if (res.data.statusCode == HttpStatusCode.Ok) {
          toast.success(res.data.message);
          await refetch()
          handleOk()
          // form.resetFields();
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

  const option1 = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        <Notification
          profile={profile ? profile : undefined}
          showModal={showModal}
        />
      ),
    },
    {
      key: "2",
      label: "Option 2",
      children: <div>Option 1</div>,
    },
  ];
  const option2 = [
    {
      key: "1",
      label: "Thông tin 2",
      children: <div className="leading-10 px-5">aaa</div>,
    },
  ];

  const checkOption = () => {
    switch (option) {
      case 1:
        return option1;
      default:
        return option2;
    }
  };

  return (
    <div className="m-5">
      <div className="my-5 grid grid-cols-1 lg:grid-cols-10 lg:gap-5 items-start">
        <div className="col-span-2 text-[15px] overflow-hidden shadow-md">
          <SideBar
            profile={profile ? profile : undefined}
            option={option}
            // setOption={setOption}
          />
        </div>
        <div className="col-span-8 bg-white rounded-lg">
          <Tabs
            // tabBarExtraContent={operations()}
            defaultActiveKey="1"
            items={checkOption()}
          />
        </div>
      </div>
      <Modal
        key={1}
        title={"Cập nhật thông tin"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="mt-5">
          <FormInput form={form} handleCancel={handleCancel} profile={profile ? profile : undefined} onFinish={onFinishEdit}/>
        </div>
      </Modal>
    </div>
  );
}
