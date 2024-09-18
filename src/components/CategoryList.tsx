import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

export function CategoryList({
  categories,
  onSelectCategory,
  selectedCategory,
}: CategoryListProps) {
  return (
    <div className="mb-8">
      {/* <h2 className="text-2xl font-semibold mb-4">Categories</h2> */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
