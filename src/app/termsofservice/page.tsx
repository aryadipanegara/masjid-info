import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using the MasjidInfo website and mobile application
            (the "Service") operated by MasjidInfo ("us", "we", or "our").
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  By accessing or using the Service, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, then
                  you may not access the Service.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. Description of Service</AccordionTrigger>
              <AccordionContent>
                <p>
                  MasjidInfo provides a platform for users to discover, review,
                  and share information about mosques and Islamic events. Our
                  services include, but are not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Mosque directory and information</li>
                  <li>User reviews and ratings</li>
                  <li>Islamic event listings</li>
                  <li>Community forums</li>
                  <li>Educational resources about Islam</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. User Accounts</AccordionTrigger>
              <AccordionContent>
                <p>
                  When you create an account with us, you must provide accurate,
                  complete, and up-to-date information. Failure to do so
                  constitutes a breach of the Terms, which may result in
                  immediate termination of your account on our Service.
                </p>
                <p className="mt-2">
                  You are responsible for safeguarding the password you use to
                  access the Service and for any activities or actions under
                  your password.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. User-Generated Content</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our Service allows you to post, link, store, share and
                  otherwise make available certain information, text, graphics,
                  videos, or other material ("Content"). You are responsible for
                  the Content that you post to the Service, including its
                  legality, reliability, and appropriateness.
                </p>
                <p className="mt-2">
                  By posting Content to the Service, you grant us the right and
                  license to use, modify, publicly perform, publicly display,
                  reproduce, and distribute such Content on and through the
                  Service.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>5. Prohibited Uses</AccordionTrigger>
              <AccordionContent>
                <p>
                  You may use our Service only for lawful purposes and in
                  accordance with these Terms. You agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    In any way that violates any applicable national or
                    international law or regulation.
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or
                    promotional material, including any "junk mail", "chain
                    letter," "spam," or any other similar solicitation.
                  </li>
                  <li>
                    To impersonate or attempt to impersonate MasjidInfo, a
                    MasjidInfo employee, another user, or any other person or
                    entity.
                  </li>
                  <li>
                    In any way that infringes upon the rights of others, or in
                    any way is illegal, threatening, fraudulent, or harmful.
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone's use or enjoyment of the Service, or which, as
                    determined by us, may harm MasjidInfo or users of the
                    Service or expose them to liability.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. Intellectual Property</AccordionTrigger>
              <AccordionContent>
                <p>
                  The Service and its original content (excluding Content
                  provided by users), features, and functionality are and will
                  remain the exclusive property of MasjidInfo and its licensors.
                  The Service is protected by copyright, trademark, and other
                  laws of both the United States and foreign countries. Our
                  trademarks and trade dress may not be used in connection with
                  any product or service without the prior written consent of
                  MasjidInfo.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>7. Termination</AccordionTrigger>
              <AccordionContent>
                <p>
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms. Upon
                  termination, your right to use the Service will immediately
                  cease.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>8. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                <p>
                  In no event shall MasjidInfo, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the Service.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>9. Governing Law</AccordionTrigger>
              <AccordionContent>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of [Your Country/State], without regard to its
                  conflict of law provisions. Our failure to enforce any right
                  or provision of these Terms will not be considered a waiver of
                  those rights.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>10. Changes to Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. What constitutes a material
                  change will be determined at our sole discretion. By
                  continuing to access or use our Service after those revisions
                  become effective, you agree to be bound by the revised terms.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>11. Contact Us</AccordionTrigger>
              <AccordionContent>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p className="mt-2">Email: legal@masjidinfo.com</p>
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
