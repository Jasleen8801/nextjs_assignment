"use client";

import MainLayout from "@/app/components/mainLayout";
import MarketCapChart from "@/app/home/marketCapChart";
import Trending from "@/app/home/trending";
import { BoxSizer } from "./styles/BoxSizer";

export default function Home() {
  return (
    <MainLayout >
      <MarketCapChart />
      <BoxSizer height={20} />
      <Trending />
    </MainLayout>
  );
}
