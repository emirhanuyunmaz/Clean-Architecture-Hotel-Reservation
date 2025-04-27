import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";


export function middleware(request: NextRequest) {
    const token = request.cookies.getAll("token")

    try{
        if(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')){
            // console.log("TTT::",token);
            if(token.length == 0){
                return NextResponse.next()
            }else{
                const decode_token = jwtDecode(token[0]?.value)
                console.log("LOGIN:::::",decode_token == undefined);
                
                if(decode_token !== undefined){
                    return NextResponse.redirect(new URL('/', request.url))
                }else{
                    return NextResponse.next()

                }
            }
        }

        if(request.nextUrl.pathname.startsWith('/profile')){
            // console.log("TTT::",token);
            if(token.length == 0){
                return NextResponse.redirect(new URL('/', request.url))
            }   
            return NextResponse.next()
        }

        if(request.nextUrl.pathname.startsWith('/admin')){
            if(token.length == 0){
                console.log("::ADMIN:::");
                
                return NextResponse.redirect(new URL('/', request.url))
            }else{
                const decode_token = jwtDecode(token[0]?.value)
                console.log("ADMIN:::::",decode_token);
                return NextResponse.next()
            }
        }
    }catch(err){
        // Token bilgileri silinecek...
        const response = NextResponse.redirect(new URL('/404', request.url))
        response.cookies.delete("token")
        // console.log("ERR::",err);
        return response
    }
    
}
 

export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*','/login','/register',"/profile","/admin"],
  }