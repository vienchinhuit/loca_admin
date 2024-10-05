import { Menu } from "antd";
import { path } from "core/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo/logo.png";
// icon
import { iconPng } from "../constants";

const items = [
  {
    key: "home",
    icon: <img src={iconPng.icHome} width={22} />,
    label: "Trang chủ",
    // path: `${path.ROUTE_ADMIN}${path.ROUTE_BANNER}`,
    children: [
      {
        key: "banner",
        label: "- Banner quảng cáo",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_BANNER}`,
      },
      {
        key: "introduce",
        label: "- Giới thiệu",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_INTRODUCE}`,
      },
      {
        key: "driver",
        label: "- Giới thiệu (2)",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_DRIVER}`,
      },
      {
        key: "branch",
        label: "- Hệ thống phân phối",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_BRANCH}`,
      },
      {
        key: "whyChoose",
        label: "- Vì sao nên chọn",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_WHY_CHOOSE}`,
      },
      {
        key: "partner",
        label: "- Đối tác & Khách hàng",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_PARTNER}`,
      },
    ],
  },
  {
    key: "aboutUs",
    icon: <img src={iconPng.icAccount} width={22} />,
    label: "Về chúng tôi",
    path: `${path.ROUTE_ADMIN}${path.ROUTE_ABOUT_US}`,
  },
  {
    key: "menu",
    icon: <img src={iconPng.icMenu} width={22} />,
    label: "Quản lý menu",
    path: `${path.ROUTE_ADMIN}${path.ROUTE_MENU}`,
  },
  {
    key: "product",
    icon: <img src={iconPng.icProduct} width={22} />,
    label: "Sản phẩm",
    path: `${path.ROUTE_ADMIN}${path.ROUTE_PRODUCT}`,
  },
  {
    key: "news",
    icon: <img src={iconPng.icNews} width={22} />,
    label: "Bài viết",
    // path: `${path.ROUTE_ADMIN}${path.ROUTE_SW}`,
    children: [
      {
        key: "cate_news",
        label: "- Danh mục bài viết",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_CATEGORY}`,
      },
      {
        key: "news_list",
        label: "- Danh sách bài viết",
        path: `${path.ROUTE_ADMIN}${path.ROUTE_NEWS}`,
      },
    ],
  },
  {
    key: "contactUs",
    icon: <img src={iconPng.icCustomer} width={21} />,
    label: "Khách hàng liên hệ",
    path: `${path.ROUTE_ADMIN}${path.ROUTE_CONTACT_US}`,
  },
  {
    key: "setting",
    icon: <img src={iconPng.icSettings} width={21} />,
    label: "Cấu hình",
    path: `${path.ROUTE_ADMIN}${path.ROUTE_SETTING}`,
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ collapsed, setCollapsed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    let foundKey = "";
    let parentKey = "";

    items.forEach((item: any) => {
      // Kiểm tra nếu currentPath là đường dẫn chính của mục cha
      if (item.path === currentPath) {
        foundKey = item.key;
      }
      // Kiểm tra subPaths của mục cha
      else if (item.subPaths && item.subPaths.includes(currentPath)) {
        foundKey = item.key;
      } else if (item.children) {
        // Lặp qua từng mục con (children)
        item.children.forEach((child: any) => {
          // Kiểm tra nếu currentPath là đường dẫn chính hoặc subPaths của mục con
          if (
            child.path === currentPath ||
            (child.subPaths && child.subPaths.includes(currentPath))
          ) {
            foundKey = child.key;
            parentKey = item.key; // Lưu key của mục cha
          }
        });
      }
    });

    setSelectedKey(foundKey);
    setOpenKeys(parentKey ? [parentKey] : []);
  }, [location.pathname]);

  const handleMenuClick = ({ key }: any) => {
    let clickedPath = "";

    items.forEach((item: any) => {
      if (item.key === key) {
        clickedPath = item.path || "";
      } else if (item.children) {
        const childItem = item.children.find((child: any) => child.key === key);
        if (childItem) {
          clickedPath = childItem.path;
        }
      }
    });

    if (clickedPath) {
      setSelectedKey(key);
      navigate(clickedPath);
    }
  };

  const cleanedItems = items.map((item: any) => {
    if (item.children) {
      return {
        ...item,
        children: item.children.map((child: any) => {
          // Kiểm tra xem subPaths có tồn tại trong child không
          if ("subPaths" in child) {
            const { subPaths, ...restChild } = child; // Loại bỏ subPaths
            return restChild;
          }
          return child; // Nếu không có subPaths, trả về child như cũ
        }),
      };
    }
    if ("subPaths" in item) {
      const { subPaths, ...restItem } = item; // Loại bỏ subPaths ở cấp item
      return restItem;
    }
    return item; // Trả về item nếu không có subPaths
  });

  const handleOpenChange = (keys: any) => {
    setOpenKeys(keys);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <nav className="transition">
      <div className="no-scrollbar top-0 sticky">
        <div className="flex h-[50px] pt-[10px] pb-[10px] justify-center items-center border-b border-[#f5f5f5]">
          <button
            onClick={toggleCollapsed}
            className="fixed top-[5px] left-[18px] flex justify-center items-center hover:bg-[#ddd] w-[40px] h-[40px] rounded-[50px]"
          >
            <img src={iconPng.icMenu} width={24} />
          </button>
          {collapsed ? <></> : <img src={Logo} width={80} />}
        </div>
        <div className="w-[100%] custom-scroll h-full ">
          <Menu
            onClick={handleMenuClick}
            theme="light"
            inlineCollapsed={collapsed}
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            items={cleanedItems}
            className=""
          />
        </div>
      </div>
    </nav>
  );
}
