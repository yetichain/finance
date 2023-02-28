import { ReactNode } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { breakpoints, Card, mq, typography } from 'ui'
import Table from 'views/Info/components/Table'
import TableTitle from 'views/Info/components/TableTitle'

export interface InformationTableProps extends Omit<inferStyledProps<typeof InformationTable['Root']>, 'title'> {
  items: Array<{
    title: ReactNode
    value: ReactNode
  }>
  title: ReactNode
  actions?: ReactNode
}

export default function InformationTable({ items, actions, title, ...restProps }: InformationTableProps) {
  const isMobile = useMedia(mq.down(breakpoints.sm))
  return (
    <InformationTable.Root {...restProps}>
      <TableTitle>{title}</TableTitle>
      {isMobile ? (
        <InformationTable.MobileCard>
          {items.map((item, key) => (
            <div key={key}>
              <span>{item.title}</span>
              <span>{item.value}</span>
            </div>
          ))}
          {actions && <InformationTable.Actions>{actions}</InformationTable.Actions>}
        </InformationTable.MobileCard>
      ) : (
        <Table
          header={
            <Table.HeaderRow>
              {items.map((item, key) => (
                <Table.HeaderCell key={key}>{item.title}</Table.HeaderCell>
              ))}
            </Table.HeaderRow>
          }
        >
          <Table.ItemRow>
            {items.map((item, key) => (
              <Table.ItemCell key={key}>
                {item.value}
                {key + 1 === items.length && actions && <InformationTable.Actions>{actions}</InformationTable.Actions>}
              </Table.ItemCell>
            ))}
          </Table.ItemRow>
        </Table>
      )}
    </InformationTable.Root>
  )
}

InformationTable.Actions = styled.div``

InformationTable.MobileCard = styled(Card)`
  padding: 16px;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  display: grid;
  gap: 8px;

  & > div {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;

    & > span {
      color: #0b1359;

      &:nth-of-type(1) {
        ${typography.miniheader}
      }

      &:nth-of-type(2) {
        ${typography.tiny.regular}
      }
    }
  }

  ${InformationTable.Actions} {
    margin-top: 16px;
  }
`

InformationTable.Root = styled.div`
  ${Table.Row} {
    & > *:last-child {
      text-align: inherit;
      justify-content: space-between;
    }
  }
`
