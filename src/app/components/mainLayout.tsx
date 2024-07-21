import React, { ReactNode } from "react";
import { useTheme } from "@/app/context/theme";
import { Container } from "@/app/styles/Container";
import NavBar from "@/app/components/navbar";
import { BoxSizer } from "@/app/styles/BoxSizer";
import { ContentWrapper, SidebarWrapper } from "../styles/Wrapper";
import Watchlist from "@/app/components/watchlist";
import RecentlyWatched from "@/app/components/recentlyWatched";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <Container $themeType={theme}>
      <NavBar />
      <BoxSizer height={70} />
      <ContentWrapper>
        <div className="main-content">{children}</div>
        <SidebarWrapper>
          <Watchlist />
          <BoxSizer height={20} />
          <RecentlyWatched />
        </SidebarWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default MainLayout;
