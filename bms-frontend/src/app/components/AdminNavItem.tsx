"use client";

import { SvgIconComponent } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";

type NavItem = {
  label: string;
  href: string;
  icon: SvgIconComponent;
  iconSize: number;
};

type ControlFacilityButtonProps = {
  navItems: NavItem[];
};

export default function ControlFacilityButton({
  navItems,
}: ControlFacilityButtonProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3.2,
        px: 4,
        py: 2,
        flexWrap: "wrap",
      }}
    >
      {navItems.map((item) => (
        <Box
          key={item.label}
          component={NextLink}
          href={item.href}
          sx={{
            width: "8rem",
            textDecoration: "none",
            boxShadow: "0px 0px 8px var(--box-shadow)",
            borderRadius: "0.5rem",
            overflow: "hidden",
            textAlign: "center",
            aspectRatio: "9 / 8",
            "&:hover": { bgcolor: "var(--button-bg-blue-light-hover)" },
          }}
        >
          <Button
            sx={{
              width: "100%",
              height: "100%",
              "&:hover": { bgcolor: "transparent" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: ".8rem",
            }}
          >
            <item.icon
              sx={{
                fontSize: item.iconSize,
                color: "var(--icon-blue-dark)",
                mt: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "var(--text-blue-dark)",
                fontSize: "0.7rem",
                letterSpacing: "0.03rem",
                textTransform: "capitalize",
              }}
            >
              {item.label}
            </Typography>
          </Button>
        </Box>
      ))}
    </Box>
  );
}
