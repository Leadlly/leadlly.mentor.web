import React from "react";
import { getAllStudents, getUser } from "@/actions/user_actions";
import CommunityLayout from "./components/CommunityLayout";


const Page = async () => {
  try {
    const { students } = await getAllStudents();

    return (
     <>
     <CommunityLayout students={students}/>
     </>
    );
  } catch (error) {
    console.error('Error fetching students:', error);
    return <p>Error loading students.</p>;
  }
};

export default Page;
