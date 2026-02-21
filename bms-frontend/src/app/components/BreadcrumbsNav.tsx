"use client";

import { Box, Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";

type Crumb = {
  label: string;
  href?: string;
  active?: boolean;
};

type BreadcrumbsNavProps = {
  crumbs: Crumb[];
};

export default function BreadcrumbsNav({ crumbs }: BreadcrumbsNavProps) {
  return (
    <Box
      sx={{
        m: 1.2,
        py: 1,
        px: 1.5,
        backgroundColor: "var(--breadcrum-background)",
        borderRadius: "calc(0.5rem * (200 / 400))",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "var(--text-light)",
          },
        }}
      >
        {crumbs.map((crumb, index) => (
          <Link
            key={index}
            component={crumb.active ? "span" : NextLink}
            href={crumb.active ? undefined : crumb.href || "#"}
            underline={crumb.active ? "none" : "hover"}
            color={crumb.active ? "text.primary" : "inherit"}
            sx={{
              fontSize: ".8rem",
              color: "var(--text-light)",
              pointerEvents: crumb.active ? "none" : "auto",
              cursor: crumb.active ? "default" : "pointer",
            }}
          >
            {crumb.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
