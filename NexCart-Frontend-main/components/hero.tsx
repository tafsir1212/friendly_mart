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
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, #172554 0%, #0f172a 40%, #020617 100%)",
      }}
    >
      {/* BACKGROUND GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.18)",
          filter: "blur(120px)",
          top: -150,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(168,85,247,0.16)",
          filter: "blur(120px)",
          bottom: -180,
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
            py: 10,
          }}
        >
          {/* LEFT CONTENT */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="Smart Multi Vendor Ecommerce Platform"
              sx={{
                mb: 4,
                py: 2.8,
                px: 1.2,
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "3.1rem",
                  md: "5.8rem",
                },
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-4px",
                color: "#fff",
                maxWidth: 760,
              }}
            >
              Discover the Future of{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg,#38bdf8,#818cf8,#c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Friendly Mart
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 4,
                fontSize: "1.08rem",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.9,
                maxWidth: 640,
              }}
            >
              Friendly Mart connects customers, sellers, delivery riders,
              and management teams into one intelligent ecommerce ecosystem.
              Enjoy secure shopping, real-time delivery tracking, seamless
              business operations, and powerful analytics.
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
                size="large"
                variant="contained"
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: "18px",
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg,#2563eb,#4f46e5,#9333ea)",
                  boxShadow: "0 20px 50px rgba(79,70,229,0.35)",
                }}
              >
                Explore Marketplace
              </Button>

              <Button
                component={Link}
                href="/seller/register"
                size="large"
                variant="outlined"
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: "18px",
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "#60a5fa",
                  },
                }}
              >
                Become a Seller
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
                maxWidth: 760,
              }}
            >
              <StatCard value="30K+" label="Active Customers" />
              <StatCard value="850+" label="Trusted Vendors" />
              <StatCard value="99.9%" label="Fast Service" />
            </Box>
          </Box>

          {/* RIGHT CONTENT */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "34px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.4)",
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                    }}
                  >
                    Dashboard Overview
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
                  label="Realtime"
                  sx={{
                    color: "#4ade80",
                    fontWeight: 800,
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                />
              </Box>

              {/* CARDS */}
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
                  value="18,240"
                  subtitle="+24% this month"
                  icon={<ShoppingBagRoundedIcon />}
                  gradient="linear-gradient(135deg,#2563eb,#4f46e5)"
                />

                <DashboardCard
                  title="Vendors"
                  value="540"
                  subtitle="Verified Stores"
                  icon={<StorefrontRoundedIcon />}
                  gradient="linear-gradient(135deg,#9333ea,#c026d3)"
                />

                <DashboardCard
                  title="Deliveries"
                  value="4,120"
                  subtitle="Delivered Today"
                  icon={<LocalShippingRoundedIcon />}
                  gradient="linear-gradient(135deg,#059669,#22c55e)"
                />

                <DashboardCard
                  title="Revenue"
                  value="৳5.6M"
                  subtitle="Monthly Growth"
                  icon={<TrendingUpRoundedIcon />}
                  gradient="linear-gradient(135deg,#f59e0b,#ea580c)"
                />
              </Box>

              {/* ROLE SECTION */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg,rgba(37,99,235,0.18),rgba(147,51,234,0.18))",
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
                  User Access Roles
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

                  <RoleCard
                    icon={<PersonRoundedIcon />}
                    label="Customer"
                  />
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
        minHeight: 175,
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          top: -35,
          right: -35,
        }}
      />

      <Box sx={{ color: "#fff", opacity: 0.95 }}>
        {icon}
      </Box>

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
          color: "#fff",
          fontWeight: 900,
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
        borderRadius: "22px",
        background: "rgba(255,255,255,0.05)",
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
          color: "rgba(255,255,255,0.62)",
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
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
        color: "#fff",
        fontWeight: 700,
        transition: "0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          background: "rgba(255,255,255,0.12)",
        },
      }}
    >
      {icon}
      {label}
    </Box>
  );
}