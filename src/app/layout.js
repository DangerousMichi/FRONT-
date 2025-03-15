import ToastProvider from "@/components/toastProvider";
export const metadata = {
    title : "Frontend con nextjs",
    description : "Frontend"
}

export default function RootLayout({children}){
    return(
        <html>
            <body>
                <ToastProvider />
                {children}
            </body>
        </html>
    );
}