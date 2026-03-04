import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Shield, Zap } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-cyan-600" />,
      title: "Fast & Easy",
      description:
        "Create and deploy surveys in minutes with our intuitive platform.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-cyan-600" />,
      title: "Powerful Analytics",
      description:
        "Get detailed insights and analytics from your survey responses.",
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-600" />,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-cyan-600" />,
      title: "Reliable Results",
      description:
        "Collect accurate feedback with our proven survey methodology.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Gather Insights with{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Professional Surveys
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 sm:text-xl">
              Create, distribute, and analyze surveys with ease. Get the
              feedback you need to make informed decisions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/survey" })}
                data-ocid="home.primary_button"
                className="text-base bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
              >
                Start a Survey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/about" })}
                data-ocid="home.secondary_button"
                className="text-base border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose SurveyHub?
              </h2>
              <p className="text-lg text-gray-500">
                Everything you need to create effective surveys and gather
                meaningful insights.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl p-6 border border-gray-100 shadow-sm bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Join thousands of organizations using SurveyHub to gather valuable
              feedback and insights.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/survey" })}
              data-ocid="home.cta_button"
              className="text-base bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
            >
              Launch Your First Survey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
