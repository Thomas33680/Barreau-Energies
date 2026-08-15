"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ServiceDetailSection, icons, colorClasses } from "@/components/ServiceDetailSection";
import { Service } from "@/lib/site-config";

export function ServicesMobileExplorer({ services }: { services: Service[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openService = services.find((s) => s.slug === openSlug) ?? null;

  if (openService) {
    return (
      <div>
        <div className="sticky top-20 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
          <Container>
            <button
              type="button"
              onClick={() => setOpenSlug(null)}
              className="flex cursor-pointer items-center gap-2 py-3 text-sm font-semibold text-ink/70"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Tous les services
            </button>
          </Container>
        </div>
        <ServiceDetailSection service={openService} />
      </div>
    );
  }

  return (
    <Container className="py-10">
      <StaggerGroup className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = icons[service.slug];
          const colors = colorClasses[service.color];
          return (
            <StaggerItem key={service.slug}>
              <button
                type="button"
                onClick={() => setOpenSlug(service.slug)}
                className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-6 text-center shadow-sm transition-colors active:border-ink/25"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} ${colors.text}`}
                >
                  <Icon size={30} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-ink">{service.shortName}</span>
              </button>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Container>
  );
}
