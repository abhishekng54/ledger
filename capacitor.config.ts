import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.theledger.app",
  appName: "The Ledger",
  webDir: "dist",
  android: {
    backgroundColor: "#0c0c0e",
  },
};

export default config;
