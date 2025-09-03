"use client";

import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { DesktopSidebar } from "@/app/components/DesktopSidebar";
import { Shoe } from "@/types/products";
import Skeleton from "@/app/components/Skeleton";
import ShoesItem from "@/app/components/ShoesItem";
import { supabase } from "@/utils/supabase/clients";

const { Search } = Input;
const { Option } = Select;

const Shoes = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBySize, setSearchBySize] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [shoes, setShoes] = useState<Shoe[]>([]);


  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("shoes").select("*");
      if (!error && data) {
        setShoes(data);
      }
      setLoading(false);
    };
    fetchShoes();
  }, []);

  const filteredShoes = shoes.filter(
    (shoe) =>
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!searchBySize || shoe.size.toString() === searchBySize)
  );

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    const firstItemPrice = a.price - a.price * (a.discount_percent / 100);
    const secondItemPrice = b.price - b.price * (b.discount_percent / 100);
    if (sortBy === "price-asc") return firstItemPrice - secondItemPrice;
    if (sortBy === "price-desc") return secondItemPrice - firstItemPrice;
    if (sortBy === "quantity-asc") return a.quantity - b.quantity;
    if (sortBy === "quantity-desc") return b.quantity - a.quantity;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Desktop Sidebar - Only show on desktop */}
        <div className="hidden md:block sticky top-0 h-screen w-64 bg-white border-r">
          <DesktopSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 py-10 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <Search
              placeholder="Search shoes..."
              allowClear
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: 300 }}
            />
            <Search
              placeholder="Search by Size"
              allowClear
              onSearch={(value) => setSearchBySize(value)}
              onChange={(e) => setSearchBySize(e.target.value)}
              style={{ maxWidth: 300 }}
            />

            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              placeholder="Sort by"
              style={{ width: 200 }}
              allowClear
            >
              <Option value="price-asc">Price: Low to High</Option>
              <Option value="price-desc">Price: High to Low</Option>
              <Option value="quantity-asc">Quantity: Low to High</Option>
              <Option value="quantity-desc">Quantity: High to Low</Option>
            </Select>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
              : sortedShoes.map((shoe) => {
                  return <ShoesItem key={shoe.id} shoe={shoe} />;
                })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shoes;
