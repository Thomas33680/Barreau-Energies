import { siteConfig } from "@/lib/site-config";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-ink pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 py-4 text-sm font-semibold text-white"
      >
        Appeler
      </a>
      <div className="w-px bg-white/10" />
      <a
        href="/contact"
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 bg-brand-green py-4 text-sm font-semibold text-white"
      >
        Demander un devis
      </a>
    </div>
  );
}
