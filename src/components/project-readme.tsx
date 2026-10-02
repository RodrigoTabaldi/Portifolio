"use client";

import { Children, isValidElement, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import architectureDiagrams from "@/data/architecture-diagrams.json";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

export function ProjectReadme({ path, english }: { path: string | null; english: boolean }) {
  const [content, setContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    fetch(path, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`README HTTP ${response.status}`);
        return response.text();
      })
      .then(setContent)
      .catch(error => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, [path]);

  if (!path) return <p>{english ? "This repository does not have a README." : "Este repositório não possui README."}</p>;
  if (failed) return <p role="alert">{english ? "Could not load the README. Use the GitHub link below." : "Não foi possível carregar o README. Use o link do GitHub abaixo."}</p>;
  if (content === null) return <p role="status">{english ? "Loading README…" : "Carregando README…"}</p>;

  return (
    <div className="project-readme">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug, rehypeSanitize]} components={{
        pre: ({ children }) => {
          const child = Children.toArray(children)[0];
          if (isValidElement<{ className?: string; children?: ReactNode }>(child) && child.props.className === "language-mermaid") {
            const definition = String(child.props.children).trim();
            const src = (architectureDiagrams as Record<string, string>)[definition];
            if (src) return (
              <figure className="project-architecture-image">
                <a href={src} target="_blank" rel="noopener noreferrer" aria-label={english ? "Open architecture diagram" : "Abrir diagrama de arquitetura"}>
                  <Image src={src} alt={english ? "Project architecture diagram from the README" : "Diagrama de arquitetura do projeto extraído do README"} width={1600} height={1000} unoptimized />
                </a>
                <figcaption>{english ? "Architecture · click to enlarge" : "Arquitetura · clique para ampliar"}</figcaption>
              </figure>
            );
          }
          return <pre>{children}</pre>;
        },
        a: ({ href, children }) => <a href={href?.startsWith("#") ? `#user-content-${href.slice(1)}` : href} target={href?.startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer">{children}</a>,
        // README images have different aspect ratios; preserve their intrinsic dimensions.
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" />,
      }}>{content}</Markdown>
    </div>
  );
}
