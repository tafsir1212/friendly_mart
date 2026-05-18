"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #081028 0%, #0f172a 35%, #111c44 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Effects */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(0, 212, 255, 0.18)",
          filter: "blur(120px)",
          top: -120,
          left: -120,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(168, 85, 247, 0.18)",
          filter: "blur(120px)",
          bottom: -120,
          right: -100,
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.05fr 0.95fr",
            },
            gap: 8,
            alignItems: "center",
            py: 8,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="Next Generation Ecommerce Platform"
              sx={{
                mb: 3,
                px: 1.5,
                py: 2.7,
                borderRadius: "999px",
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#fff",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "3rem",
                  md: "5.5rem",
                },
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-3px",
                color: "#fff",
                maxWidth: 760,
              }}
            >
              Welcome to{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg,#38bdf8,#22c55e,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Friendly Mart
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "rgba(255,255,255,0.72)",
                fontSize: "1.1rem",
                lineHeight: 1.9,
                maxWidth: 620,
              }}
            >
              A modern multi-vendor ecommerce ecosystem for customers,
              sellers, riders, and managers. Experience smarter shopping,
              lightning-fast delivery, and powerful business management —
              all inside one beautiful platform.
            </Typography>

            {/* BUTTONS */}
            <Box
              sx={{
                mt: 5,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.7,
                  borderRadius: "18px",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: 16,
                  background:
                    "linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)",
                  boxShadow: "0 15px 40px rgba(59,130,246,0.35)",
                }}
              >
                Explore Products
              </Button>

              <Button
                component={Link}
                href="/seller/register"
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.7,
                  borderRadius: "18px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    background: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Become Seller
              </Button>
            </Box>

            {/* STATS */}
            <Box
              sx={{
                mt: 7,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3,1fr)",
                },
                gap: 2,
                maxWidth: 720,
              }}
            >
              <StatCard value="25K+" label="Happy Customers" />
              <StatCard value="500+" label="Trusted Sellers" />
              <StatCard value="24/7" label="Fast Delivery" />
            </Box>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "32px",
                p: 3,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
            >
              {/* TOP */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 14,
                    }}
                  >
                    Platform Overview
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      color: "#fff",
                      fontWeight: 900,
                    }}
                  >
                    Friendly Mart
                  </Typography>
                </Box>

                <Chip
                  icon={<TrendingUpRoundedIcon />}
                  label="Live Analytics"
                  sx={{
                    bgcolor: "rgba(34,197,94,0.16)",
                    color: "#4ade80",
                    fontWeight: 800,
                    border: "1px solid rgba(74,222,128,0.3)",
                  }}
                />
              </Box>

              {/* GRID */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                <DashboardCard
                  title="Orders"
                  value="12,480"
                  subtitle="Growing rapidly"
                  gradient="linear-gradient(135deg,#06b6d4,#2563eb)"
                  icon={<ShoppingBagRoundedIcon />}
                />

                <DashboardCard
                  title="Sellers"
                  value="320"
                  subtitle="Verified stores"
                  gradient="linear-gradient(135deg,#9333ea,#d946ef)"
                  icon={<StorefrontRoundedIcon />}
                />

                <DashboardCard
                  title="Deliveries"
                  value="2,430"
                  subtitle="Completed today"
                  gradient="linear-gradient(135deg,#10b981,#22c55e)"
                  icon={<LocalShippingRoundedIcon />}
                />

                <DashboardCard
                  title="Revenue"
                  value="৳4.2M"
                  subtitle="Monthly income"
                  gradient="linear-gradient(135deg,#f59e0b,#f97316)"
                  icon={<TrendingUpRoundedIcon />}
                />
              </Box>

              {/* ROLE SECTION */}
              <Box
                sx={{
                  mt: 4,
                  borderRadius: "24px",
                  p: 3,
                  background:
                    "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  System Roles
                </Typography>

                <Box
                  sx={{
                    mt: 2.5,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      sm: "repeat(4,1fr)",
                    },
                    gap: 2,
                  }}
                >
                  <RoleCard
                    icon={<AdminPanelSettingsRoundedIcon />}
                    label="Admin"
                  />

                  <RoleCard
                    icon={<StorefrontRoundedIcon />}
                    label="Seller"
                  />

                  <RoleCard
                   icon={<ManageAccountsRoundedIcon />}
                   label="Manager"
                   />

                  <RoleCard icon={<PersonRoundedIcon />} label="Customer" />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function DashboardCard({
  title,
  value,
  subtitle,
  gradient,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  gradient: string;
  icon: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "24px",
        background: gradient,
        position: "relative",
        overflow: "hidden",
        minHeight: 170,
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -30,
          top: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
        }}
      />

      <Box sx={{ color: "white", opacity: 0.9 }}>{icon}</Box>

      <Typography
        sx={{
          mt: 2,
          color: "rgba(255,255,255,0.8)",
          fontSize: 14,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          mt: 1,
          fontWeight: 900,
          color: "#fff",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "rgba(255,255,255,0.75)",
          fontSize: 14,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "24px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 900,
          fontSize: "2rem",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "rgba(255,255,255,0.65)",
          fontSize: 14,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function RoleCard({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <Box
      sx={{
        py: 2.5,
        px: 2,
        borderRadius: "20px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
        color: "#fff",
        fontWeight: 700,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          background: "rgba(255,255,255,0.12)",
        },
      }}
    >
      {icon}
      {label}
    </Box>
  );
}