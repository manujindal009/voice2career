import { useNavigate } from "react-router-dom";

export default function Privacy() {
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

        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="text-gray-400">
          At voice2career, we respect your privacy and are committed to
          protecting your personal information.
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-400">
              We may collect personal details such as name, email address,
              and account information when you sign up or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-400">
              Your information is used to improve our platform, provide
              interview preparation tools, and communicate updates related
              to your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-400">
              We implement security measures to protect your data from
              unauthorized access, misuse, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Contact Us
            </h2>
            <p className="text-gray-400">
              If you have questions regarding this privacy policy,
              contact us at voice2career@yahoo.com
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}