interface ROI {
  times: number;
  currency: string;
  percentage: number;
}

export interface CoinData {
  id: string;
  name: string;
  image: string;
  market_cap: string;
  market_cap_rank: number;
  price: string;
  price_change_24h: string;
  market_cap_change_percentage_24h: string;
  ath_change_percentage: string;
  atl_change_percentage: string;
}

export interface GetChartValuesResponse {
  prices: Array<Array<number>>;
  market_caps: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
}

export interface GetTrendingCoinsResponse {
  coins: Array<{
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number;
      data: {
        price: number;
        price_btc: string;
        price_change_percentage_24h: {
          [key: string]: number; 
        };
        market_cap: string;
        market_cap_btc: string;
        total_volume: string;
        total_volume_btc: string;
        sparkline: string;
        content: null | string;
      };
    };
  }>,
}

export interface GetCoinDataResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | any; 
  last_updated: string;
}

export interface GetCoinDataByIdResponse {
  id: string;
  symbol: string;
  name: string;
  categories: Array<string>;
  description: {
   [key: string]: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      [key: string]: number;
    };
    roi: ROI | null;
    ath: {
      [key: string]: number;
    };
    ath_change_percentage: {
      [key: string]: number;
    }
    ath_date: {
      [key: string]: number;
    }
    atl: {
      [key: string]: number;
    };
    atl_change_percentage: {
      [key: string]: number;
    };
    atl_date: {
      [key: string]: string;
    };
    market_cap: {
      [key: string]: number;
    };
    market_cap_rank: number;
    fully_diluted_valuation: {
      [key: string]: number;
    };
    market_cap_fdv_ratio: number | null;
    total_volume: {
      [key: string]: number;
    };
    high_24h: {
      [key: string]: number;
    };
    low_24h: {
      [key: string]: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_1h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_7d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_14d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_30d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_60d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_200d_in_currency: {
      [key: string]: number;
    };
    price_change_percentage_1y_in_currency: {
      [key: string]: number;
    };
    market_cap_change_24h_in_currency: {
      [key: string]: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
}