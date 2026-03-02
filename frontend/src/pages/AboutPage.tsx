import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, TrendingUp, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Our Mission',
      description: 'To empower organizations with the tools they need to gather meaningful feedback and make data-driven decisions.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'User-Centric',
      description: 'We prioritize user experience in every aspect of our platform, ensuring surveys are easy to create and complete.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our platform with new features and improvements based on user feedback and industry trends.',
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Quality First',
      description: 'We maintain the highest standards in data collection, security, and reliability to deliver exceptional results.',
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            About SurveyHub
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn more about our mission and what drives us forward.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                SurveyHub is a leading survey platform designed to help organizations of all sizes gather valuable insights from their audiences. Whether you're conducting market research, collecting customer feedback, or measuring employee satisfaction, our platform provides the tools you need to succeed.
              </p>
              <p>
                Founded on the principles of simplicity, reliability, and innovation, we've built a platform that makes survey creation and distribution effortless while providing powerful analytics to help you understand your data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">What We Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We provide a comprehensive survey solution that covers every aspect of the feedback collection process. From intuitive survey design tools to advanced analytics and reporting, our platform is built to deliver results.
              </p>
              <p>
                Our technology ensures that your surveys are accessible, engaging, and secure. We handle the technical complexity so you can focus on what matters most: understanding your audience and making informed decisions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
            Our Core Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <div className="mb-2">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Journey</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              We're committed to helping organizations worldwide gather the insights they need to thrive. Join thousands of satisfied users who trust SurveyHub for their survey needs. Together, we can turn feedback into action and data into decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
