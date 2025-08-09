import { Card, CardTitle } from "@/components/ui/card";

const features = [
  "Real-time Feedback Threads",
  "Assignment Filtering & Preview",
  "Theme Toggle & Responsive UI",
  "File & URL Submission Support",
  "Admin Analytics & Insights",
  "Accessible Bilingual Design",
];

export default function FeaturesSection() {
  return (
    <section className="px-6 my-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className="p-4">
            <CardTitle className="text-base font-semibold">{feature}</CardTitle>
          </Card>
        ))}
      </div>
    </section>
  );
}
