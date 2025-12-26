import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getFeedback } from "@/utils/getFeedback";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total ?? 0;
  const attempted = location.state?.attempted ?? 0;

  const feedback = getFeedback(attempted, total);

  // 🔥 ALWAYS SAVE RESULT
  useEffect(() => {
    const testResult = {
      date: new Date().toLocaleString(),
      total,
      attempted,
      feedback,
    };

    localStorage.setItem("lastTestResult", JSON.stringify(testResult));
  }, [total, attempted, feedback]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Test Result</h1>

      <p><strong>Total Questions:</strong> {total}</p>
      <p><strong>Attempted:</strong> {attempted}</p>

      <h3>Feedback</h3>
      <p>{feedback}</p>

      <button onClick={() => navigate("/test")}>
        Retry Test
      </button>
    </div>
  );
}
