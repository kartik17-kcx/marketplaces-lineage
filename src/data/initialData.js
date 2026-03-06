// ─── TYPE COLOR TOKENS ───────────────────────────────────────────────────────

export const TYPE_COLORS = {
  source: {
    bg: "#0d1117",
    border: "#21262d",
    text: "#c9d1d9",
    accent: "#8b949e",
    glow: "#58a6ff22",
    tag: "#161b22",
    tagText: "#8b949e",
    dot: "#484f58",
  },
  intermediate: {
    bg: "#0b1628",
    border: "#1a3a6b",
    text: "#79c0ff",
    accent: "#388bfd",
    glow: "#388bfd33",
    tag: "#0d1d3a",
    tagText: "#58a6ff",
    dot: "#1f6feb",
  },
  mart: {
    bg: "#071a0e",
    border: "#1b5e30",
    text: "#56d364",
    accent: "#3fb950",
    glow: "#3fb95033",
    tag: "#0a2615",
    tagText: "#3fb950",
    dot: "#238636",
  },
  deprecated: {
    bg: "#1a1115",
    border: "#5e2b1b",
    text: "#f97583",
    accent: "#f85149",
    glow: "#f8514922",
    tag: "#2a1019",
    tagText: "#f85149",
    dot: "#da3633",
  },
};

// ─── CATEGORY LABELS ─────────────────────────────────────────────────────────

export const CATEGORY_LABELS = {
  amazon_sp: "Amazon SP",
  amazon_sb: "Amazon SB",
  amazon_sd: "Amazon SD",
  amazon_txn: "Amazon Transactions",
  amazon_other: "Amazon Other",
  meta: "Meta Ads",
  shopify: "Shopify",
  mapping: "Attryb",
  utility: "Utility",
};

// ─── SIDEBAR TAB CONFIG ──────────────────────────────────────────────────────

export const SIDEBAR_TABS = [
  { key: "sources", icon: "◆", typeFilter: "source" },
  { key: "transforms", icon: "◈", typeFilter: "intermediate" },
  { key: "marts", icon: "●", typeFilter: "mart" },
  { key: "deprecated", icon: "○", typeFilter: "deprecated" },
];

// ─── LAYOUT CONSTANTS ────────────────────────────────────────────────────────

export const NODE_W = 240;
export const NODE_H = 56;
export const COL_GAP = 300;
export const ROW_GAP = 16;
export const GROUP_GAP = 28;
export const START_Y = 50;
export const START_X = 40;

// ─── INITIAL NODES ───────────────────────────────────────────────────────────

