import AssignmentCard from "@/components/AssignmentCard/AssignmentCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function FeaturedAssignments() {
  const axiosInstance = useAxiosInstance();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["featuredAssignments"],
    queryFn: async () => {
      return await axiosInstance("/assignments/preview");
    },
  });

  return (
    <section className="my-8 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        Featured Assignments 
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="p-4 space-y-3">
                {/* 📷 Thumbnail */}
                <Skeleton className="h-40 w-full rounded-md" />

                <CardContent className="space-y-2">
                  {/* 📝 Title */}
                  <Skeleton className="h-5 w-2/3" />

                  {/* 📖 Description */}
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />

                  {/* 🎯 Stats row */}
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-20" /> {/* Difficulty */}
                    <Skeleton className="h-4 w-14" /> {/* Marks */}
                  </div>

                  {/* 👤 Creator & ⏰ Due */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  {/* 👁️ View Button */}
                  <div className="flex justify-end pt-4">
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          data?.data?.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              refetch={refetch}
            />
          ))
        )}
      </div>
    </section>
  );
}
