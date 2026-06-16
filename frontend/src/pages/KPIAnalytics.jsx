import { useEffect, useState } from "react";

import {
  BarChart3,
  FileDown,
  FileSpreadsheet,
} from "lucide-react";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  getOrganizationKPITrends,
} from "../api/kpiTrendApi";

import KPITrendChart from "../components/KPITrendChart";

import {
  useOrganization,
} from "../context/OrganizationContext";

import OrganizationSelector
  from "../components/OrganizationSelector";

export default function KPIAnalytics() {
  const { selectedOrganization } =
    useOrganization();

  const organizationId =
    selectedOrganization?.id;

  const [trends, setTrends] = useState([]);

  const loadData = async () => {
    if (!organizationId) return;

    const res =
      await getOrganizationKPITrends(
        organizationId
      );

    setTrends(res.data);
  };

  useEffect(() => {
    loadData();
  }, [organizationId]);

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
      "KPI Analytics Report",
      20,
      20
    );

    let y = 40;

    trends.forEach((row) => {
      pdf.text(
        `${row.period}
Actual: ${row.actual_value}
Forecast: ${row.forecast_value}
Achievement: ${row.achievement_percentage.toFixed(
          2
        )}%`,
        20,
        y
      );

      y += 25;
    });

    pdf.save(
      "KPI_Analytics_Report.pdf"
    );
  };

  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(
        trends
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "KPI Analytics"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const file =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

    saveAs(
      file,
      "KPI_Analytics.xlsx"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <BarChart3 size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">
                KPI Analytics
              </h1>

              <p className="text-white/60">
                KPI trend analysis,
                forecast comparison,
                executive KPI reporting.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-bold"
        >
          <FileDown size={18} />
          Export PDF
        </button>

        <button
          onClick={exportExcel}
          className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-bold"
        >
          <FileSpreadsheet size={18} />
          Export Excel
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-black">
          KPI Trend Chart
        </h2>

        <KPITrendChart
          data={trends}
        />
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-5 text-xl font-black">
          KPI Trend Records
        </h2>

        <div className="grid gap-4">
          {trends.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-950/40 p-5"
            >
              <div className="grid md:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-white/50">
                    Period
                  </p>
                  <p className="font-bold">
                    {item.period}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Actual
                  </p>
                  <p className="font-bold">
                    {item.actual_value}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Forecast
                  </p>
                  <p className="font-bold">
                    {item.forecast_value}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Variance
                  </p>
                  <p className="font-bold">
                    {item.variance}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Achievement
                  </p>
                  <p className="font-bold text-cyan-300">
                    {item.achievement_percentage.toFixed(
                      2
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          ))}

          {trends.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
              No KPI trend data found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}