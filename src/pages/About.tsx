import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-14">

        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>

        {/* TITLE */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            About voice2career
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl">
            voice2career is a platform built to help students prepare for
            interviews, improve their communication skills, and confidently
            secure placement opportunities.
          </p>
        </div>

        {/* FOUNDER STORY */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Our Story
          </h2>

          <p className="text-gray-400 leading-relaxed">
            <span className="text-white font-medium">voice2career </span> was founded by <span className="text-white font-medium">Manu Jindal (Founder) </span> 
            and <span className="text-white font-medium">Anshuma Singh (Co-Founder)</span> with a simple but 
            powerful idea — to make interview preparation more accessible and 
            practical for students.
          </p>

          <p className="text-gray-400 leading-relaxed">
            During his own placement preparation journey,<span className="text-white"> Manu </span> realized that
            there was no single platform where students could practice
            <span className="text-white"> mock interviews</span> attempt 
            <span className="text-white"> mock tests</span>, and access 
            <span className="text-white"> structured study material </span>
            all in one place.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Most students either relied on random online resources or prepared
            without real interview practice. This gap in the placement
            preparation ecosystem inspired <span className="text-white"> Manu and Anshuma </span> to build a platform
            that would simulate real interview experiences and guide students
            through the entire preparation journey.
          </p>
        </div>

        {/* MISSION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Our Mission
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Our mission is to empower students with the right tools, practice,
            and guidance so they can confidently face interviews and secure
            the careers they aspire for.
          </p>
        </div>

        {/* WHAT WE PROVIDE */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            What voice2career Offers
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">

            <div className="p-6 border border-slate-800 rounded-xl bg-slate-900">
              <h3 className="font-semibold mb-2">
                AI Mock Interviews
              </h3>
              <p className="text-gray-400 text-sm">
                Practice realistic interview scenarios and improve confidence
                before facing actual recruiters.
              </p>
            </div>

            <div className="p-6 border border-slate-800 rounded-xl bg-slate-900">
              <h3 className="font-semibold mb-2">
                Mock Tests
              </h3>
              <p className="text-gray-400 text-sm">
                Prepare for aptitude, reasoning, and technical rounds through
                structured practice tests.
              </p>
            </div>

            <div className="p-6 border border-slate-800 rounded-xl bg-slate-900">
              <h3 className="font-semibold mb-2">
                Study Resources
              </h3>
              <p className="text-gray-400 text-sm">
                Access curated preparation materials designed for placement
                interviews.
              </p>
            </div>

            <div className="p-6 border border-slate-800 rounded-xl bg-slate-900">
              <h3 className="font-semibold mb-2">
                Placement Guidance
              </h3>
              <p className="text-gray-400 text-sm">
                Receive guidance and strategies to navigate placement drives
                and job interviews successfully.
              </p>
            </div>

          </div>
        </div>

        {/* FUTURE */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Our Vision
          </h2>

          <p className="text-gray-400 leading-relaxed">
            We envision voice2career becoming a complete career preparation
            ecosystem where students can practice, learn, and grow before
            stepping into the professional world.
          </p>

          <p className="text-gray-400 leading-relaxed">
            The goal is simple — to ensure that no student faces an interview
            unprepared.
          </p>
        </div>

      </div>

    </div>
  );
}