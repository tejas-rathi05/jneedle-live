import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonComp = () => {
  return (
    <>
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
    </>
  )
}

export default SkeletonComp