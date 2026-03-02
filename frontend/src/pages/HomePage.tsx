import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, BarChart3, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: 'Fast & Easy',
      description: 'Create and deploy surveys in minutes with our intuitive platform.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: 'Powerful Analytics',
      description: 'Get detailed insights and analytics from your survey responses.',
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security measures.',
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: 'Reliable Results',
      description: 'Collect accurate feedback with our proven survey methodology.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Gather Insights with{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Professional Surveys
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Create, distribute, and analyze surveys with ease. Get the feedback you need to make informed decisions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/survey' })}
                className="text-base"
              >
                Start a Survey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/about' })}
                className="text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose SurveyHub?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create effective surveys and gather meaningful insights.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of organizations using SurveyHub to gather valuable feedback and insights.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/survey' })}
              className="text-base"
            >
              Launch Your First Survey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
