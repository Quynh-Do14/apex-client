// middleware.ts hoặc next.config.js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// middleware.js
export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Xóa header nếu là robots.txt
    if (request.nextUrl.pathname === '/robots.txt') {
        response.headers.delete('Content-Signal');
    }

    return response;
}