export const INITIAL_NODES = [
  // ── ATTRYB SOURCES
  { id: "a_variant_sku", schema: "attryb", name: "variant_sku_product_mapping", type: "source", desc: "SKU ↔ variant mapping; not yet in OTS or merged into UAB pipeline", category: "mapping" },

  // ── AMAZON SP
  { id: "m_sp_adv", schema: "marketplaces", name: "amazon_sp_advertised_product_report", type: "source", desc: "SP ad performance — PKs: (date, ad_id, advertised_asin)", category: "amazon_sp" },
  { id: "m_sp_target", schema: "marketplaces", name: "amazon_sp_targeting_report", type: "source", desc: "SP keyword/product targeting metrics", category: "amazon_sp" },
  { id: "m_sp_search", schema: "marketplaces", name: "amazon_sp_search_term_report", type: "source", desc: "SP search term level query performance", category: "amazon_sp" },
  { id: "m_sp_camp", schema: "marketplaces", name: "amazon_sp_campaign_report", type: "source", desc: "SP campaign-level aggregated metrics", category: "amazon_sp" },
  { id: "m_sp_git", schema: "marketplaces", name: "amazon_sp_gross_and_invalid_traffic_report", type: "source", desc: "SP gross & invalid traffic filtering report", category: "amazon_sp" },
  { id: "m_sp_purch", schema: "marketplaces", name: "amazon_sp_purchased_product_report", type: "source", desc: "SP purchased product attribution report", category: "amazon_sp" },

  // ── AMAZON SB
  { id: "m_sb_ad", schema: "marketplaces", name: "amazon_sb_ad_report", type: "source", desc: "SB ad-level daily metrics — PKs: (date, ad_id)", category: "amazon_sb" },
  { id: "m_sb_target", schema: "marketplaces", name: "amazon_sb_targeting_report", type: "source", desc: "SB targeting-level performance metrics", category: "amazon_sb" },
  { id: "m_sb_search", schema: "marketplaces", name: "amazon_sb_search_term_report", type: "source", desc: "SB search term query performance", category: "amazon_sb" },
  { id: "m_sb_camp_place", schema: "marketplaces", name: "amazon_sb_campaign_placement_report", type: "source", desc: "SB campaign placement breakdown", category: "amazon_sb" },
  { id: "m_sb_camp_rpt", schema: "marketplaces", name: "amazon_sb_campaign_report", type: "source", desc: "SB campaign-level aggregated metrics", category: "amazon_sb" },
  { id: "m_sb_adgroup", schema: "marketplaces", name: "amazon_sb_ad_group_report", type: "source", desc: "SB ad group level performance report", category: "amazon_sb" },
  { id: "m_sb_git", schema: "marketplaces", name: "amazon_sb_gross_and_invalid_traffic_report", type: "source", desc: "SB gross & invalid traffic filtering report", category: "amazon_sb" },
  { id: "m_sb_ads", schema: "marketplaces", name: "amazon_sb_ads", type: "source", desc: "SB ad creative details — PK: ad_id", category: "amazon_sb" },
  { id: "m_sb_campaigns", schema: "marketplaces", name: "amazon_sb_campaigns", type: "source", desc: "SB campaign metadata — PK: campaign_id", category: "amazon_sb" },
  { id: "m_sb_purch", schema: "marketplaces", name: "amazon_sb_purchased_product_report", type: "source", desc: "SB purchased product attribution", category: "amazon_sb" },
  { id: "m_sb_audience", schema: "marketplaces", name: "amazon_sb_audience_report", type: "source", desc: "SB audience segment performance report", category: "amazon_sb" },

  // ── AMAZON SD
  { id: "m_sd_adv", schema: "marketplaces", name: "amazon_sd_advertised_product_report", type: "source", desc: "SD ad metrics — PKs: (date, ad_id, promoted_asin)", category: "amazon_sd" },
  { id: "m_sd_target", schema: "marketplaces", name: "amazon_sd_targeting_report", type: "source", desc: "SD targeting-level performance metrics", category: "amazon_sd" },
  { id: "m_sd_adgroup", schema: "marketplaces", name: "amazon_sd_ad_group_report", type: "source", desc: "SD ad group level performance report", category: "amazon_sd" },
  { id: "m_sd_camp_rpt", schema: "marketplaces", name: "amazon_sd_campaign_report", type: "source", desc: "SD campaign-level aggregated metrics", category: "amazon_sd" },
  { id: "m_sd_git", schema: "marketplaces", name: "amazon_sd_gross_and_invalid_traffic_report", type: "source", desc: "SD gross & invalid traffic filtering report", category: "amazon_sd" },
  { id: "m_sd_campaigns", schema: "marketplaces", name: "amazon_sd_campaigns", type: "source", desc: "SD campaign metadata — PK: campaign_id", category: "amazon_sd" },
  { id: "m_sd_purch", schema: "marketplaces", name: "amazon_sd_purchased_product_report", type: "source", desc: "SD purchased product attribution", category: "amazon_sd" },

  // ── AMAZON TRANSACTIONS
  { id: "m_raw_txn", schema: "marketplaces", name: "amazon_raw_transactions", type: "source", desc: "Raw transaction JSONBs — PK: transaction_id; feeds pythonic transformations", category: "amazon_txn" },
  { id: "m_txn_items", schema: "marketplaces", name: "amazon_transactions_items_breakdowns", type: "source", desc: "Unnested line-item breakdowns — PKs: (transaction_id, breakdown_type, index)", category: "amazon_txn" },
  { id: "m_txn_break", schema: "marketplaces", name: "amazon_transactions_breakdowns", type: "source", desc: "Transaction breakdown values — PKs: (transactionId, breakdown_type)", category: "amazon_txn" },
  { id: "m_txn_meta", schema: "marketplaces", name: "amazon_transactions_metadata", type: "source", desc: "Transaction header info — PK: transaction_id", category: "amazon_txn" },
  { id: "m_txn_ctx", schema: "marketplaces", name: "amazon_transactions_contexts", type: "source", desc: "Transaction context from pythonic transformation on raw_transactions", category: "amazon_txn" },

  // ── AMAZON OTHER
  { id: "m_inv", schema: "marketplaces", name: "amazon_inventory_planning", type: "source", desc: "SKU × date level inventory planning details", category: "amazon_other" },
  { id: "m_listings", schema: "marketplaces", name: "amazon_product_listings", type: "source", desc: "Amazon product catalog listings data", category: "amazon_other" },
  { id: "m_list_status", schema: "marketplaces", name: "amazon_product_listings_status", type: "source", desc: "Product listing status tracking", category: "amazon_other" },
  { id: "m_portfolios", schema: "marketplaces", name: "amazon_ads_portfolios", type: "source", desc: "Amazon Ads portfolio configuration", category: "amazon_other" },
  { id: "m_snapshot", schema: "marketplaces", name: "incremental_snapshot", type: "source", desc: "OTS utility table for dbt incremental logic", category: "utility" },

  // ── META
  { id: "m_meta", schema: "marketplaces", name: "meta_ads_insights", type: "source", desc: "Meta ad insights — PKs: (ad_id, product_id, date_start, date_stop); product_id unsanitized", category: "meta" },

  // ── SHOPIFY
  { id: "m_shopify", schema: "marketplaces", name: "shopify_product_variant_metrics_report", type: "source", desc: "Shopify variant metrics — pending read_reports scope permission", category: "shopify" },

  // ── DBT INTERMEDIATES
  { id: "d_sb_adv", schema: "dbt", name: "amazon_sb_advertised_products_report", type: "intermediate", desc: "Unified SB view: aggregated at product_id × date × ad × campaign level with campaign status & budget" },
  { id: "d_asin_sku", schema: "dbt", name: "amazon_asin_to_shopify_sku_mapping", type: "intermediate", desc: "Cross-platform ASIN ↔ Shopify SKU mapping at ASIN level" },
  { id: "d_meta_prod", schema: "dbt", name: "meta_products_insights", type: "intermediate", desc: "Meta insights aggregated at product_id × date level: impressions, clicks, cost" },

  // ── DBT MARTS
  { id: "d_ads_agg", schema: "dbt", name: "amazon_ads_advertised_products_aggregated", type: "mart", desc: "Date × SKU level aggregated Amazon ad metrics: clicks, impressions, units_sold" },
  { id: "d_meta_agg", schema: "dbt", name: "meta_ads_aggregated", type: "mart", desc: "Date × SKU level Meta ads: impressions, clicks, units sold" },
  { id: "d_store_agg", schema: "dbt", name: "amazon_store_breakdowns_aggregated", type: "mart", desc: "ASIN↔SKU × date level aggregation of fba_{} metrics" },
  { id: "d_shopify_agg", schema: "dbt", name: "shopify_product_variant_aggregated", type: "mart", desc: "Date × SKU level: COGS, returns, orders, duties" },

  // ── DBT DEPRECATED
  { id: "d_all_ch", schema: "dbt", name: "all_channels_metrics", type: "deprecated", desc: "DEPRECATED — All-channel metrics rollup, no longer required" },
  { id: "d_sku_txn", schema: "dbt", name: "amazon_sku_transactions", type: "deprecated", desc: "DEPRECATED — SKU-level transaction view, no longer required" },
];

// ─── INITIAL EDGES ───────────────────────────────────────────────────────────

export const INITIAL_EDGES = [
  // → Intermediates
  { from: "m_sb_ad", to: "d_sb_adv" },
  { from: "m_sb_campaigns", to: "d_sb_adv" },
  { from: "m_sb_ads", to: "d_sb_adv" },
  { from: "a_variant_sku", to: "d_asin_sku" },
  { from: "m_inv", to: "d_asin_sku" },
  { from: "m_meta", to: "d_meta_prod" },

  // → Marts
  { from: "m_sp_adv", to: "d_ads_agg" },
  { from: "m_sd_adv", to: "d_ads_agg" },
  { from: "d_asin_sku", to: "d_ads_agg" },
  { from: "d_meta_prod", to: "d_meta_agg" },
  { from: "a_variant_sku", to: "d_meta_agg" },
  { from: "m_txn_meta", to: "d_store_agg" },
  { from: "m_txn_items", to: "d_store_agg" },
  { from: "m_txn_break", to: "d_store_agg" },
  { from: "d_asin_sku", to: "d_store_agg" },
  { from: "m_shopify", to: "d_shopify_agg" },
];
