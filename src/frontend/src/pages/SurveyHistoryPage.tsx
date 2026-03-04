import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ClipboardX } from "lucide-react";

interface SurveyRecord {
  name: string;
  date: string;
  time: string;
  status: string;
}

function getSurveyHistory(): SurveyRecord[] {
  try {
    return JSON.parse(
      localStorage.getItem("surveyHistory") ?? "[]",
    ) as SurveyRecord[];
  } catch {
    return [];
  }
}

export default function SurveyHistoryPage() {
  const history = getSurveyHistory();

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Survey History
          </h1>
          <p className="text-lg text-gray-500">Track your completed surveys</p>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {history.length === 0 ? (
            /* Empty state */
            <div
              data-ocid="survey_history.empty_state"
              className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center"
            >
              <ClipboardX className="h-14 w-14 text-cyan-400" />
              <p className="text-lg font-medium text-gray-500">
                No Survey History Found
              </p>
              <p className="text-sm text-gray-400 max-w-xs">
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
                            <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5 w-fit">
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
              <div className="md:hidden divide-y divide-gray-100">
                {history.map((record, idx) => (
                  <div
                    key={`${record.name}-${record.date}-${record.time}-${idx}`}
                    className="px-6 py-5 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {record.name}
                      </span>
                      <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1.5">
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

        {/* Record count */}
        {history.length > 0 && (
          <p className="mt-4 text-center text-sm text-gray-400">
            {history.length} survey{history.length !== 1 ? "s" : ""} completed
          </p>
        )}
      </div>
    </div>
  );
}
