import { useQuery } from "@tanstack/react-query";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import dayjs from "dayjs";
import LoadingSpin from "@/components/icons/LoadingSpin";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartDashboardAdmin = () => {
  const {
    data: earningsRes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ChartAdmin"],
    queryFn: async () => {
      return await AppointmentDeductionsService.make<AppointmentDeductionsService>(
        "admin",
      ).getEarningsByYear();
    },
  });

  const months = Array.from({ length: 12 }, (_, index) =>
    dayjs().month(index).format("YYYY-MM"),
  );

  const completedData = Array.isArray(earningsRes?.data)
    ? earningsRes.data
    : [];

  const data = months.map((month) => ({
    date: dayjs(month).format("MMM"),
    completed: completedData.find((item) => item.date === month)?.earnings || 0,
  }));

  return (
    <>
      <div className="relative w-full h-400">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <LoadingSpin className={"w-8 h-8"} />
          </div>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => tick || ""}
              allowDuplicatedCategory={false}
            />
            <YAxis tickFormatter={(tick) => tick || ""} allowDecimals={true} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="completed"
              name={"Earnings"}
              stroke="#1fb8b9"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1fb8b9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1fb8b9" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartDashboardAdmin;
