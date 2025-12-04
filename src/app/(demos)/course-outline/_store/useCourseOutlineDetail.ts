// import { useQuery } from "@tanstack/react-query";
// import { CourseOutlineDetail } from "@/types";
// import { courseKeys } from "./keys";

// /**
//  * API function to fetch a single Course Outline record by ID.
//  * @param id The ID of the course outline to fetch.
//  */
// const fetchCourseOutlineDetail = async (
//   id: string
// ): Promise<CourseOutlineDetail> => {
//   if (!id) {
//     throw new Error("Course ID is required for fetching details.");
//   }

//   const response = await fetch(`/api/course-outlines/${id}`);

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(
//       `Failed to fetch course details for ID ${id}: ${errorText}`
//     );
//   }
//   return response.json();
// };

// /**
//  * Hook for fetching a single Course Outline record.
//  * @param id The ID of the course outline to fetch.
//  */
// export const useCourseOutlineDetail = (id: string) => {
//   return useQuery<CourseOutlineDetail, Error>({
//     queryKey: courseKeys.detail(id),
//     queryFn: () => fetchCourseOutlineDetail(id),
//     enabled: !!id,
//   });
// };

import { fetchCourseOutlineDetail } from "@/app/api/course-outlines/courseOutlineApi";
import { CourseOutlineDetail, CourseOutlineRecord } from "@/types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { courseKeys } from "./keys";

/**
 * Hook to fetch the full CourseOutlineDetail object for a single course.
 * It uses the cached CourseOutlineRecord (summary) for instant rendering before
 * fetching the full detail data in the background.
 */
export const useCourseOutlineDetail = (id: string) => {
  const queryClient = useQueryClient();

  const getPartialDataFromListView = () => {
    const listCache = queryClient.getQueryData<CourseOutlineRecord[]>(
      courseKeys.list()
    );
    const partialData = listCache?.find((course) => course.id === id);

    return partialData ? (partialData as CourseOutlineDetail) : undefined;
  };

  return useQuery<CourseOutlineDetail, Error>({
    queryKey: courseKeys.detail(id),
    queryFn: () => fetchCourseOutlineDetail(id),
    enabled: !!id,
    placeholderData: getPartialDataFromListView(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
