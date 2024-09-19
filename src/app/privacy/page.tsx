import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MasjidInfo's Privacy Policy",
  keywords: ["privacy", "policy", "masjidinfo", "information"],
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            MasjidInfo ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our website and mobile
            application (collectively, the "Service").
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Information We Collect</AccordionTrigger>
              <AccordionContent>
                <p>
                  We collect several types of information from and about users
                  of our Service, including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Personal data: Name, email address, phone number, and
                    location.
                  </li>
                  <li>
                    Usage data: IP address, browser type, pages visited, and
                    time spent on the Service.
                  </li>
                  <li>
                    Mosque-related data: Information about mosques you've
                    visited or reviewed.
                  </li>
                  <li>
                    User-generated content: Reviews, ratings, and comments you
                    post on the Service.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                2. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Provide, maintain, and improve our Service.</li>
                  <li>
                    Personalize your experience and deliver content relevant to
                    you.
                  </li>
                  <li>Process transactions and send related information.</li>
                  <li>
                    Send you technical notices, updates, security alerts, and
                    support messages.
                  </li>
                  <li>
                    Respond to your comments, questions, and customer service
                    requests.
                  </li>
                  <li>Conduct research and analysis to improve our Service.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                3. Disclosure of Your Information
              </AccordionTrigger>
              <AccordionContent>
                <p>We may disclose your personal information to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Our subsidiaries and affiliates.</li>
                  <li>
                    Contractors, service providers, and other third parties we
                    use to support our business.
                  </li>
                  <li>Fulfill the purpose for which you provide it.</li>
                  <li>Comply with any court order, law, or legal process.</li>
                  <li>Enforce our Terms of Service and other agreements.</li>
                  <li>
                    If we believe disclosure is necessary to protect the rights,
                    property, or safety of MasjidInfo, our users, or others.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. Data Security</AccordionTrigger>
              <AccordionContent>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                5. Your Data Protection Rights
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal data, including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    The right to access, update, or delete your information.
                  </li>
                  <li>
                    The right to rectification if your information is inaccurate
                    or incomplete.
                  </li>
                  <li>
                    The right to object to our processing of your personal data.
                  </li>
                  <li>
                    The right to request restriction of processing of your
                    personal data.
                  </li>
                  <li>The right to data portability of your personal data.</li>
                  <li>
                    The right to withdraw consent at any time where we relied on
                    your consent to process your personal data.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. Children's Privacy</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our Service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                7. Changes to Our Privacy Policy
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>8. Contact Us</AccordionTrigger>
              <AccordionContent>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="mt-2">Email: privacy@masjidinfo.com</p>
                <p>Phone: +1 (234) 567-890</p>
                <p>Address: 123 Islamic Way, Mecca, SA</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
