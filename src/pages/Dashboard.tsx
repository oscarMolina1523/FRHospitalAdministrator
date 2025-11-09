import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import KPIService from "@/services/kpi.service";
import KPI from "@/entities/kpi.model";

const chartConfig = {
  expense: { label: "Gastos", color: "#FF0001" },
  profit: { label: "Ganancias", color: "#43ff64d9" },
} satisfies ChartConfig;

const DashboardPage: React.FC = () => {
  const [dailyData, setDailyData] = useState<
    { date: string; expense: number; profit: number }[]
  >([]);
  const [periodicData, setPeriodicData] = useState<
    { date: string; expense: number; profit: number }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      const service = new KPIService();
      const kpis: KPI[] = await service.getKPIs();

      // --- Datos diarios ---
      const dailyKPIs = kpis.filter((kpi) =>
        /_(\d{4}-\d{2}-\d{2})$/.test(kpi.name)
      );
      const groupedDaily: Record<string, { expense: number; profit: number }> =
        {};
      dailyKPIs.forEach((kpi) => {
        const match = kpi.name.match(/_(\d{4}-\d{2}-\d{2})$/);
        if (!match) return;
        const date = match[1];
        if (!groupedDaily[date]) groupedDaily[date] = { expense: 0, profit: 0 };
        if (kpi.name.startsWith("profit_"))
          groupedDaily[date].profit = kpi.value;
        if (kpi.name.startsWith("expenses_"))
          groupedDaily[date].expense = kpi.value;
      });
      setDailyData(
        Object.entries(groupedDaily)
          .map(([date, values]) => ({ date, ...values }))
          .sort((a, b) => a.date.localeCompare(b.date))
      );

      // --- Datos por triggers: week, month, year ---
      const triggerKPIs = kpis.filter((kpi) =>
        /(week|month|year)/.test(kpi.name)
      );

      const groupedTrigger: Record<
        string,
        { expense: number; profit: number }
      > = {};
      triggerKPIs.forEach((kpi) => {
        const match = kpi.name.match(/_(week|month|year)_(.+)$/);
        if (!match) return;
        const period = match[2]; // Ej: "43-2025", "11-2025", "2025"
        if (!groupedTrigger[period])
          groupedTrigger[period] = { expense: 0, profit: 0 };
        if (kpi.name.startsWith("profit_"))
          groupedTrigger[period].profit = kpi.value;
        if (kpi.name.startsWith("expenses_"))
          groupedTrigger[period].expense = kpi.value;
      });

      setPeriodicData(
        Object.entries(groupedTrigger)
          .map(([date, values]) => ({ date, ...values }))
          .sort((a, b) => a.date.localeCompare(b.date))
      );
    };

    loadData();
  }, []);

  return (
    <div className="bg-white h-full rounded-2xl flex flex-col gap-6 p-4">
      {/* --- Gráfico diario --- */}
      <ChartContainer config={chartConfig} className="max-h-80 w-full">
        <BarChart accessibilityLayer data={dailyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(5)} // MM-DD
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
      </ChartContainer>

      {/* --- Gráfico triggers: week/month/year --- */}
      <ChartContainer config={chartConfig} className="max-h-80 w-full">
        <BarChart accessibilityLayer data={periodicData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) => {
              if (/^\d{4}$/.test(value)) return value; // anual
              if (/^\d{2}-\d{4}$/.test(value)) {
                // mensual
                const [month, year] = value.split("-");
                return new Date(Number(year), Number(month) - 1).toLocaleString(
                  "en-US",
                  { month: "short", year: "numeric" }
                );
              }
              if (/^W\d{1,2}-\d{4}$/.test(value)) {
                // semanal
                return "Semana " + value.replace("W", "");
              }
              return value;
            }}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DashboardPage;
