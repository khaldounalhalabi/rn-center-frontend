import { getRole } from "@/actions/HelperActions";
import { Button } from "@/components/ui/shadcn/button";
import { Link } from "@/navigation";
import { ShieldAlert } from "lucide-react";

const Page = async () => {
  const role = await getRole();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <ShieldAlert className="h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            Permission Denied
          </h1>
          <p className="mt-2 text-gray-600">
            You don’t have the required permissions to perform this action.
          </p>
        </div>
        {role && (
          <div className="mt-6">
            <Link href={`/${role}`}>
              <Button type={"button"}>Go to Home Page</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
