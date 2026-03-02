import { ClipboardList } from "lucide-react";

export default function SurveyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Survey
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete the survey below to share your feedback and earn rewards.
          </p>
        </div>

        {/* Placeholder content */}
        <div className="w-full overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm">
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">
              Surveys are currently unavailable. Please check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
