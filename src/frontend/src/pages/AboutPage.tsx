import { Award, Target, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-cyan-600" />,
      title: "Our Mission",
      description:
        "To empower organizations with the tools they need to gather meaningful feedback and make data-driven decisions.",
    },
    {
      icon: <Users className="h-8 w-8 text-cyan-600" />,
      title: "User-Centric",
      description:
        "We prioritize user experience in every aspect of our platform, ensuring surveys are easy to create and complete.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-cyan-600" />,
      title: "Continuous Innovation",
      description:
        "We constantly evolve our platform with new features and improvements based on user feedback and industry trends.",
    },
    {
      icon: <Award className="h-8 w-8 text-cyan-600" />,
      title: "Quality First",
      description:
        "We maintain the highest standards in data collection, security, and reliability to deliver exceptional results.",
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About SurveyHub
          </h1>
          <p className="text-lg text-gray-500">
            Learn more about our mission and what drives us forward.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                SurveyHub is a leading survey platform designed to help
                organizations of all sizes gather valuable insights from their
                audiences. Whether you're conducting market research, collecting
                customer feedback, or measuring employee satisfaction, our
                platform provides the tools you need to succeed.
              </p>
              <p>
                Founded on the principles of simplicity, reliability, and
                innovation, we've built a platform that makes survey creation
                and distribution effortless while providing powerful analytics
                to help you understand your data.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What We Do
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We provide a comprehensive survey solution that covers every
                aspect of the feedback collection process. From intuitive survey
                design tools to advanced analytics and reporting, our platform
                is built to deliver results.
              </p>
              <p>
                Our technology ensures that your surveys are accessible,
                engaging, and secure. We handle the technical complexity so you
                can focus on what matters most: understanding your audience and
                making informed decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">
            Our Core Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-3">{value.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Join Our Journey
          </h2>
          <p className="text-gray-600">
            We're committed to helping organizations worldwide gather the
            insights they need to thrive. Join thousands of satisfied users who
            trust SurveyHub for their survey needs. Together, we can turn
            feedback into action and data into decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
