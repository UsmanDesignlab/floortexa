import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

export function AnimatedTitle({ text, className }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1
      className={cn(
        "max-w-5xl font-display text-[clamp(42px,6.5vw,72px)] font-medium leading-[0.98] tracking-[-0.03em]",
        className,
      )}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={cn(
            "inline-block transition-[opacity,filter,transform] duration-500 ease-out",
            ready ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[6px]",
          )}
          style={{ transitionDelay: `${80 + i * 45}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
