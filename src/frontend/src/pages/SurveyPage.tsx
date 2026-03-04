import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, History } from "lucide-react";
import { useState } from "react";

interface SurveyRecord {
  name: string;
  date: string;
  time: string;
  status: string;
}

function formatDate(d: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatTime(d: Date): string {
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}

export default function SurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const now = new Date();
    const record: SurveyRecord = {
      name: "Surearn Survey",
      date: formatDate(now),
      time: formatTime(now),
      status: "Completed",
    };
    const existing: SurveyRecord[] = JSON.parse(
      localStorage.getItem("surveyHistory") ?? "[]",
    );
    existing.push(record);
    localStorage.setItem("surveyHistory", JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Survey
          </h1>
          <p className="text-lg text-gray-500">
            Complete the survey below to share your feedback and earn rewards.
          </p>
        </div>

        {/* Survey placeholder card */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <ClipboardList className="h-12 w-12 text-cyan-400" />
            <p className="text-lg font-medium text-gray-500">
              Surveys are currently unavailable. Please check back later.
            </p>
          </div>
        </div>

        {/* Submit / Success area */}
        <div className="mt-8 flex flex-col items-center gap-6">
          {!submitted ? (
            <Button
              data-ocid="survey.submit_button"
              onClick={handleSubmit}
              size="lg"
              className="bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0 px-10 py-3 text-base transition-all duration-200"
            >
              Submit Survey
            </Button>
          ) : (
            <>
              {/* Success card */}
              <div
                data-ocid="survey.success_state"
                className="w-full max-w-md rounded-xl border border-emerald-100 bg-emerald-50 px-8 py-10 text-center"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 drop-shadow-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Survey Completed Successfully!
                </h2>
                <p className="text-gray-600 text-base">
                  Thank you for completing the survey.
                </p>
              </div>

              {/* View History button */}
              <Button
                data-ocid="survey.view_history_button"
                onClick={() => navigate({ to: "/survey-history" })}
                size="lg"
                className="bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0 px-10 py-3 text-base flex items-center gap-2 transition-all duration-200"
              >
                <History className="h-5 w-5" />
                View Survey History
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
