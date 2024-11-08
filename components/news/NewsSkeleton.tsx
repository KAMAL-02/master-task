import { Skeleton } from "@/components/ui/skeleton"
 
export function NewsSkeleton() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center pt-6">
    <Skeleton className="h-[125px] w-[300px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[300px]" />
    </div>
  </div>
  )
}