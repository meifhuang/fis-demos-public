import { Link, NavbarItem } from "@heroui/react";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface NavigationLinkProps {
  title: string;
  href: string;
  icon?: ReactElement;
}
export default function NavigationLink({
  title,
  href,
  icon,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isRoot = href === "/";
  const isActive = isRoot ? pathname === href : pathname.startsWith(href);

  return (
    <NavbarItem isActive={isActive}>
      <Link
        href={href}
        className="hover:underline underline-offset-4"
        color={isActive ? "primary" : "foreground"}
        data-testid={`navigation-link-${title
          .split(" ")
          .join("-")
          .toLowerCase()}`}
      >
        {icon && icon}
        {title}
      </Link>
    </NavbarItem>
  );
}
