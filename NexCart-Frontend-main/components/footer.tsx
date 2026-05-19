"use client";

import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(99,102,241,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(168,85,247,0.18), transparent 35%), #020617",
        color: "white",
        mt: 0, // ✅ FIXED HERE
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Glow Effect */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.25)",
          filter: "blur(120px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -120,
          right: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(168,85,247,0.18)",
          filter: "blur(120px)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* TOP */}
        <Box
          sx={{
            py: {
              xs: 8,
              md: 10,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: 6,
          }}
        >
          {/* BRAND */}
          <Box>
            <Box
              component={Link}
              href="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 45px rgba(99,102,241,0.45)",
                }}
              >
                <StorefrontRoundedIcon sx={{ fontSize: 30, color: "#fff" }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2rem" },
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-1px",
                  }}
                >
                  Friendly Mart
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 13,
                    mt: 0.2,
                  }}
                >
                  Premium Ecommerce Experience
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                mt: 3,
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.9,
                maxWidth: 500,
                fontSize: 15,
              }}
            >
              Friendly Mart is your modern online shopping destination
              designed for customers and sellers. Discover premium products,
              fast delivery, secure shopping, and a seamless digital
              marketplace experience.
            </Typography>

            {/* FEATURES */}
            <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Chip
                icon={<VerifiedRoundedIcon />}
                label="Verified Products"
                sx={{
                  bgcolor: "rgba(99,102,241,0.18)",
                  color: "#c7d2fe",
                  border: "1px solid rgba(99,102,241,0.25)",
                }}
              />

              <Chip
                icon={<LocalShippingRoundedIcon />}
                label="Fast Delivery"
                sx={{
                  bgcolor: "rgba(16,185,129,0.18)",
                  color: "#a7f3d0",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              />

              <Chip
                icon={<SupportAgentRoundedIcon />}
                label="24/7 Support"
                sx={{
                  bgcolor: "rgba(168,85,247,0.18)",
                  color: "#e9d5ff",
                  border: "1px solid rgba(168,85,247,0.25)",
                }}
              />
            </Box>

            {/* SOCIAL */}
            <Box sx={{ mt: 4, display: "flex", gap: 1.5 }}>
              <SocialButton icon={<FacebookRoundedIcon />} />
              <SocialButton icon={<InstagramIcon />} />
              <SocialButton icon={<LinkedInIcon />} />
              <SocialButton icon={<XIcon />} />
            </Box>
          </Box>

          <FooterSection
            title="Quick Links"
            links={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Sellers", href: "/sellers" },
              { label: "About Us", href: "/about" },
            ]}
          />

          <FooterSection
            title="Account"
            links={[
              { label: "Login", href: "/login" },
              { label: "Register", href: "/register" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "My Orders", href: "/orders" },
            ]}
          />

          <FooterSection
            title="Platform"
            links={[
              { label: "Admin Panel", href: "/admin/login" },
              { label: "Seller Dashboard", href: "/seller/login" },
              { label: "Manager Panel", href: "/manager/login" },
              { label: "Customer Portal", href: "/customer/login" },
            ]}
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* BOTTOM */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 14,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © {new Date().getFullYear()} Friendly Mart. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <BottomLink href="/privacy" label="Privacy Policy" />
            <BottomLink href="/terms" label="Terms & Conditions" />
            <BottomLink href="/contact" label="Contact Us" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 800,
          mb: 2.5,
          fontSize: 15,
          color: "#fff",
        }}
      >
        {title}
      </Typography>

      {links.map((link) => (
        <FooterLink key={link.label} href={link.href} label={link.label} />
      ))}
    </Box>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "rgba(255,255,255,0.62)",
        py: 1,
        transition: "0.25s ease",
        "&:hover": { color: "#fff", transform: "translateX(5px)" },
      }}
    >
      <Typography sx={{ fontSize: 15 }}>{label}</Typography>
      <ArrowOutwardRoundedIcon sx={{ fontSize: 16 }} />
    </Box>
  );
}

function BottomLink({ href, label }: { href: string; label: string }) {
  return (
    <Typography
      component={Link}
      href={href}
      sx={{
        textDecoration: "none",
        color: "rgba(255,255,255,0.45)",
        fontSize: 14,
        "&:hover": { color: "#fff" },
      }}
    >
      {label}
    </Typography>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <IconButton
      sx={{
        width: 50,
        height: 50,
        borderRadius: "16px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        transition: "0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          background:
            "linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)",
        },
      }}
    >
      {icon}
    </IconButton>
  );
}