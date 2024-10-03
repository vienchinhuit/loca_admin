import useQueryParam from "core/hooks/useQueryParam";
import { ListConfig } from "../type";
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
export type QueryConfig = {
  [key in keyof ListConfig]: string;
};

export function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParam();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 10,
      key: queryParams.key,
      publish: queryParams.publish,
    },
    isUndefined
  );
  return queryConfig;
}
