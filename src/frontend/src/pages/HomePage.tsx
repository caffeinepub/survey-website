import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Coins, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getCoinBalance, getCurrentUserId } from "../services/supabaseService";

export default function HomePage() {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);
  const [coinBalance, setCoinBalance] = useState(0);
  const [loadingCoins, setLoadingCoins] = useState(true);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("surveyHistory") ?? "[]");
      setCompletedCount(Array.isArray(history) ? history.length : 0);
    } catch {
      setCompletedCount(0);
    }

    async function fetchCoins() {
      try {
        const userId = getCurrentUserId();
        if (userId) {
          const coins = await getCoinBalance(userId);
          setCoinBalance(coins);
        }
      } catch {
        setCoinBalance(0);
      } finally {
        setLoadingCoins(false);
      }
    }
    fetchCoins();
  }, []);

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
                className="border-0 bg-cyan-500 text-base font-semibold text-white hover:bg-cyan-600"
              >
                Start a Survey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/about" })}
                data-ocid="home.secondary_button"
                className="border-gray-300 text-base text-gray-700 hover:bg-gray-50"
              >
                Learn More
              </Button>
            </div>

            <p
              data-ocid="home.survey_count"
              className="mt-4 text-sm text-gray-400"
            >
              {completedCount} survey{completedCount !== 1 ? "s" : ""} completed
            </p>
          </div>
        </div>
      </section>

      {/* Coin Wallet Dashboard Card */}
      <section className="bg-white pb-4 pt-0">
        <div className="container">
          <div className="mx-auto max-w-sm">
            <div
              data-ocid="home.wallet_card"
              className="rounded-xl border border-cyan-100 bg-white p-6 shadow-sm text-center"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50">
                  <Coins className="h-6 w-6 text-cyan-500" />
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Your Wallet
              </h3>
              {loadingCoins ? (
                <p
                  data-ocid="home.wallet_card.loading_state"
                  className="text-sm text-gray-400"
                >
                  Loading…
                </p>
              ) : coinBalance === 0 ? (
                <p className="text-sm text-gray-400">
                  0 Coins — Complete surveys to earn!
                </p>
              ) : (
                <>
                  <p className="text-4xl font-bold text-cyan-500">
                    {coinBalance}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-700">
                    = ₹{(coinBalance / 10).toFixed(2)}
                  </p>
                </>
              )}
              <p className="mt-2 text-xs text-gray-400">100 Coins = ₹10</p>
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
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
              className="border-0 bg-cyan-500 text-base font-semibold text-white hover:bg-cyan-600"
            >
              Launch Your First Survey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
