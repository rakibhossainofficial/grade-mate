const steps = [
  "🔐 Sign in securely to access your dashboard",
  "📄 Browse or take assignments created by peers",
  "📬 Submit your work with notes and links",
  "✅ Review submissions and assign marks",
  "🎓 Track feedback and progress over time",
];

export default function TimelineSection() {
  return (
    <section className="my-20 px-6">
      <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
      <ol className="space-y-6 max-w-2xl mx-auto text-left text-lg">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
