import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us when using our survey platform, including your name, email address, and any responses you submit through our surveys.",
        "We also automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, and usage patterns.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to provide, maintain, and improve our survey services, including processing and analyzing survey responses.",
        "Your information helps us communicate with you about your account, respond to your inquiries, and send you important updates about our services.",
        "We may use aggregated, anonymized data for research and analytics purposes to improve our platform and develop new features.",
      ],
    },
    {
      title: "Data Sharing and Disclosure",
      content: [
        "We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our platform, subject to confidentiality agreements.",
        "Survey responses are shared with the organization that created the survey. We encourage survey creators to respect respondent privacy and handle data responsibly.",
        "We may disclose information when required by law or to protect our rights, property, or safety, or that of our users or others.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "While we strive to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "You have the right to access, update, or delete your personal information. You can manage your account settings or contact us to exercise these rights.",
        "You may opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages.",
        "Depending on your location, you may have additional rights under applicable data protection laws, including the right to data portability and the right to object to certain processing.",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy.",
        "Survey responses are retained according to the preferences set by the survey creator. You may request deletion of your responses by contacting the survey creator or us.",
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services.",
        "You can control cookie preferences through your browser settings, though disabling cookies may affect the functionality of our platform.",
      ],
    },
    {
      title: "Children's Privacy",
      content: [
        "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected information from a child under 13, we will take steps to delete that information promptly.",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.",
        "We will notify you of any material changes by posting the updated policy on our website and updating the effective date.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have questions or concerns about this privacy policy or our data practices, please contact us through our contact page.",
        "We are committed to addressing your privacy concerns and will respond to your inquiries in a timely manner.",
      ],
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-500">
            Last updated: December 31, 2025
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-cyan-100 bg-cyan-50 p-6 md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Your Privacy Matters
          </h2>
          <p className="text-gray-600">
            At SurveyHub, we are committed to protecting your privacy and
            ensuring the security of your personal information. This privacy
            policy explains how we collect, use, and safeguard your data when
            you use our survey platform.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.title}>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                {section.title}
              </h2>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  {section.content.map((paragraph) => (
                    <p key={paragraph} className="text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              {index < sections.length - 1 && (
                <Separator className="mt-8 bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <p className="text-center text-sm text-gray-500">
            By using SurveyHub, you acknowledge that you have read and
            understood this privacy policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
}
