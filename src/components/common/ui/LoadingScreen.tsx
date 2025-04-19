import LoadingSpin from "@/components/icons/LoadingSpin";

const LoadingScreen = () => {
  return (
    <div className={"h-screen w-screen flex items-center justify-center"}>
      <LoadingSpin />
    </div>
  );
};

export default LoadingScreen;
