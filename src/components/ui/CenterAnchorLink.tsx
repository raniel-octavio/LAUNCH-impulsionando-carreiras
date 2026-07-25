"use client";

export function CenterAnchorLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      history.replaceState(null, "", href); // não empilha entrada nova
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}