import type { Brand } from '../../types'

interface BrandLogoProps {
  brand: Brand
  selected?: boolean
  onClick?: () => void
}

export function BrandLogo({ brand, selected, onClick }: BrandLogoProps) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`brand-logo ${selected ? 'selected' : ''} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      title={brand.name}
    >
      <img src={brand.logo} alt={brand.name} loading="lazy" />
    </Tag>
  )
}
