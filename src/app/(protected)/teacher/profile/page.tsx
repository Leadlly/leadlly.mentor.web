import { Suspense } from "react";

import TeacherProfileForm from "./components/teacher-profile-form";

const TeacherProfilePage = () => {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[40vh] text-gray-400 animate-pulse">
            Loading profile...
          </div>
        }
      >
        <TeacherProfileForm />
      </Suspense>
    </section>
  );
};

export default TeacherProfilePage;
