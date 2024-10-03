import { Tabs } from "antd";
import Content from "./Content";
import Item from "./List";
export default function AboutUs() {
  const optionTab = [
    {
      key: "1",
      label: "Nội dung",
        children: <Content/>,
    },
    {
      key: "2",
      label: "Item",
        children: <Item/>,
    },
  ];
  return (
    <Tabs
      // tabBarExtraContent={operations()}
      className="mt-5"
      defaultActiveKey="NEWS"
      items={optionTab}
    />
  );
}
