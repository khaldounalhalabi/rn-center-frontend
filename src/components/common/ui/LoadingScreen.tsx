import LoadingSpin from "@/components/icons/LoadingSpin";

const LoadingScreen = () => {
  return (
    <div className={"h-screen w-screen flex items-center justify-center"}>
      <LoadingSpin className={"h-10 w-10 text-brand-primary"}/>
    </div>
  );
};

export default LoadingScreen;
