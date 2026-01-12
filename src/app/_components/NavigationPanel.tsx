"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import NavigationLink from "@/app/_components/NavigationLink";
import { useState } from "react";

interface MobileMenuItem {
  label: string;
  href: string;
  color?:
    | "danger"
    | "primary"
    | "foreground"
    | "secondary"
    | "success"
    | "warning";
}

export default function NavigationPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const menuItems: Array<MobileMenuItem> = [
    { label: "Dashboard", href: "/" },
    { label: "Learner Profiles", href: "/learner-profiles" },
  ];

  const mobileMenuItems: Array<MobileMenuItem> = [
    ...menuItems,
    { label: "Settings", href: "/account" },
    { label: "Logout", href: "#", color: "danger" },
  ];

  return (
    <Navbar isBordered className="bg-background" isMenuOpen={isMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden cursor-pointer"
        onChange={(isOpen) => setIsMenuOpen(isOpen)}
      />
      <NavbarBrand>
        {/* Flatiron School Logo */}
        <svg aria-label="Flatiron School" role="img" width="204" height="30" viewBox="0 0 320 34">
          <path d="M36.686 33.555V1.445h15.54v4.803h-9.972v8.273h7.471v4.802h-7.47v14.219l-5.57.013Zm18.784 0V1.445h5.57v27.307h8.76v4.803H55.47Zm22.957 0h-5.39l5.973-32.11h6.916l5.974 32.11h-5.39l-.986-7.116h-6.121l-.977 7.116Zm1.796-11.919h4.49L82.514 7.863h-.092l-2.199 13.773Zm17.37-15.388h-5.38V1.446h16.351v4.802h-5.393v27.307h-5.578V6.248Zm15.183 27.307V1.445h5.559v32.11h-5.559Zm17.447 0h-5.569V1.445h7.815c6.242 0 9.433 2.623 9.433 9.48 0 5.16-2.023 7.248-3.909 8.095l4.717 14.535h-5.658l-3.954-13.296c-.954.094-1.913.139-2.872.132l-.003 13.164Zm0-17.695h1.975c3.009 0 4.132-1.112 4.132-4.935 0-3.824-1.123-4.958-4.132-4.958h-1.975v9.893Zm15.812-6.632c0-4.537 2.696-8.215 8.536-8.215s8.533 3.69 8.533 8.215v16.544c0 4.538-2.696 8.215-8.533 8.215-5.836 0-8.536-3.69-8.536-8.215V9.228Zm5.572 16.411c0 2.402.718 3.558 2.964 3.558 2.247 0 2.965-1.156 2.965-3.558V9.361c0-2.402-.721-3.558-2.965-3.558-2.243 0-2.964 1.156-2.964 3.558v16.278Zm16.533 7.916V1.445h5.167l6.781 18.368h.092V1.446h5.03v32.109h-4.851l-7.097-20.058h-.089v20.058h-5.033ZM208.923 9.36c-.226-2.758-1.707-3.557-2.964-3.557-1.797 0-2.786 1.156-2.786 3.16 0 5.472 11.319 8.095 11.319 16.812 0 5.293-3.593 8.215-8.804 8.215-5.212 0-8.132-4.107-8.355-8.894l5.301-.755c.223 3.245 1.528 4.847 3.325 4.847 1.914 0 3.232-1.024 3.232-2.936 0-6.36-11.319-8.05-11.319-17.255 0-5.115 3.144-8.006 8.617-8.006 4.534 0 7.231 3.245 7.725 7.782l-5.291.588Zm20.667 2.803v-2.49c0-2.714-1.258-3.87-2.694-3.87-2.234 0-2.964 1.156-2.964 3.558v16.278c0 2.402.718 3.558 2.964 3.558 2.02 0 2.694-1.156 2.694-3.248v-3.867h5.571v3.69c0 4.538-2.696 8.215-8.265 8.215-5.84 0-8.536-3.69-8.536-8.215V9.228c0-4.537 2.696-8.215 8.536-8.215 5.569 0 8.265 4.003 8.265 8.806v2.357l-5.571-.013Zm9.803 21.392V1.445h5.568V14.52h5.93V1.447h5.571v32.109h-5.571v-14.22h-5.93v14.22h-5.568Zm22.083-24.327c0-4.537 2.696-8.215 8.536-8.215s8.521 3.69 8.521 8.215v16.544c0 4.538-2.697 8.215-8.534 8.215-5.836 0-8.536-3.69-8.536-8.215l.013-16.544Zm5.568 16.411c0 2.402.718 3.558 2.965 3.558s2.965-1.156 2.965-3.558V9.361c0-2.402-.722-3.558-2.965-3.558s-2.965 1.156-2.965 3.558v16.278Zm15.991-16.411c0-4.537 2.694-8.215 8.534-8.215 5.839 0 8.533 3.69 8.533 8.215v16.544c0 4.538-2.694 8.215-8.533 8.215-5.84 0-8.534-3.69-8.534-8.215V9.228Zm5.569 16.411c0 2.402.718 3.558 2.965 3.558 2.246 0 2.964-1.156 2.964-3.558V9.361c0-2.402-.718-3.558-2.964-3.558-2.247 0-2.965 1.156-2.965 3.558v16.278Zm16.068 7.916V1.445h5.571v27.307h8.76v4.803h-14.331ZM0 34h5.69l9.908-32.99H9.905L0 34Zm11.39 0h5.692l9.906-32.99h-5.693L11.389 34Z"/>
        </svg>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        {menuItems.map(({ label, href }, index) => (
          <NavigationLink key={`${label}-${index}`} title={label} href={href} />
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <User
            data-testid="account"
            isFocusable
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
            name="Kylon Tyner"
            className="cursor-pointer p-2 hover:bg-gray-200 transition-background"
            onClick={() => router.push("/account")}
          />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {mobileMenuItems.map(({ label, href, color }, index) => (
          <NavbarMenuItem
            key={`${label}-${index}`}
            isActive={pathname === href}
          >
            <Link
              data-testid={`mobile-navigation-link-${label
                .split(" ")
                .join("-")
                .toLowerCase()}`}
              className="w-full"
              color={color ?? (pathname === href ? "primary" : "foreground")}
              href={href}
              size="lg"
              onClick={closeMenu}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
