import { Form, Modal, Popover } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import authApi from "modules/Auth/api";
import { useContext, useState } from "react";
import { AppContext } from "core/contexts/app.context";
import { toast } from "react-toastify";
// import { BellOutlined } from "@ant-design/icons";
// import { path } from "core/constants";
import ImageDefault from "../ImageDefault";
import { ChangePassword } from "modules/Auth";
import profileApi from "modules/Profile/api";

export default function Header() {
  // const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const logoutAuthMutation = useMutation({
    mutationFn: () => authApi.logout(),
  });

  const logout = () => {
    logoutAuthMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Đăng xuất thành công!");
        setIsAuthenticated(false);
      },
      onError: () => {
        toast.error("Đăng xuất thất bại!");
      },
    });
  };

  const content = (
    <div className="w-56 ">
      {/* <button
        onClick={() => navigate(`${path.ROUTE_ADMIN}${path.ROUTE_PROFILE}`)}
        className="w-full"
      >
        <div className="relative text-left w-full hover:bg-lightBlue py-2 px-5 rounded-md">
          Thông tin tài khoản
        </div>
      </button> */}
      <button onClick={showModal} className="w-full">
        <div className="relative text-left w-full hover:bg-lightBlue py-2 px-5 rounded-md">
          Đổi mật khẩu
        </div>
      </button>
      <button onClick={logout} className="w-full">
        <div className="relative text-left w-full hover:bg-lightBlue py-2 px-5 rounded-md">
          Đăng xuất
        </div>
      </button>
    </div>
  );

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return profileApi.getProfile();
    },
  });
  const profile = profileData?.data.data;

  // useEffect(() => {
  //   queryClient.setQueryData(["profile"], profileData);
  // }, [profileData, queryClient]);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div className="z-20 header py-2 px-7 bg-white flex top-0 h-[48px] items-center justify-between border-b border-[#EFEFEF]">
      <div className="font-bold"></div>
      <div className="flex my-2">
        <div className="">
          <Popover
            placement="bottomRight"
            arrow={false}
            // title={'Cá nhân'}
            content={content}
            // arrow={mergedArrow}
            trigger="click"
            open={open}
            onOpenChange={handleOpen}
            className="z-50"
          >
            <button>
              <div className="flex justify-center items-center">
                <div className="w-8 h-8">
                  <ImageDefault name={"B"} />
                </div>
                <div className="mx-3">{profile?.name}</div>
                {open ? (
                  <i className="fi fi-rr-caret-up text-[18px] pb-1 ml-5 text-blue"></i>
                ) : (
                  <i className="fi fi-rr-caret-down text-[18px] pb-1 ml-5"></i>
                )}
              </div>
            </button>
          </Popover>
        </div>
      </div>
      <Modal
        key={1}
        title="Đổi mật khẩu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="mt-5">
          <ChangePassword form={form} handleCancel={handleCancel} />
        </div>
      </Modal>
    </div>
  );
}
