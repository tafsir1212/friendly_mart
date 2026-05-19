"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Icons
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

// Premium Dark Blue Palette
const DARK_BLUE_COLORS = {
  bg: "#030712",
  bgGradientEnd: "#0B1530", // Deep navy depth
  cardBg: "rgba(15, 23, 42, 0.65)", // Glass dark panel
  accentCyan: "#38bdf8",
  accentMint: "rgba(16, 185, 129, 0.15)", // Translucent mint
  accentAmber: "rgba(245, 158, 11, 0.15)", // Translucent amber
  mintText: "#34d399",
  amberText: "#fbbf24",
  text: {
    primary: "#f9fafb",
    secondary: "#9ca3af",
  },
};

const backgroundPatternCss = `
  background-color: ${DARK_BLUE_COLORS.bg};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%27 height='100%27 viewBox='0 0 1600 800'%3E%3Cpath fill='%23ffffff04' d='M0,160 C320,320 640,0 960,160 C1280,320 1600,0 1600,0 V800 H0 Z'/%3E%3C/svg%3E");
  background-size: cover;
  background-attachment: fixed;
`;

export default function HeroDarkBlueVariation() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${DARK_BLUE_COLORS.bg} 0%, ${DARK_BLUE_COLORS.bgGradientEnd} 100%)`,
        "::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
          css: backgroundPatternCss,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 3 }}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: { xs: 6, md: 10 },
            alignItems: "center",
            py: { xs: 8, md: 10 },
          }}
        >
          {/* LEFT CONTENT */}
          <Box>
            <Chip
              icon={<HubRoundedIcon style={{ color: DARK_BLUE_COLORS.accentCyan, fontSize: "1.1rem" }} />}
              label="Connected Commerce Hub"
              sx={{
                mb: 4,
                px: 1,
                py: 0.5,
                borderRadius: "100px",
                background: "rgba(255, 255, 255, 0.04)",
                color: DARK_BLUE_COLORS.text.primary,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(8px)",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            />

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2.75rem",
                  sm: "3.5rem",
                  lg: "4.25rem",
                },
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: DARK_BLUE_COLORS.text.primary,
                maxWidth: 700,
              }}
            >
              Unified Retail Management for{" "}
              <Box
                component="span"
                sx={{
                  color: DARK_BLUE_COLORS.accentCyan,
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Modern Brands.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 4,
                fontSize: "1.125rem",
                color: DARK_BLUE_COLORS.text.secondary,
                lineHeight: 1.8,
                maxWidth: 600,
                fontWeight: 400,
              }}
            >
              Friendly Mart synchronizes your entire supply chain. From local vendor onboarding to multi-channel fulfillment and powerful BI reporting, manage everything through one clean, intelligent platform.
            </Typography>

            {/* BUTTONS */}
            <Box
              sx={{
                mt: 6,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2.5,
              }}
            >
              <Button
                component={Link}
                href="/products"
                size="large"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  background: `linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)`,
                  boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "#3b82f6",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px -5px rgba(37, 99, 235, 0.5)",
                  },
                }}
              >
                Access Platform
              </Button>

              <Button
                component={Link}
                href="/demo"
                size="large"
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: DARK_BLUE_COLORS.text.primary,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                Request a Demo
              </Button>
            </Box>
          </Box>

          {/* RIGHT CONTENT - Multi-layered Dark Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "repeat(12, 1fr)",
              width: "100%",
              height: { xs: "auto", md: 550 },
              minHeight: { xs: 400, md: "none" },
              position: "relative",
            }}
          >
            {/* Ambient backdrop glow behind dashboard blocks */}
            <Box
              sx={{
                position: "absolute",
                width: 350,
                height: 350,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(0,0,0,0) 70%)",
                filter: "blur(50px)",
                top: "10%",
                left: "15%",
                zIndex: 0,
              }}
            />

            {/* Top Right Card */}
            <ModuleCard
              sx={{ gridColumn: "7 / -1", gridRow: "1 / 7", background: DARK_BLUE_COLORS.accentMint }}
              icon={<ShoppingBagRoundedIcon />}
              iconColor={DARK_BLUE_COLORS.mintText}
              title="Realtime Activity"
              value="৳42,880"
              subtitle="Processing now"
              pulsing
            />

            {/* Main Interactive Center Slab */}
            <Paper
              elevation={0}
              sx={{
                gridColumn: "1 / 9",
                gridRow: "4 / 11",
                p: 3,
                borderRadius: "24px",
                background: DARK_BLUE_COLORS.cardBg,
                border: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
                zIndex: 2,
              }}
            >
              <Typography sx={{ color: DARK_BLUE_COLORS.text.secondary, fontSize: "0.85rem", fontWeight: 600, mb: 1.5 }}>
                Platform Hub
              </Typography>
              <Typography variant="h5" sx={{ color: DARK_BLUE_COLORS.text.primary, fontWeight: 800, mb: 3 }}>
                Friendly Mart Central
              </Typography>

              <Box sx={{ display: "flex", gap: 1.5 }}>
                <HubLinkItem icon={<AssessmentRoundedIcon />} label="Analytics" />
                <HubLinkItem icon={<Inventory2RoundedIcon />} label="Inventory" />
                <HubLinkItem icon={<StorefrontRoundedIcon />} label="Vendors" />
              </Box>
            </Paper>

            {/* Bottom Right Card */}
            <ModuleCard
              sx={{ gridColumn: "8 / -1", gridRow: "9 / -1", background: DARK_BLUE_COLORS.accentAmber }}
              icon={<GroupAddRoundedIcon />}
              iconColor={DARK_BLUE_COLORS.amberText}
              title="New Vendors"
              value="+14"
              subtitle="Pending review"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ==========================================================================
   SUPPORTING ATOMS
   ========================================================================== */

function ModuleCard({
  icon,
  iconColor,
  title,
  value,
  subtitle,
  background,
  pulsing,
  sx,
}: {
  icon: ReactNode;
  iconColor: string;
  title: string;
  value: string;
  subtitle: string;
  background: string;
  pulsing?: boolean;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: "20px",
        background: background,
        border: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1.25,
            borderRadius: "12px",
            background: "rgba(3, 7, 18, 0.4)",
            color: iconColor,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {icon}
        </Box>

        {pulsing && <PulseDot />}
      </Box>

      <Typography sx={{ color: DARK_BLUE_COLORS.text.secondary, fontSize: "0.8rem", fontWeight: 600 }}>
        {title}
      </Typography>

      <Typography sx={{ mt: 0.5, color: DARK_BLUE_COLORS.text.primary, fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em" }}>
        {value}
      </Typography>

      <Typography sx={{ mt: "auto", color: DARK_BLUE_COLORS.text.secondary, fontSize: "0.75rem", opacity: 0.7 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

function HubLinkItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Box
      sx={{
        flex: 1,
        py: 2,
        px: 1,
        borderRadius: "14px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        color: DARK_BLUE_COLORS.text.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
        textAlign: "center",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        "& .MuiSvgIcon-root": { color: DARK_BLUE_COLORS.accentCyan, fontSize: "1.25rem" },
        "&:hover": {
          transform: "translateY(-3px)",
          background: "rgba(255, 255, 255, 0.08)",
          borderColor: DARK_BLUE_COLORS.accentCyan,
        },
      }}
    >
      {icon}
      {label}
    </Box>
  );
}

function PulseDot() {
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: DARK_BLUE_COLORS.mintText,
        position: "relative",
        "::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          borderRadius: "50%",
          background: DARK_BLUE_COLORS.mintText,
          animation: "pulse 2s infinite",
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(1)", opacity: 0.8 },
          "100%": { transform: "scale(3.5)", opacity: 0 },
        },
      }}
    />
  );
}