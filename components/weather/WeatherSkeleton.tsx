import { Skeleton } from "@/components/ui/skeleton"
 
export function WeatherSkeleton() {
  return (
    <div>
      <div className="space-y-2 flex flex-col items-center justify-center pt-6">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}