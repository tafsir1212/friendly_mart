import ProductGrid, { PriceFilter } from "@/components/ProductGrid";

type ProductPage = {
  searchParams: Promise<{
    category?: string;
    price?: string;
  }>;
};

const allowedPriceFilters: PriceFilter[] = [
  "default",
  "lowToHigh",
  "highToLow",
];

export default async function ProductPage({ searchParams }: ProductPage) {
  const params = await searchParams;

  const selectedCategory = params.category || "all";

  const priceFilter = allowedPriceFilters.includes(params.price as PriceFilter)
    ? (params.price as PriceFilter)
    : "default";

    

  return (
    <>
      <ProductGrid
        selectedCategory={selectedCategory}
        priceFilter={priceFilter}
      />
    </>
  );
}