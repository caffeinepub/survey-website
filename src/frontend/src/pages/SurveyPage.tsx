import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, History } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addCoins,
  getCurrentUserId,
  saveSurveyHistory,
} from "../services/supabaseService";

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
  const [surveyLoaded, _setSurveyLoaded] = useState(false);
  const [cpxReady, _setCpxReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if not signed in
  useEffect(() => {
    if (!getCurrentUserId()) {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  // CPX INTEGRATION POINT
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // TODO: verify event.origin matches CPX domain before trusting
      // if (event.origin !== 'https://offers.cpx-research.com') return;
      // if (event.data?.type === 'cpx_survey_completed') { setCpxReady(true); }
      // if (event.data?.type === 'cpx_survey_loaded') { setSurveyLoaded(true); }
      void event;
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const onSurveyComplete = async () => {
    if (!cpxReady) return;
    const now = new Date();
    const record: SurveyRecord = {
      name: "Surearn Survey",
      date: formatDate(now),
      time: formatTime(now),
      status: "Completed",
    };

    // Save to localStorage
    const existing: SurveyRecord[] = (() => {
      try {
        return JSON.parse(
          localStorage.getItem("surveyHistory") ?? "[]",
        ) as SurveyRecord[];
      } catch {
        return [];
      }
    })();
    existing.push(record);
    localStorage.setItem("surveyHistory", JSON.stringify(existing));

    // Save to Supabase
    const userId = getCurrentUserId();
    if (userId) {
      await Promise.all([
        saveSurveyHistory(userId, record),
        addCoins(userId, 50),
      ]);
    }

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

        {/* Survey area */}
        {!surveyLoaded ? (
          <div
            data-ocid="survey.unavailable_state"
            className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <ClipboardList className="h-12 w-12 text-cyan-400" />
              <p className="text-lg font-medium text-gray-500">
                Surveys are currently unavailable. Please check back later.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {/*
              CPX INTEGRATION POINT:
              Replace this comment with the CPX Research iframe.
              <iframe
                width="100%"
                frameBorder="0"
                height="2000px"
                src="https://offers.cpx-research.com/index.php?app_id=30743&ext_user_id={unique_user_id}&secure_hash={secure_hash}&username={user_name}&email={user_email}&subid_1=&subid_2="
                title="CPX Research Survey"
              />
            */}
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <p className="text-lg font-medium text-gray-500">
                Survey is loading…
              </p>
            </div>
          </div>
        )}

        {/* Submit / Success area */}
        <div className="mt-8 flex flex-col items-center gap-6">
          {submitted ? (
            <>
              <div
                data-ocid="survey.success_state"
                className="w-full max-w-md rounded-xl border border-emerald-100 bg-emerald-50 px-8 py-10 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 drop-shadow-lg" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Survey Completed Successfully!
                </h2>
                <p className="text-base text-gray-600">
                  Thank you for completing the survey. You earned 50 coins!
                </p>
              </div>

              <Button
                data-ocid="survey.view_history_button"
                onClick={() => navigate({ to: "/survey-history" })}
                size="lg"
                className="flex items-center gap-2 border-0 bg-cyan-500 px-10 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-cyan-600"
              >
                <History className="h-5 w-5" />
                View Survey History
              </Button>
            </>
          ) : surveyLoaded ? (
            <Button
              data-ocid="survey.submit_button"
              onClick={onSurveyComplete}
              disabled={!cpxReady}
              size="lg"
              title={!cpxReady ? "Complete the survey to submit" : undefined}
              className="border-0 bg-cyan-500 px-10 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Survey
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
