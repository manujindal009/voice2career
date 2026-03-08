import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white px-6 py-20">

      <div className="max-w-4xl mx-auto space-y-8">

        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:underline"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold">Terms & Conditions</h1>

        <p className="text-gray-400">
          By using voice2career, you agree to the following terms and
          conditions.
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Platform Usage
            </h2>
            <p className="text-gray-400">
              voice2career provides interview preparation tools and career
              guidance resources. Users must use the platform responsibly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. User Responsibility
            </h2>
            <p className="text-gray-400">
              Users are responsible for maintaining the confidentiality of
              their accounts and login credentials.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Service Changes
            </h2>
            <p className="text-gray-400">
              We may update or modify features of the platform at any time
              to improve the service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Contact
            </h2>
            <p className="text-gray-400">
              For questions about these terms, contact us at
              voice2career@yahoo.com
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}