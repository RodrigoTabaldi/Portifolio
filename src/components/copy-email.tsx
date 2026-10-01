"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText("rodrigotabaldi01@gmail.com");
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }
  return (
    <div className="copy-control">
      <ShinyButton
        className="button-secondary"
        label={status === "copied" ? "E-mail copiado" : "Copiar e-mail"}
        onClick={copy}
      >
        {status === "copied" ? <Check size={17} /> : <Copy size={17} />}{" "}
        {status === "copied" ? "E-mail copiado" : "Copiar e-mail"}
      </ShinyButton>
      <span className="copy-status" role="status">
        {status === "error"
          ? "Selecione o e-mail ao lado para copiar."
          : status === "copied"
            ? "Pronto para colar."
            : ""}
      </span>
    </div>
  );
}
