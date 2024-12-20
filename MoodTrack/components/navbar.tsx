"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

import { GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import useAuthStore from "@/store/useAuthStore";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Navbar Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href={isDashboardPage ? "/dashboard" : "/"}
          >
            <p className="font-bold text-inherit">
              {isDashboardPage ? "MoodTrack Dashboard" : "MoodTrack"}
            </p>
          </NextLink>
        </NavbarBrand>

        {/* Docs or Playlists Link */}
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            {isDashboardPage ? (
              <NextLink
                className={clsx(
                  "text-foreground hover:text-primary font-medium",
                )}
                href="/dashboard/playlists"
              >
                Playlists
              </NextLink>
            ) : (
              <Link
                isExternal
                className={clsx(
                  "text-foreground hover:text-primary font-medium",
                )}
                href={siteConfig.links.docs} // External link
              >
                Spotify API Docs
              </Link>
            )}
          </NavbarItem>
        </ul>
      </NavbarContent>

      {/* Auth and Theme Controls */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        {/* Login/Logout Button */}
        {!isAuthPage && (
          <NavbarItem className="hidden md:flex">
            {user ? (
              <Button
                className="text-sm font-normal text-default-600 bg-danger-100"
                variant="flat"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button
                  className="text-sm font-normal text-default-600 bg-default-100"
                  variant="flat"
                >
                  Login
                </Button>
              </Link>
            )}
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Responsive Menu */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
