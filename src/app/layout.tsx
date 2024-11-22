import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Display the 3-hour forecast for the next 5 days for the given US ZIP code",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <head />
      <body className="bg-light">
      {children} {/* This renders the content of each page */}
      <Footer/>

      </body>
      </html>
  );
}

