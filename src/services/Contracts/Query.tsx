import { dehydrate, QueryClient } from "react-query";
import QueryFetch from "@/Http/QueryFetch";
import HeadersApi from "@/services/Contracts/Headers";

const Query = async (
  nameQuery: string,
  method: string,
  url: string,
  type: string,
  coc?: string,
  data?: object,
  props?: any,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(nameQuery, () => {
    const head: object = HeadersApi(coc, type, ...props);
    return QueryFetch(method, url, data, head);
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Query;
