import classNames from "classnames";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useState } from "react";

interface Props {
  queryConfig: any;
  pageSize: number;
  path: string;
}
const RANGE = 2;
export default function Pagination({ queryConfig, pageSize, path }: Props) {
  const navigate = useNavigate();
  const page = Number(queryConfig.page);
  const [limit, setLimit] = useState(queryConfig.limit);
  const onChangeLimit = async (e: any) => {
    setLimit(e);
    await navigate({
      pathname: path,
      search: createSearchParams({
        ...queryConfig,
        limit: e,
      }).toString(),
    });
  };
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="mx-2 rounded bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="mx-2 rounded bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        // Điều kiện để return về ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              "mx-2 cursor-pointer rounded border bg-white hover:bg-slate-200 shadow-sm px-3 h-9 flex justify-center items-center",
              {
                "border-cyan-500": pageNumber === page,
                "": pageNumber !== page,
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="__paging py-[10px] flex flex-wrap justify-end border-b border-[#EFEFEF]">
      <span className="leading-[30px]">Số hàng trên mỗi trang:</span>
      <div className="w-[5%] mr-[20px]">
        <Select
          className="h-[30px] w-full text-left text-sm capitalize outline-none bg-gray-100 ml-1 rounded"
          value={limit}
          onChange={(e) => onChangeLimit(e)}
          options={[
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
      </div>
      {page === 1 ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 h-9 flex justify-center py-2 shadow-sm">
          <i className="fi fi-rr-angle-left"></i>
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 h-9 flex justify-center py-2 shadow-sm"
        >
          <i className="fi fi-rr-angle-left"></i>
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm">
          <i className="fi fi-rr-angle-right"></i>
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 h-9 flex justify-center py-2 shadow-sm"
        >
          <i className="fi fi-rr-angle-right"></i>
        </Link>
      )}
    </div>
  );
}
