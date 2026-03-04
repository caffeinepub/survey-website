import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "contact@surveyhub.com",
      href: "mailto:contact@surveyhub.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "123 Survey Street, Data City, DC 12345",
      href: null,
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="text-lg text-gray-500">
            Have a question or need assistance? We're here to help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-1 text-xl font-semibold text-gray-900">
                Send us a message
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      data-ocid="contact.name_input"
                      className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-ocid="contact.email_input"
                      className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    data-ocid="contact.subject_input"
                    className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    data-ocid="contact.message_textarea"
                    className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full sm:w-auto bg-cyan-500 text-white hover:bg-cyan-600 font-semibold border-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Contact Information
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                Reach out to us through any of these channels.
              </p>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                      {info.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-500">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Business Hours
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday - Friday</span>
                  <span className="font-medium text-gray-700">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="font-medium text-gray-700">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="font-medium text-gray-700">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
