"use client";

import { useEffect } from "react";
import { setupMockAPI } from "@/lib/api-mock";

export function MockAPIInitializer() {
  useEffect(() => {
    // console.log("MockAPIInitializer: Checking environment...", {
    //   NODE_ENV: process.env.NODE_ENV,
    //   isDev: process.env.NODE_ENV === "development",
    // });

    // if (process.env.NODE_ENV === "development") {
    //   console.log("MockAPIInitializer: Setting up mock API...");
    setupMockAPI();
    //   console.log("MockAPIInitializer: Mock API setup complete");
    // }
  }, []);

  return null;
}
