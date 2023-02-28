import { Button, RotateIcon } from 'alium-uikit/src'
import Paginate, { PaginateProps } from 'components/Pagination'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

export type PaginateWithMoreProps = PaginateProps

export default function PaginateWithMore(props: PaginateWithMoreProps) {
  const { t } = useTranslation()
  if (props.totalPages <= 1) {
    return null
  }

  return (
    <PaginateWithMore.Root>
      <PaginateWithMore.More
        onClick={() => props.onPageChanged(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
        variant='secondary'
      >
        <RotateIcon color='inherit' />
        {t('Show more')}
      </PaginateWithMore.More>
      <Paginate {...props} />
    </PaginateWithMore.Root>
  )
}

PaginateWithMore.More = styled(Button)`
  & > svg {
    margin-right: 16px;
  }
`

PaginateWithMore.Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  .pagination {
    padding: 0;
    width: auto;
  }

  @media ${mq.down(breakpoints.md)} {
    margin-top: 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    flex-direction: column;
    align-items: stretch;
    margin-top: 16px;

    ${PaginateWithMore.More} {
      width: 100%;
      margin-bottom: 8px;
    }

    .pagination {
      justify-content: space-between;
    }
  }
`
