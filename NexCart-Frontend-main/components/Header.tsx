"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { LayoutDashboard } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const [token, setToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);

    setToken(Cookies.get("token"));
    setRole(Cookies.get("role"));
  }, [pathname]);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Sellers", href: "/sellers" },
    { label: "About", href: "/about" },
  ];

  // Logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("seller");
    Cookies.remove("customer");

    setToken(undefined);

    router.push("/login");
    router.refresh();
  };

  // Dashboard Redirect
  const goToDashboard = () => {
    const path = role ? `/dashboard/${role}` : "/dashboard";

    router.push(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(2,6,23,0.72)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: 1.3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            {/* ICON */}
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 10px 24px rgba(99,102,241,0.35)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagIcon />
            </Box>

            {/* BRAND NAME */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Friendly Mart
            </Typography>
          </Box>

          {/* NAVIGATION */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "0.25s ease",

                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          {/* AUTH BUTTONS */}
          <Stack direction="row" spacing={1.5}>
            {!token ? (
              <>
                {/* LOGIN */}
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    borderRadius: "12px",
                    px: 2.5,
                    fontWeight: 700,

                    "&:hover": {
                      borderColor: "#6366f1",
                      color: "#ffffff",
                      bgcolor: "rgba(99,102,241,0.12)",
                    },
                  }}
                >
                  Login
                </Button>

                {/* REGISTER */}
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    px: 2.8,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    boxShadow: "0 10px 24px rgba(99,102,241,0.35)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                {/* DASHBOARD */}
                <button
                  onClick={goToDashboard}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 rounded-xl w-full font-semibold text-white text-sm text-left transition-all duration-300"
                >
                  <LayoutDashboard size={15} />

                  Dashboard

                  {role && (
                    <span className="bg-indigo-500/20 ml-auto px-2 py-0.5 border border-indigo-400/20 rounded-md font-bold text-indigo-300 text-xs capitalize">
                      {role}
                    </span>
                  )}
                </button>

                {/* LOGOUT */}
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: "12px",
                    px: 2.5,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg,#ef4444,#dc2626)",
                    color: "#fff",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#dc2626,#b91c1c)",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}