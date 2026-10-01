import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

const technologies = [
  { name: "C#", mark: "C#", color: "#68217A" },
  { name: ".NET", mark: ".NET", color: "#512BD4" },
  { name: "ASP.NET", mark: "ASP.NET", color: "#0877C9" },
  { name: "PYTHON", mark: "", color: "#306998" },
  { name: "REACT", mark: "", color: "#20252D" },
  { name: "TYPESCRIPT", mark: "TS", color: "#3178C6" },
  { name: "NODE.JS", mark: "nodedotjs", color: "#339933" },
  { name: "NESTJS", mark: "nestjs", color: "#E0234E" },
] as const;

function TechnologySymbol({ name, mark }: { name: string; mark?: string }) {
  if (name === "C#" || name === ".NET" || name === "ASP.NET") {
    return <span className={`stack-wordmark stack-wordmark-${name.replace(/[^a-z0-9]/gi, "").toLowerCase()}`} aria-hidden="true">{mark}</span>;
  }
  if (name === "PYTHON") return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#3776AB" d="M12 2C8 2 7 3.6 7 6v2h6v1H5C2.8 9 2 11 2 14s1.1 5 4 5h2v-3c0-2.2 1.8-4 4-4h5c1.7 0 3-1.3 3-3V6c0-2.6-2.1-4-8-4Zm-2 3a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 10 5Z" />
      <path fill="#FFD43B" d="M12 22c4 0 5-1.6 5-4v-2h-6v-1h8c2.2 0 3-2 3-5s-1.1-5-4-5h-2v3c0 2.2-1.8 4-4 4H7c-1.7 0-3 1.3-3 3v3c0 2.6 2.1 4 8 4Zm2-3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
    </svg>
  );
  if (name === "REACT") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
  if (name === "NODE.JS" || name === "NESTJS") {
    const color = name === "NODE.JS" ? "339933" : "E0234E";
    return <Image src={`https://cdn.simpleicons.org/${mark}/${color}`} alt="" width={24} height={24} unoptimized />;
  }
  return <span aria-hidden="true">{mark}</span>;
}

export function FeaturedStack() {
  const { language } = useLanguage();
  return (
    <div className="featured-stack" aria-label={language === "en" ? "Key technologies" : "Principais tecnologias"}>
      {technologies.map(({ name, mark, color }) => (
        <span key={name} style={{ "--brand": color } as React.CSSProperties}>
          <b className="stack-mark"><TechnologySymbol name={name} mark={mark} /></b>
          <strong>{name}</strong>
        </span>
      ))}
    </div>
  );
}
