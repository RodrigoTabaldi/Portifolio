"use client";

import ShinyButton from "@/components/ui/shiny-button";

export default function ShinyButtonDemo() {
  return (
    <main
      style={{
        display: "grid",
        minHeight: "100vh",
        width: "100%",
        placeItems: "center",
        background: "#000000",
      }}
    >
      <ShinyButton label="Get Started" />
    </main>
  );
}
