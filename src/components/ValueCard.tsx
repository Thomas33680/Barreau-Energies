import {
  ShieldCheck,
  Award,
  TrendingUp,
  MapPin,
  Leaf,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Confiance: ShieldCheck,
  Expertise: Award,
  Performance: TrendingUp,
  Proximité: MapPin,
  Responsabilité: Leaf,
  Innovation: Lightbulb,
};

export function ValueCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const Icon = icons[name] ?? ShieldCheck;

  return (
    <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-bold text-white">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
    </div>
  );
}
