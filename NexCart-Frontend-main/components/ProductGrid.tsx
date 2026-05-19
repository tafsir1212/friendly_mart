

import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StorefrontIcon from "@mui/icons-material/Storefront";

import ProductFilterBar from "./ProductFilterBar";
import AddToCartButton from "./AddToCartButton";

export type SellerShop = {
  id: number;
  shopName: string;
  shopAddress: string;
  tradeLicense: string;
};

export type Product = {
  id: number;
  productName: string;
  category: string;
  description?: string | null;
  price: number;
  quantity: number;
  productImage?: string | null;
  sellerShop?: SellerShop | null;
};

export type PriceFilter = "default" | "lowToHigh" | "highToLow";

const API_BASE_URL = "http://localhost:3000";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/seller/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch {
    return [];
  }
}

type ProductGridProps = {
  selectedCategory?: string;
  priceFilter?: PriceFilter;
};

export default async function ProductGrid({
  selectedCategory = "all",
  priceFilter = "default",
}: ProductGridProps) {
  const products = await getProducts();

  let filtered = [...products];

  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (priceFilter === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background:
          "radial-gradient(circle at top, #0b1220 0%, #020617 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Box sx={{ mb: 4 }}>
          <Chip
            label="Premium Products"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: "rgba(56,189,248,0.1)",
              color: "#38bdf8",
            }}
          />

          <Typography sx={{ fontSize: 34, fontWeight: 900, color: "#fff" }}>
            Explore Products
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            Discover best deals from sellers
          </Typography>
        </Box>

        {/* FILTER */}
        <ProductFilterBar
          categories={["Electronics", "Fashion", "Home & Living", "Beauty"]}
          selectedCategory={selectedCategory}
          priceFilter={priceFilter}
        />

        {/* GRID */}
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ================= NEW CARD DESIGN ================= */

function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = Number(product.quantity) <= 0;

  const imageUrl = product.productImage
    ? `${API_BASE_URL}/uploads/products/${product.productImage}`
    : "";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "22px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(2,6,23,0.95))",
        color: "white",
        transition: "0.35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "rgba(56,189,248,0.4)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
        },
      }}
    >
      {/* IMAGE SECTION */}
      <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={product.productName}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.4s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15))",
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 60, color: "#38bdf8" }} />
          </Box>
        )}

        {/* STOCK BADGE */}
        <Chip
          label={isOutOfStock ? "Out of Stock" : "In Stock"}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            fontWeight: 800,
            bgcolor: isOutOfStock
              ? "rgba(239,68,68,0.2)"
              : "rgba(34,197,94,0.2)",
            color: isOutOfStock ? "#f87171" : "#4ade80",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: 2.5 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 800,
            color: "#38bdf8",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {product.category}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: 18,
            fontWeight: 900,
            color: "white",
            minHeight: 50,
          }}
        >
          {product.productName}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            minHeight: 40,
          }}
        >
          {product.description || "No description available"}
        </Typography>

        {/* SHOP INFO */}
        <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
          <StorefrontIcon sx={{ fontSize: 18, color: "#38bdf8" }} />
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            {product.sellerShop?.shopName || "Unknown Shop"}
          </Typography>
        </Box>

        {/* PRICE */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 900, color: "white" }}>
            ৳{Number(product.price).toLocaleString()}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            Stock: {product.quantity}
          </Typography>
        </Box>

        {/* ADD TO CART (ALWAYS VISIBLE NOW) */}
        <Box sx={{ mt: 2 }}>
          <AddToCartButton
            productName={product.productName}
            quantity={Number(product.quantity)}
            productId={product.id}
          />
        </Box>

        {/* VIEW BUTTON */}
        <Box sx={{ mt: 1.5 }}>
          <Link href={`/products/${product.id}`}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<VisibilityIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "12px",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#38bdf8",
                  color: "#38bdf8",
                },
              }}
            >
              View Details
            </Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}