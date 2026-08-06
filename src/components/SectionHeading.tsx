export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-green">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/70" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
