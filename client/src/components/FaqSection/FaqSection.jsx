import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section className="w-full mx-auto my-8 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2 text-2xl">
        <AccordionItem value="q1">
          <AccordionTrigger>
            What is GradeMate and who can use it?
          </AccordionTrigger>
          <AccordionContent>
            GradeMate is a peer-powered assignment sharing platform where every
            registered user is treated as a friend. Users can create, attempt,
            and grade each other's assignments. Perfect for group study and
            collaborative learning!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>
            How does the assignment grading system work?
          </AccordionTrigger>
          <AccordionContent>
            Once a user submits an assignment, other users (except the one who
            submitted it) can review, assign marks, and leave feedback. The
            platform ensures fairness by preventing users from grading their own
            submissions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>
            Can I delete or update assignments I didn't create?
          </AccordionTrigger>
          <AccordionContent>
            Only the original creator of an assignment can delete it. However,
            anyone can update any assignment unless restricted during setup.
            Delete requests require email verification for authorization.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>
            Is the platform secure and mobile-friendly?
          </AccordionTrigger>
          <AccordionContent>
            Yes! All sensitive keys and credentials are stored securely using
            environment variables. Plus, the UI is fully responsive across
            mobile, tablet, and desktop devices.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q5">
          <AccordionTrigger>
            Can I use Google login instead of email/password?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. The platform supports secure Google-based social login,
            making sign-in quick and seamless.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q6">
          <AccordionTrigger>
            Can I use Google login instead of email/password?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. The platform supports secure Google-based social login,
            making sign-in quick and seamless.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
