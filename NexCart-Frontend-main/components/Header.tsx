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

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("seller");
    Cookies.remove("customer");

    setToken(undefined);
    router.push("/login");
    router.refresh();
  };

  const goToDashboard = () => {
    const path = role ? `/dashboard/${role}` : "/dashboard";
    router.push(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(10, 12, 20, 0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.2,
          }}
        >
          {/* LEFT: LOGO */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
                color: "white",
              }}
            >
              <ShoppingBagIcon />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 20,
                color: "#fff",
                letterSpacing: "-0.3px",
              }}
            >
              Friendly Mart
            </Typography>
          </Box>

          {/* CENTER NAV */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { xs: "none", md: "flex" },
              background: "rgba(255,255,255,0.04)",
              px: 2,
              py: 1,
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  px: 1.2,
                  py: 0.5,
                  borderRadius: "8px",
                  transition: "0.2s",
                  "&:hover": {
                    color: "#fff",
                    background: "rgba(99,102,241,0.15)",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          {/* RIGHT AUTH */}
          <Stack direction="row" spacing={1.5}>
            {!token ? (
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="text"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "10px",
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  sx={{
                    fontWeight: 700,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    boxShadow: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={goToDashboard}
                  startIcon={<LayoutDashboard size={16} />}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Dashboard
                
                </Button>

                <Button
                  onClick={handleLogout}
                  sx={{
                    fontWeight: 700,
                    borderRadius: "10px",
                    background: "#ef4444",
                    color: "#fff",
                    "&:hover": {
                      background: "#dc2626",
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