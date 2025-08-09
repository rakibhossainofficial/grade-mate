import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const highlights = [
  {
    title: "Peer Review",
    desc: "Submit assignments and receive thoughtful peer feedback.",
  },
  {
    title: "Grading Workflow",
    desc: "Built-in tools for educators and reviewers to assign marks.",
  },
  {
    title: "Secure Submission",
    desc: "JWT-authenticated endpoints ensure integrity and privacy.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="text-center my-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 ">
        {highlights.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
