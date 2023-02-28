import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, Button, mq, typography } from 'ui'

export interface ResponsiveTabsProps {
  options: Array<{ title: string; value: string }>
  value: string
  onChange?: (value: string) => any
  responsive?: boolean
}

export default function ResponsiveTabs({ options, value, responsive = true, onChange }: ResponsiveTabsProps) {
  const isMobile = useMedia(mq.down(breakpoints.sm))
  return (
    <ResponsiveTabs.Root>
      {isMobile && responsive ? (
        <ResponsiveTabs.Select onChange={(e) => onChange?.(e.target.value as any)} value={value}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </ResponsiveTabs.Select>
      ) : (
        options.map((option) => (
          <Button
            size='small'
            variant={option.value === value ? 'contained' : 'text'}
            onClick={() => onChange?.(option.value)}
            key={option.value}
          >
            {option.title}
          </Button>
        ))
      )}
    </ResponsiveTabs.Root>
  )
}

ResponsiveTabs.Root = styled.div`
  display: flex;

  ${Button.Root} {
    padding: 0 10px;
  }
`

ResponsiveTabs.Select = styled.select`
  ${typography.ultrasmall.regular}
  color: #8990A5;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  padding: 6px 8px;
  background: transparent;
  outline: none;
  width: 100%;
`
