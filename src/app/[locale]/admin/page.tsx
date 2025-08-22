"use client";
import BalanceIcon from "@/components/icons/BalanceIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { ChartContainer } from "@/components/ui/shadcn/chart";
import { RoleEnum } from "@/enums/RoleEnum";
import { TransactionService } from "@/services/TransactionService";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Page = () => {
  const role = RoleEnum.ADMIN;
  const t = useTranslations("dashboard");

  // Parallel queries for better performance
  const results = useQueries({
    queries: [
      {
        queryKey: ["balance"],
        queryFn: () => TransactionService.make(role).balance(),
        select: (data: any) => data.data.balance,
      },
      {
        queryKey: ["balance_trend"],
        queryFn: () => TransactionService.make(role).balanceTrend(),
        select: (data: any) => data.data,
      },
      {
        queryKey: ["transactions_chart"],
        queryFn: () => TransactionService.make(role).chart(),
        select: (data: any) => data.data,
      },
    ],
  });

  const [balanceResult, balanceTrendResult, transactionsChartResult] = results;
  const balance = balanceResult.data;
  const balanceTrend = balanceTrendResult.data;
  const transactionsChart = transactionsChartResult.data;

  const isLoading =
    balanceResult.isLoading ||
    balanceTrendResult.isLoading ||
    transactionsChartResult.isLoading;
  const hasError =
    balanceResult.error ||
    balanceTrendResult.error ||
    transactionsChartResult.error;

  // Format balance trend data for chart
  const formattedBalanceTrend =
    (balanceTrend as any)?.map((item: any) => ({
      date: dayjs(item.created_at).format("DD"),
      balance: item.balance,
    })) || [];

  // Format transactions chart data for current month
  const formattedTransactionsData = (transactionsChart as any)
    ? [
        ...(transactionsChart as any).income.map((item: any) => ({
          date: dayjs(item.date).format("DD"),
          income: item.amount,
          outcome: 0,
        })),
        ...(transactionsChart as any).outcome.map((item: any) => ({
          date: dayjs(item.date).format("DD"),
          income: 0,
          outcome: item.amount,
        })),
      ].reduce((acc: any[], curr: any) => {
        const existing = acc.find((item: any) => item.date === curr.date);
        if (existing) {
          existing.income += curr.income;
          existing.outcome += curr.outcome;
        } else {
          acc.push(curr);
        }
        return acc;
      }, [] as any[])
    : [];

  // Calculate total income and outcome
  const totalIncome =
    (transactionsChart as any)?.income.reduce(
      (sum: number, item: any) => sum + item.amount,
      0,
    ) || 0;
  const totalOutcome =
    (transactionsChart as any)?.outcome.reduce(
      (sum: number, item: any) => sum + item.amount,
      0,
    ) || 0;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">
              {t("error.title")}
            </CardTitle>
            <CardDescription>
              {t("error.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("balance.title")}</CardTitle>
            <BalanceIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${balance?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("balance.description")}
            </p>
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("income.title")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("income.description")}
            </p>
          </CardContent>
        </Card>

        {/* Outcome Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("expenses.title")}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalOutcome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("expenses.description")}
            </p>
          </CardContent>
        </Card>

        {/* Net Profit Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("netProfit.title")}</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalIncome - totalOutcome >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              ${(totalIncome - totalOutcome).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("netProfit.description")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Balance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("charts.balanceTrend.title")}</CardTitle>
            <CardDescription>{t("charts.balanceTrend.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                balance: {
                  label: "Balance",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <AreaChart data={formattedBalanceTrend}>
                <defs>
                  <linearGradient
                    id="balanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("tooltips.day", { day: label })}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                            <span className="font-medium">
                              {t("tooltips.balance", { amount: payload[0].value?.toLocaleString() })}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Transactions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("charts.incomeVsExpenses.title")}</CardTitle>
            <CardDescription>
              {t("charts.incomeVsExpenses.description", { month: dayjs().format("MMMM YYYY") })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                income: {
                  label: "Income",
                  color: "hsl(var(--chart-2))",
                },
                outcome: {
                  label: "Expenses",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <AreaChart data={formattedTransactionsData}>
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="outcomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-3))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-3))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("tooltips.day", { day: label })}
                          </p>
                          {payload.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 mt-1"
                            >
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium">
                                {item.name === "Income" 
                                  ? t("tooltips.income", { amount: item.value?.toLocaleString() })
                                  : t("tooltips.expenses", { amount: item.value?.toLocaleString() })
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="outcome"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  fill="url(#outcomeGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ChartContainer>
            {/* Custom Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-muted-foreground">{t("legend.income")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-sm text-muted-foreground">{t("legend.expenses")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
