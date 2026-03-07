import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

/* ================= DATA ================= */

const CONTENT: Record<
  string,
  {
    title: string;
    files: { id: string; name: string; url: string }[];
  }
> = {
  aptitude: {
    title: "Aptitude • Puzzles",
    files: [
      {
        id: "puzzles-400",
        name: "400 Puzzles (Complete PDF)",
        url: "https://pub-072b2b87ad314d53925e9f9704b77110.r2.dev/aptitude/Aptitude/Puzzles/400-Puzzles.pdf",
      },
    ],
  },
};

/* ================= COMPONENT ================= */

export default function StudyFolder() {
  const { folderId } = useParams();
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const folder = folderId ? CONTENT[folderId] : null;

  if (!folder) {
    return <div className="p-10">No content available</div>;
  }

  const activeFile = folder.files.find(f => f.url === activePdf);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 px-6 py-6">

        {/* LEFT SIDEBAR */}
        <aside className="col-span-12 lg:col-span-3">
          <Card className="p-4 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">
              {folder.title}
            </h2>

            <div className="space-y-2">
              {folder.files.map(file => (
                <button
                  key={file.id}
                  onClick={() => setActivePdf(file.url)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition
                    ${
                      activePdf === file.url
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {file.name}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="col-span-12 lg:col-span-9">
          <Card className="h-[85vh] flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h3 className="font-semibold text-sm">
                  {activeFile ? activeFile.name : "Select a PDF"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Read directly on the platform
                </p>
              </div>

              {activeFile && (
                <a
                  href={activeFile.url}
                  download
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              )}
            </div>

            {/* PDF VIEWER */}
            <div className="flex-1 bg-background">
              {activePdf ? (
                <iframe
                  src={activePdf}
                  title="PDF Viewer"
                  className="w-full h-full"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Select a file from the left to start reading
                </div>
              )}
            </div>
          </Card>
        </main>

      </div>
    </div>
  );
}
