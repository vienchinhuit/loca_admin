import { Tabs } from "antd";
import { HelmetPage } from "core/components";
import { txt } from "core/constants";

import Infomation from "./Infomation";
import Social from "./Social";
import GeneralInfo from "./GeneralInfo";

export default function Setting() {
  const titlePage = txt.SETTING_TITLE;
  const optionTab = [
    {
      key: "1",
      label: "Thông tin chung",
      children: (
        <GeneralInfo/>
      ),
    },
    {
      key: "2",
      label: "Thông tin liên hệ",
      children: <Infomation/>,
    },
    {
      key: "3",
      label: "Liên kết mạng xã hội",
      children: <Social/>,
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
