import { useParams } from "react-router-dom";
import { useState } from "react";

const DATA: Record<
  string,
  {
    topic: string;
    files: { title: string; url: string }[];
  }
> = {
  aptitude: {
    topic: "Aptitude",
    files: [
      {
        title: "400 Puzzles",
        url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Puzzles/400-Puzzles.pdf",
      },
    ],
  },

  dsa: {
    topic: "DSA",
    files: [
      {
        title: "Arrays",
        url: "https://pub-XXXX.r2.dev/dsa/arrays/arrays.pdf",
      },
    ],
  },
};

export default function StudyTopic() {
  const { folderId } = useParams();
  const section = folderId ? DATA[folderId] : null;

  const [activeFile, setActiveFile] = useState<{
    title: string;
    url: string;
  } | null>(null);

  if (!section) {
    return <div className="p-8">No materials found</div>;
  }

  /* ================= FULL SCREEN READER ================= */
  if (activeFile) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gray-100 flex flex-col">
        {/* TOP BAR */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          <button
            onClick={() => setActiveFile(null)}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            ← Back
          </button>

          <div className="font-semibold truncate max-w-[60vw]">
            {activeFile.title}
          </div>

          <a
            href={activeFile.url}
            download
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Download
          </a>
        </div>

        {/* PDF */}
        <div className="flex-1">
          <embed
            src={activeFile.url}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }

  /* ================= LIST VIEW ================= */
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        {section.topic}
      </h1>

      <div className="space-y-4">
        {section.files.map((file) => (
          <div
            key={file.title}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <span className="font-medium">
              {file.title}
            </span>

            <div className="flex gap-3">
              {/* READ – FULL SCREEN */}
              <button
                onClick={() => setActiveFile(file)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Read
              </button>

              {/* DOWNLOAD */}
              <a
                href={file.url}
                download
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
