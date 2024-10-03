import { Tabs } from "antd";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";

import Infomation from "./Infomation";
import Social from "./Social";
import GeneralInfo from "./GeneralInfo";
import System from "./System";

export default function Contact() {
  const titlePage = txt.CONTACT_TITLE;
  const optionTab = [
    {
      key: "1",
      label: "Thông tin liên hệ",
      children: (
        <Infomation/>
      ),
    },
    {
      key: "2",
      label: "Liên kết mạng xã hội",
      children: <Social/>,
    },
    {
      key: "3",
      label: "Thông tin chung",
      children: <GeneralInfo/>,
    },
    {
      key: "4",
      label: "Tiêu đề hệ thống",
      children: <System/>,
    },
  ];
  return (
    <div className="py-5">
      <HelmetPage title={`${titlePage}`} content={`Quản lý ${titlePage}`} />
      <Tabs
        // tabBarExtraContent={operations()}
        defaultActiveKey="1"
        items={optionTab}
      />
    </div>
  );
}
