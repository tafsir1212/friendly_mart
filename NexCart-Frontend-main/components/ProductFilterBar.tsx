"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import TuneIcon from "@mui/icons-material/Tune";

import type { PriceFilter } from "./ProductGrid";

type ProductFilterBarProps = {
  categories: string[];
  selectedCategory: string;
  priceFilter: PriceFilter;
};

export default function ProductFilterBar({
  categories,
  selectedCategory,
  priceFilter,
}: ProductFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    updateFilter("category", event.target.value);
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    updateFilter("price", event.target.value);
  };

  const handleClearFilters = () => {
    router.push(pathname, {
      scroll: false,
    });
  };

  return (
  <Paper
    elevation={0}
    sx={{
      mb: 5,
      p: 3,
      borderRadius: "28px",
      position: "relative",
      overflow: "hidden",
      background:
        "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.95) 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(18px)",
      boxShadow: "0 25px 60px rgba(0,0,0,0.28)",
    }}
  >
    {/* Glow */}
    <Box
      sx={{
        position: "absolute",
        width: 240,
        height: 240,
        borderRadius: "50%",
        background: "rgba(59,130,246,0.18)",
        filter: "blur(80px)",
        top: -100,
        left: -80,
      }}
    />

    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        alignItems: {
          xs: "stretch",
          lg: "center",
        },
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(59,130,246,0.35)",
          }}
        >
          <TuneIcon sx={{ color: "#fff", fontSize: 28 }} />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            Product Filters
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            Filter products by category and pricing
          </Typography>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          width: {
            xs: "100%",
            lg: "auto",
          },
        }}
      >
        {/* CATEGORY */}
        <FormControl
          size="small"
          sx={{
            minWidth: {
              xs: "100%",
              sm: 220,
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              backdropFilter: "blur(10px)",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.08)",
              },

              "&:hover fieldset": {
                borderColor: "#60a5fa",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#818cf8",
                borderWidth: "2px",
              },
            },

            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.6)",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <InputLabel>Category</InputLabel>

          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>

            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PRICE */}
        <FormControl
          size="small"
          sx={{
            minWidth: {
              xs: "100%",
              sm: 220,
            },

            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              backdropFilter: "blur(10px)",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.08)",
              },

              "&:hover fieldset": {
                borderColor: "#60a5fa",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#818cf8",
                borderWidth: "2px",
              },
            },

            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.6)",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <InputLabel>Price</InputLabel>

          <Select
            label="Price"
            value={priceFilter}
            onChange={handlePriceChange}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="lowToHigh">Low to High</MenuItem>
            <MenuItem value="highToLow">High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* BUTTON */}
        <Button
          variant="contained"
          onClick={handleClearFilters}
          sx={{
            px: 4,
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: 800,
            fontSize: 15,
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
            boxShadow: "0 15px 35px rgba(79,70,229,0.35)",
            "&:hover": {
              background:
                "linear-gradient(135deg,#1d4ed8,#6d28d9)",
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  </Paper>
);
}