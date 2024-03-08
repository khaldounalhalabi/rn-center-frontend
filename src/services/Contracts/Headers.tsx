interface Props {
  [key: string]: string;
}

const HeadersApi = (
  type: string,
  coc?: string,
  Props?: Props,
): Record<string, string> => {
  if (type != "!sing") {
    return {
      Accept: "application/json",
    };
  } else
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      Authorization: `Bearer ${coc}`,
      ...Props,
    };
};

export default HeadersApi;
