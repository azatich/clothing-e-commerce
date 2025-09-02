"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Select, Spin } from "antd";
import { GiConverseShoe } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { DesktopSidebar } from "@/app/components/DesktopSidebar";
import { Shoe } from "@/types/products";
import { createClient } from "@/utils/supabase/clients";
import Skeleton from "@/app/components/Skeleton";
import ShoesItem from "@/app/components/ShoesItem";

const { Search } = Input;
const { Option } = Select;

const Shoes = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBySize, setSearchBySize] = useState("");
  const [sortBy, setSortBy] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("shoes").select("*");
      console.log(data);
      
      if (!error && data) {
        setShoes(data);
      }
      setLoading(false);
    };
    fetchShoes();
  }, [supabase])

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

          {/* Products Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
              : shoes.map((shoe) => {
                  return (
                    <ShoesItem
                      key={shoe.id}
                      shoe={shoe}
                    />
                  );
                })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shoes;
