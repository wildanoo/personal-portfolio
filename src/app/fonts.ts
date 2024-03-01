import { Poppins, Roboto_Condensed } from "next/font/google";

export const poppins = Poppins({
   weight: ["400", "500", "700"],
   style: ["normal", "italic"],
   subsets: ["latin"],
   display: "swap",
 });

 export const robotoCondensed = Roboto_Condensed({
   weight: ["400", "500", "700"],
   style: ["normal"],
   subsets: ["latin"],
   display: "swap",
 });