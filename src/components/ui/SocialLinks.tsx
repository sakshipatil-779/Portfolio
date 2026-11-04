import React from "react";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

export function SocialLinks({
  className,
  iconSize = "md",
  showLabels = false,
}: SocialLinksProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const iconClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const links = [
    {
      name: "GitHub",
      href: PERSONAL_INFO.contact.github,
      icon: GithubIcon,
      label: "GitHub Profile",
      external: true,
    },
    {
      name: "LinkedIn",
      href: PERSONAL_INFO.contact.linkedin,
      icon: LinkedinIcon,
      label: "LinkedIn Profile",
      external: true,
    },
    {
      name: "Email",
      href: `mailto:${PERSONAL_INFO.contact.email}`,
      icon: Mail,
      label: PERSONAL_INFO.contact.email,
      external: false,
    },
    {
      name: "Phone",
      href: `tel:${PERSONAL_INFO.contact.phone}`,
      icon: Phone,
      label: PERSONAL_INFO.contact.phoneDisplay,
      external: false,
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#121923]/60 text-[#A0AAB8] transition-all duration-300 hover:border-[#69E5DC]/50 hover:bg-[#121923] hover:text-[#69E5DC] hover:shadow-[0_0_15px_rgba(105,229,220,0.15)] group",
              showLabels ? "px-4 py-2 gap-2 h-auto" : sizeClasses[iconSize]
            )}
          >
            <Icon className={cn(iconClasses[iconSize], "transition-transform group-hover:scale-110")} />
            {showLabels && <span className="font-medium text-xs sm:text-sm">{link.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
