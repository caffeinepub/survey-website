import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ClipboardX } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type SurveyRecord,
  getCurrentUserId,
  getSurveyHistoryFromSupabase,
} from "../services/supabaseService";

export default function SurveyHistoryPage() {
  const [history, setHistory] = useState<SurveyRecord[]>([]);

  useEffect(() => {
    async function loadHistory() {
      let localRecords: SurveyRecord[] = [];
      try {
        localRecords = JSON.parse(
          localStorage.getItem("surveyHistory") ?? "[]",
        ) as SurveyRecord[];
      } catch {
        localRecords = [];
      }

      try {
        const userId = getCurrentUserId();
        if (userId) {
          const supabaseRecords = await getSurveyHistoryFromSupabase(userId);

          if (supabaseRecords.length > 0) {
            const seen = new Set<string>();
            const merged: SurveyRecord[] = [];
            for (const r of [...supabaseRecords, ...localRecords]) {
              const key = `${r.name}|${r.date}|${r.time}`;
              if (!seen.has(key)) {
                seen.add(key);
                merged.push(r);
              }
            }
            setHistory(merged);
            return;
          }
        }
        setHistory(localRecords);
      } catch {
        setHistory(localRecords);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Survey History
          </h1>
          <p className="text-lg text-gray-500">Track your completed surveys</p>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {history.length === 0 ? (
            <div
              data-ocid="survey_history.empty_state"
              className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center"
            >
              <ClipboardX className="h-14 w-14 text-cyan-400" />
              <p className="text-lg font-medium text-gray-500">
                No Survey History Found
              </p>
              <p className="max-w-xs text-sm text-gray-400">
                Complete a survey on the Survey page and it will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block" data-ocid="survey_history.table">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                        Survey Name
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                        Date
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                        Time
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((record, idx) => {
                      const ocidIndex = idx + 1;
                      const ocid =
                        ocidIndex === 1
                          ? "survey_history.row.1"
                          : ocidIndex === 2
                            ? "survey_history.row.2"
                            : ocidIndex === 3
                              ? "survey_history.row.3"
                              : "survey_history.row";
                      const rowKey = `${record.name}-${record.date}-${record.time}-${idx}`;
                      return (
                        <tr
                          key={rowKey}
                          data-ocid={ocid}
                          className="border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {record.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {record.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {record.time}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="flex w-fit items-center gap-1.5 border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                              <CheckCircle2 className="h-3 w-3" />
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="divide-y divide-gray-100 md:hidden">
                {history.map((record, idx) => (
                  <div
                    key={`${record.name}-${record.date}-${record.time}-${idx}`}
                    className="flex flex-col gap-3 px-6 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {record.name}
                      </span>
                      <Badge className="flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        {record.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>📅 {record.date}</span>
                      <span>🕐 {record.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {history.length > 0 && (
          <p className="mt-4 text-center text-sm text-gray-400">
            {history.length} survey{history.length !== 1 ? "s" : ""} completed
          </p>
        )}
      </div>
    </div>
  );
}
