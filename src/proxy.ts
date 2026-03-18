import { NextResponse } from "next/server";

export async function proxy() {
  // Proxy function for Next.js 16+
  // This handles all requests that need to be processed before reaching route handlers
  
  const response = NextResponse.next();
  return response;
}

export default proxy;