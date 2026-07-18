import Link from "next/link";
import { Flame, Snowflake, Droplets, ArrowRight, LucideIcon } from "lucide-react";
import { Service } from "@/lib/site-config";

const icons: Record<Service["slug"], LucideIcon> = {
  "pompes-a-chaleur": Flame,
  climatisation: Snowflake,
  "chauffe-eau-thermodynamique": Droplets,
};

const colorClasses: Record<Service["color"], { bg: string; text: string }> = {
  blue: { bg: "bg-brand-blue/10", text: "text-brand-blue" },
  green: { bg: "bg-brand-green/10", text: "text-brand-green" },
  orange: { bg: "bg-brand-orange/10", text: "text-brand-orange" },
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.slug];
  const colors = colorClasses[service.color];

  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex cursor-pointer flex-col rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
      >
        <Icon size={28} strokeWidth={2} aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-ink">{service.shortName}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
        {service.summary}
      </p>
      <span
        className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${colors.text}`}
      >
        En savoir plus
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
