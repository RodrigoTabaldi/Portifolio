import Image from "next/image";
import { Braces, Cloud, Code, Database, Globe, Terminal } from "lucide-react";
import technologyIcons from "@/data/technology-icons.json";

export function ProjectTechnology({ name }: { name: string }) {
  const src = (technologyIcons as Record<string, string>)[name];
  const Icon = name === "ASP.NET" ? Globe : name === "SQL Server" ? Database : name === "AWS" ? Cloud : name === "PowerShell" ? Terminal : name === "C#" ? Braces : Code;
  return (
    <span className="project-technology">
      {src ? <Image src={src} alt="" width={16} height={16} unoptimized /> : <Icon size={16} strokeWidth={1.8} aria-hidden="true" />}
      {name}
    </span>
  );
}
