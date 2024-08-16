const HandleGetUserData = () => {
  if (window) {
    const data = window.localStorage.getItem("user");
    return data ? JSON.parse(data) : undefined;
  } else {
    return { data: "" };
  }
};

export default HandleGetUserData;
