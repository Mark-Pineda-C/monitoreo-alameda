import { useQuery } from "@tanstack/react-query";
import { Id } from "../../convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { Skeleton } from "@heroui/react";

export function ConvexImage({ src }: { src: Id<"_storage"> }) {
  const { data, isLoading } = useQuery(convexQuery(api.files.getUrl, { id: src }));

  if (isLoading) return <Skeleton className="w-full h-full" />;

  return <img src={data!} className="w-full hfull object-cover" />;
}
