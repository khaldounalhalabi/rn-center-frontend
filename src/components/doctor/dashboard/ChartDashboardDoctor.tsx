import { useQuery } from "@tanstack/react-query";
import { AppointmentService } from "@/services/AppointmentService";
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSpin from "@/components/icons/LoadingSpin";

const ChartDashboardDoctor = () => {

    const { data: groupedByMonth } = useQuery({
        queryKey: ["groupedByMonth"],
        queryFn: async () => {
            return await AppointmentService.make<AppointmentService>("doctor").allGroupedByMonth(dayjs().format("YYYY"));
        }
    });

    const { data: completedByMonth, isLoading, isFetching } = useQuery({
        queryKey: ["completedByMonth"],
        queryFn: async () => {
            return await AppointmentService.make<AppointmentService>("doctor").completedGroupedByMonthCopy(dayjs().format("YYYY"));
        }
    });

    const months = Array.from({ length: 12 }, (_, index) => dayjs().month(index).format("YYYY-MM"));

    const notCompletedData = Array.isArray(groupedByMonth?.data) ? groupedByMonth.data : [];
    const completedData = Array.isArray(completedByMonth?.data) ? completedByMonth.data : [];

    const data = months.map(month => ({
        date: dayjs(month).format("MMM"),
        notCompleted: notCompletedData.find(item => item.date === month)?.appointment_count || 0,
        completed: completedData.find(item => item.date === month)?.appointment_count || 0
    }));

    return (
        <div className="relative w-full h-400">
            {(isLoading || isFetching) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                    <LoadingSpin className={'w-8 h-8'}/>
                </div>
            )}
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(tick) => tick || ""}
                        allowDuplicatedCategory={false}
                    />
                    <YAxis
                        tickFormatter={(tick) => tick || ""}
                        allowDecimals={true}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="notCompleted" name={"Total Appointments"} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="completed" name={"Completed Appointments"} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartDashboardDoctor;