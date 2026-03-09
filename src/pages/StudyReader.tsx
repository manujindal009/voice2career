import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

export default function StudyReader() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const fileUrl = params.get("file");
  const title = params.get("title") || "Study Material";

  if (!fileUrl) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        No file selected
      </div>
    );
  }

  return (
    // 🔥 FORCE FULL SCREEN – IGNORE ALL LAYOUTS
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          height: "56px",
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 border border-gray-200 px-2 py-1 rounded-xl hover:bg-gray-100"
>
  <ArrowLeft className="h-4 w-4" />
  Back
</button>

          <div
            style={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "60vw",
            }}
          >
            {title}
          </div>
        </div>

        <a
          href={fileUrl}
          download
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#16a34a",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <Download size={16} />
          Download
        </a>
      </div>

      {/* 🔥 FULL VIEWPORT PDF */}
      <div style={{ flex: 1 }}>
        <embed
          src={fileUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
