type ChartPoint = {
  score: number;
  label?: string;
};


export default function PerformanceChart({
  data,
  title = "interviews",
}: {
  data: ChartPoint[];
  title?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border p-6 text-sm text-gray-400">
        No performance data available
      </div>
    );
  }

  const width = 1000;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxScore = 100;
  const stepX =
    data.length === 1
      ? 0
      : (width - paddingX * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = paddingX + i * stepX;
    const y =
      height -
      paddingY -
      (d.score / maxScore) * (height - paddingY * 2);
    return { x, y, score: d.score };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${height - paddingY}
    L ${points[0].x} ${height - paddingY}
    Z
  `;

  const improving =
    data[data.length - 1].score >= data[0].score;

  return (
    <div className="rounded-2xl border p-6 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
  Your progress over the last {data.length} {title}
</h3>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            improving
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {improving ? "Improving" : "Needs Work"}
        </span>
      </div>

      {/* GRAPH */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[220px]"
        preserveAspectRatio="none"
      >
        <defs>
          {/* EXISTING gradient (kept) */}
          <linearGradient
            id="areaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
          </linearGradient>

          {/* 🔥 ADD: line animation */}
          <style>
            {`
              .line-draw {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: drawLine 1.2s ease-out forwards;
              }

              @keyframes drawLine {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>

        {/* 🔥 ADD: baseline */}
        <line
          x1={paddingX}
          y1={height - paddingY}
          x2={width - paddingX}
          y2={height - paddingY}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* AREA */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* LINE */}
        <path
          d={linePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="line-draw"
        />

        {/* POINTS */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#2563eb"
            className="transition-all duration-200 hover:r-5 hover:fill-blue-700"
          />
        ))}
      </svg>

      {/* LABELS */}
      <div
        className="grid mt-4 text-center text-sm text-gray-600"
        style={{
          gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
        }}
      >
        {data.map((d, i) => (
          <div key={i}>
 <p className="text-xs text-gray-500">
  {d.label ?? `${title === "mock tests" ? "Test" : "Interview"} ${i + 1}`}
</p>
            <p className="font-semibold text-gray-900">
              {d.score}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
