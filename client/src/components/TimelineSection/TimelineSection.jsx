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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 py-8">

        <div class="flex flex-col w-full items-center justify-between border rounded-xl p-2 ">
          <img src="https://i.ibb.co/XmqHgj7/Sign-In.png" width={300} alt="sign in" />

          <div className="flex items-center justify-start">
            <div class="flex items-center justify-center w-12 h-12 border border-black-400 rounded-full  text-lg font-bold">
              <p>1</p>
            </div>

            <div class="flex-1 px-6">
              <h2 class=" font-semibold">
                Sign in securely to access your dashboard
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full items-center justify-between border rounded-xl p-2 ">
          <img src="https://i.ibb.co/zTr4MVLf/Take-Assignment.png" width={300} alt="Take Assignment" />

          <div className="flex items-center justify-start">
            <div class="flex items-center justify-center w-12 h-12 border border-black-400 rounded-full  text-lg font-bold">
              <p>2</p>
            </div>

            <div class="flex-1 px-6">
              <h2 class=" font-semibold">
                Browse or take assignments created by peers
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full items-center justify-between border rounded-xl p-2 ">
          <img src="https://i.ibb.co/b5wP0gD7/Completed-bro.png" width={300} alt="Complete" />

          <div className="flex items-center justify-start">
            <div class="flex items-center justify-center w-12 h-12 border border-black-400 rounded-full  text-lg font-bold">
              <p>3</p>
            </div>

            <div class="flex-1 px-6">
              <h2 class=" font-semibold">
                Submit your work with notes and links
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full items-center justify-between border rounded-xl p-2 ">
          <img src="https://i.ibb.co/Psmrr1vV/Review1.png" width={300} alt="Review" />

          <div className="flex items-center justify-start">
            <div class="flex items-center justify-center w-12 h-12 border border-black-400 rounded-full  text-lg font-bold">
              <p>4</p>
            </div>

            <div class="flex-1 px-6">
              <h2 class=" font-semibold">
                Review submissions and assign marks
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full items-center justify-between border rounded-xl p-2 ">
          <img src="https://i.ibb.co/xtchGCr4/Feedback-bro.png" width={300} alt="Feedback" />

          <div className="flex items-center justify-start">
            <div class="flex items-center justify-center w-12 h-12 border border-black-400 rounded-full  text-lg font-bold">
              <p>5</p>
            </div>

            <div class="flex-1 px-6">
              <h2 class=" font-semibold">
                Track feedback and progress over time
              </h2>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
