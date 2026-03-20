"use server";

import { getCookie } from "./cookie_actions";

export const getMentorBatches = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/batch/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );
    
    if (!res.ok) {
       if (res.status === 404) return [];
       throw new Error(`Failed to fetch batches: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching batches:", error);
    return [];
  }
};

export const getBatchClasses = async (batchId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/class/batch/${batchId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       if (res.status === 404) return [];
       throw new Error(`Failed to fetch batch classes: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching batch classes:", error);
    return [];
  }
};

export const getBatchStudents = async (batchId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/batch/${batchId}/students`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       if (res.status === 404) return { students: [] };
       throw new Error(`Failed to fetch batch students: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching batch students:", error);
    return { students: [] };
  }
};

export const getBatchDetails = async (id: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/batch/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       throw new Error(`Failed to fetch batch details: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching batch details:", error);
    return null;
  }
};

export const getClassDetails = async (id: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/class/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       throw new Error(`Failed to fetch class details: ${res.statusText}`);
    }

    const data = await res.json();
    return data.class;
  } catch (error: unknown) {
    console.error("Error fetching class details:", error);
    return null;
  }
};

export const getAllClasses = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/class/my-classes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       if (res.status === 404) return [];
       throw new Error(`Failed to fetch classes: ${res.statusText}`);
    }

    const data = await res.json();
    return data.class;
  } catch (error: unknown) {
    console.error("Error fetching all classes:", error);
    return [];
  }
};

export const getInstituteBatches = async (instituteId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/institute/${instituteId}/batches`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
       if (res.status === 404) return [];
       throw new Error(`Failed to fetch institute batches: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching institute batches:", error);
    return [];
  }
};

export const createClassAction = async (classData: any) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/class/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(classData),
      }
    );

    if (!res.ok) {
       const errorData = await res.json().catch(() => ({}));
       throw new Error(`Failed to create class: ${errorData.message || res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating class:", error);
    return { success: false, error: error.message };
  }
};

export const getTeacherBatches = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/teacher-batch/my-batches`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Failed to fetch teacher batches: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching teacher batches:", error);
    return [];
  }
};

export const getTeacherStudents = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/teacher-batch/my-students`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) return { students: [], count: 0 };
      throw new Error(`Failed to fetch teacher students: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching teacher students:", error);
    return { students: [], count: 0 };
  }
};

export const assignTeacherToBatch = async (batchId: string, instituteId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MENTOR_API_BASE_URL}/api/teacher-batch/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ batchId, instituteId }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Error assigning teacher to batch:", error);
    return { success: false };
  }
};
