import { cn } from "../../lib/cn";
import { Pill } from "./Pill";

/** Consistent section intro: pill, title, and description. */
export function SectionHead({
  pill,
  title,
  description,
  split = false,
  action,
  className,
  titleFirst = false,
}) {
  const intro = titleFirst ? (
    <>
      {title}
      {pill ? <Pill className="mt-3.5">{pill}</Pill> : null}
      {description}
    </>
  ) : (
    <>
      {pill ? <Pill>{pill}</Pill> : null}
      {title}
      {description}
    </>
  );

  return (
    <div
      className={cn(
        "mx-auto mb-12 max-w-[720px] text-center",
        "[&_h2]:my-3.5 [&_h2]:font-display [&_h2]:text-[clamp(34px,4.8vw,56px)] [&_h2]:font-medium [&_h2]:leading-[1.08] [&_h2]:tracking-[-0.04em]",
        "[&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-muted",
        titleFirst && "[&_h2]:mt-0 [&_h2]:mb-0",
        split &&
          "mb-10 flex max-w-none items-end justify-between gap-6 text-left max-[980px]:flex-col max-[980px]:items-start [&_p]:mx-0",
        className,
      )}
    >
      {split ? (
        <>
          <div>{intro}</div>
          {action}
        </>
      ) : (
        <>
          {intro}
          {action}
        </>
      )}
    </div>
  );
}
