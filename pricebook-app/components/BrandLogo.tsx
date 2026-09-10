import Image from 'next/image'
import { brandLogo } from '@/lib/brandLogos'

export function BrandLogo({ brand, className = 'h-6 w-auto' }: { brand: string; className?: string }) {
  const src = brandLogo(brand)
  if (!src) return null

  return (
    <Image
      src={src}
      alt={brand}
      width={160}
      height={48}
      className={`${className} object-contain object-left`}
    />
  )
}
