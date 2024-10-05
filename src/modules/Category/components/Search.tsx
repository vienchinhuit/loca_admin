import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { omit } from "lodash";
import { QueryConfig } from "../hooks/useQueryConfig";
interface Props {
  queryConfig: QueryConfig;
  path: string;
}
export default function Search({ queryConfig, path }: Props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Trạng thái");

  const onFinishFilters = () => {
    let config = queryConfig;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    search !== ""
      ? (config = {
          ...config,
          keyword: search,
        })
      : (config = omit({ ...config }, ["key"]));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedStatus !== "Trạng thái"
      ? (config = {
          ...config,
          publish: selectedStatus,
        })
      : (config = omit({ ...config }, ["publish"]));

    navigate({
      pathname: path,
      search: createSearchParams({
        ...config,
        page: "1",
      }).toString(),
    });
  };
  const onCancelFilters = () => {
    navigate({
      pathname: path,
    });
    setSearch("");
    setSelectedStatus("Trạng thái");
  };
  return (
    <div className="w-full flex text-[13px] px-[8px] border-b border-t border-[#EFEFEF] py-[10px]">
      <div className="tools w-[50%] flex">
        <div className="mt-1 font-medium text-[14px] leading-[30px] uppercase">
          DS danh mục bài viết
        </div>
      </div>
      <div className="filters w-[50%]">
        <div className="flex justify-end">
          <div className="w-[30%]">
            <div className="flex rounded-sm w-full h-full">
              <input
                type="text"
                name="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow bg-transparent px-3 py-1  text-black outline-none rounded-sm border-[1px] border-gray-300 focus:border-blue"
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
          <div className="w-[40%] flex">
            <Select
              className="h-full w-full text-left text-sm capitalize outline-none bg-gray-100 ml-1"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e)}
              options={[
                { value: 1, label: "Đang hiển thị" },
                { value: 0, label: "Đang ẩn" },
              ]}
            />
          </div>
          <div className="flex">
            <button
              onClick={() => onFinishFilters()}
              className="bg-blueDark text-white ml-2 flex-shrink-0 rounded-sm py-1 w-[38px] hover:opacity-70 h-full"
            >
              <i className="fi fi-rr-search"></i>
            </button>
            <button
              onClick={onCancelFilters}
              className="bg-gray-300 ml-[3px] flex-shrink-0 rounded-sm w-[38px] h-full text-center hover:opacity-80"
            >
              <i className="fi fi-rr-refresh"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
