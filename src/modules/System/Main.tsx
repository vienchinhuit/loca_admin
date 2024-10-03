import { Tabs } from 'antd'
import System from './List';
import TitleSystem from './Title';

export default function MainSystem() {
    const optionTab = [
        {
          key: "1",
          label: "Tiêu đề hệ thống",
          children: (
            <TitleSystem/>
          ),
        },
        {
          key: "2",
          label: "Danh sách hệ thống",
          children: <System/>
        },
      ];
  return (
    <div>
      <Tabs
        // tabBarExtraContent={operations()}
        defaultActiveKey="1"
        items={optionTab}
      />
    </div>
  )
}
