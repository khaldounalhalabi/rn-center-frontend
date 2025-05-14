import LoadingSpin from "@/components/icons/LoadingSpin";

const LoadingScreen = () => {
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <LoadingSpin className={"h-10 w-10 text-primary"} />
    </div>
  );
};

export default LoadingScreen;
