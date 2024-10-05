import { Tabs } from "antd";
import TitleSystem from "./Title";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";
import { ContactUs } from ".";

export default function MainContactUs() {
  const titlePage = txt.CONTACT_US_TITLE;
  const optionTab = [
      {
        key: "1",
        label: "Danh sách khách hàng liên hệ",
        children: <ContactUs />,
      },
    {
      key: "2",
      label: "Cấu hình",
      children: <TitleSystem />,
    },
  ];
  return (
    <div>
      <HelmetPage title={`${titlePage}`} content={`Quản lý ${titlePage}`} />
      <Tabs defaultActiveKey="1" className="mt-5" items={optionTab} />
    </div>
  );
}
