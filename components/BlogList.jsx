import { formatDate } from "@lib/formatDate";
import Link from "next/link";

import { IconList } from '@tabler/icons'


export function BlogList({ title, summary, slug, publishedAt, index }) {
 return (
   <Link href={`/blog/${slug}`} className="w-full">
     <li className="mb-10 ml-6 -mt-30 rounded-2xl px-6 py-3 duration-200 hover:bg-zinc-200/50 motion-reduce:transition-none dark:hover:bg-white/10">
       <span className="absolute -left-3 flex  h-6 w-6 items-center justify-center rounded-full bg-blue-200 font-inter ring-8 ring-white dark:bg-blue-900 dark:ring-[#040d21]">
         <IconList className="h-3 w-3 text-blue-700 dark:text-blue-400" />
       </span>
       <header>
         <h3 className="mb-1 flex items-center font-inter text-lg font-semibold text-slate-900 dark:text-white">
           {title}{' '}
           {index === 0 && (
             <span className="mr-2 ml-3 hidden rounded bg-blue-200 py-0.5 pr-2.5 pl-1.5 text-sm font-medium dark:bg-white/10 sm:block">
               🔥 Latest
             </span>
           )}
         </h3>
         <time
           className="mb-2 block font-inter text-sm font-normal leading-none text-slate-500 dark:text-slate-500"
           dateTime={new Date(publishedAt).toUTCString()}
         >
           {formatDate(publishedAt)}
         </time>
       </header>
       <p className="mb-2 font-inter text-base font-normal text-slate-600 dark:text-slate-400">
         {summary}
       </p>
       <p className="flex font-inter items-center justify-center gap-1 text-md font-semibold  text-accent active:scale-95 active:border-black w-fit group">
         Read more
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           className="w-6 h-6 ml-1 transition group-hover:translate-x-2"
         >
           <path
             stroke="currentColor"
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
           ></path>
         </svg>
       </p>
     </li>
   </Link>
 );
}
