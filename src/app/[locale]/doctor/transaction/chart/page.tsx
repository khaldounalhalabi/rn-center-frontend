"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ClinicTransactionService } from "@/services/ClinicTransactionService";
import filterDataForChart from "@/hooks/filterDateForChart";
import { ClinicTransaction } from "@/Models/ClinicTransaction";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageCard from "@/components/common/ui/PageCard";
import Grid from "@/components/common/ui/Grid";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import ClinicTransactionDate, {
  DateFilter,
} from "@/enum/ClinicTransactionDate";
import HandleFormatArrayDateFilter from "@/hooks/HandleFormatArrayDateFilter";
import { useTranslations } from "next-intl";

interface ChartData {
  date: string;
  income: number;
  outcome: number;
}

const Page: React.FC = () => {
  const t = useTranslations("common.transaction.chart");
  const [dataRange, setDataRange] = useState([
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  const [showCustomDate, setShowCustomDate] = useState(true);
  const [customDate, setCustomDate] = useState(DateFilter.CUSTOM_DATE);

  const { data, error } = useQuery({
    queryKey: ["ClinicTransaction", dataRange],
    queryFn: async () => {
      try {
        return await ClinicTransactionService.make<ClinicTransactionService>(
          "doctor",
        ).getAll("date", "asc", { date: dataRange });
      } catch (err) {
        console.error("Error fetching transactions:", err);
        return { data: [], error: err };
      }
    },
  });
  const res: ClinicTransaction[] | undefined = data?.data;
  const filterData = res
    ? filterDataForChart(res)
    : { income: [], outcome: [] };

  const chartData: ChartData[] = [];
  const startDate = dayjs(dataRange[0]);
  const endDate = dayjs(dataRange[1]);

  for (
    let d = startDate;
    d.isBefore(endDate) || d.isSame(endDate);
    d = d.add(1, "day")
  ) {
    chartData.push({
      date: d.format("YYYY-MM-DD"),
      income: 0,
      outcome: 0,
    });
  }

  if (filterData.income && filterData.income.length > 0) {
    filterData.income.forEach((entry) => {
      const dataPoint = chartData.find((d) => d.date === entry.date);
      if (dataPoint) {
        dataPoint.income += entry.amount;
      }
    });
  }

  if (filterData.outcome && filterData.outcome.length > 0) {
    filterData.outcome.forEach((entry) => {
      const dataPoint = chartData.find((d) => d.date === entry.date);
      if (dataPoint) {
        dataPoint.outcome += entry.amount;
      }
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <PageCard>
        <div suppressHydrationWarning className={"md:w-1/2"}>
          <h1 className={"card-title"}>{t("filter")} :</h1>
          <div className={"w-full items-center"}>
            <SelectFilter
              data={ClinicTransactionDate()}
              selected={customDate}
              onChange={(event: any) => {
                if (event.target.value == DateFilter.CUSTOM_DATE) {
                  setShowCustomDate(true);
                  setCustomDate(DateFilter.CUSTOM_DATE);
                } else {
                  setCustomDate(event.target.value);
                  setShowCustomDate(false);
                  const date = HandleFormatArrayDateFilter(event.target.value);
                  return setDataRange(date);
                }
              }}
            />
          </div>
          <Grid md={2}>
            {showCustomDate ? (
              <>
                <div>
                  <label className="label">{t("startDate")} :</label>
                  <DatepickerFilter
                    onChange={(time) => {
                      setDataRange([
                        time?.format("YYYY-MM-DD") ?? "",
                        dataRange[1],
                      ]);
                    }}
                    defaultValue={dataRange[0]}
                  />
                </div>
                <div>
                  <label className="label">{t("endDate")} :</label>
                  <DatepickerFilter
                    onChange={(time) => {
                      setDataRange([
                        dataRange[0],
                        time?.format("YYYY-MM-DD") ?? "",
                      ]);
                    }}
                    defaultValue={dataRange[1]}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </Grid>
        </div>

        <h1 className={"card-title"}>{t("chartName")} :</h1>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#007bff" />
            <Line type="monotone" dataKey="outcome" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </PageCard>
    </>
  );
};

export default Page;
