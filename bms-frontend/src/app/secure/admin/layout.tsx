"use client";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import { Button, Grid, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      label: "Dashboard",
      href: "/secure/admin/control",
      icon: DashboardIcon,
    },
    {
      label: "Bookings",
      href: "/secure/admin/control/bookings",
      icon: MenuBookRoundedIcon,
    },
    {
      label: "Rooms",
      href: "/secure/admin/control/rooms",
      icon: MeetingRoomRoundedIcon,
    },
    {
      label: "Content",
      href: "/secure/admin/control/content",
      icon: ArticleRoundedIcon,
    },
    {
      label: "Master Data",
      href: "/secure/admin/control/masterdata",
      icon: StorageRoundedIcon,
    },
    {
      label: "Users",
      href: "/secure/admin/control/users",
      icon: PersonRoundedIcon,
    },
  ];

  const pathname = usePathname();

  return (
    <>
      <div className="mt-24 my-4 ml-5">
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: "1.32rem",
              fontStyle: "italic",
              letterSpacing: "0.05rem",
            }}
          >
            Welcome, Kirk!
          </Typography>
          <Typography
            sx={{
              color: "var(--text-grey-light)",
              fontSize: "0.8rem",
              letterSpacing: "0.02rem",
            }}
          >
            ⓘ Super Admin access enabled. Manage all system features from the
            control panel below.
          </Typography>
        </Stack>
      </div>

      <div className="mb-10">
        <Grid container sx={{ minHeight: "34rem" }}>
          {/* Left grid: button display control */}
          <Grid
            item
            sx={{
              width: "16%",
              maxWidth: "14rem",
              py: 3,
              bgcolor: "var(--button-bg-blue)",
              borderTopRightRadius: ".5rem",
              borderBottomRightRadius: ".5rem",
            }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Stack key={item.label}>
                  <Button
                    href={item.href}
                    component={NextLink}
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      py: 3,
                      px: 2,
                      color: "white",
                      borderRadius: "0",
                      boxShadow: isActive
                        ? "0px 0px 6px var(--box-shadow-light)"
                        : "none",
                      bgcolor: isActive
                        ? "var(--button-bg-blue-active)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: isActive
                          ? "var(--button-bg-blue-active)"
                          : "var(--button-bg-blue-hover)",
                      },
                      borderLeft: isActive ? "2px solid white" : "none",
                    }}
                  >
                    <item.icon
                      sx={{
                        fontSize: isActive ? 32 : 28,
                        mx: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: isActive ? ".95rem" : ".9rem",
                        textTransform: "none",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Button>
                </Stack>
              );
            })}
          </Grid>

          {/* Right grid: child route content */}
          <Grid
            item
            sx={{
              width: "82%",
              ml: ".9rem",
              border: "1px solid var(--stroke-color)",
              borderRadius: ".5rem",
            }}
          >
            <main>{children}</main>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
