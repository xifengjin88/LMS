import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRoute(url: string, route: string) {
  return url.startsWith(route);
}

export function invariantResponse(
  condition: any,
  message: string | (() => string),
  responseInit?: ResponseInit
): asserts condition {
  if (!condition) {
    throw new NextResponse(
      typeof message === "function" ? message() : message,
      {
        status: 400,
        ...responseInit,
      }
    );
  }
}

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
}
