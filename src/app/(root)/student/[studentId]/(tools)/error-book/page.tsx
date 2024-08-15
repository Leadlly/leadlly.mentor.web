import React from "react";
import ErrorBookContainer from "./components/ErrorBookContainer";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { getErrorBook } from "@/actions/errorbook_actions";

const ErrorBook = async ({params: { studentId }}: { params: { studentId: string };}) => {
  const errorBook = await getErrorBook(studentId);
  console.log("this is errorbook", errorBook.errorBook)
  return (
    <div className="max-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold py-4 text-center md:text-left">
        Error Book
      </h1>
      <div className="flex items-center justify-between">
        <Link href={'/error-book/mobile-error-notes'} className="flex gap-2 rounded-lg lg:hidden bg-blue-500 text-white items-center p-1 px-2">
          <Pencil className="size-4" />
          Notes
        </Link>
      </div>

    
        <ErrorBookContainer errorBook={errorBook.errorBook} />
    </div>
  );
};

export default ErrorBook;
