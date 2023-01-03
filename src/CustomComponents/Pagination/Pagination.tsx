import { PaginatorInfoType } from '../../types/QueryModifierType'
import Button from '../Buttons/Button'

type Props = {
  paginationInfo: PaginatorInfoType
  handlePaginationSelect: (arg0: number) => void
}

const Pagination = ({ paginationInfo, handlePaginationSelect }: Props) => {
  return (
    <>
      <nav
        className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'
        aria-label='Pagination'
      >
        <div className='hidden sm:block'>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {(paginationInfo?.currentPage - 1) * paginationInfo?.perPage + 1 || 0}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {paginationInfo?.currentPage - 1 + paginationInfo?.perPage || 0}
            </span>{' '}
            of <span className='font-medium'>{paginationInfo?.total}</span> results
          </p>
        </div>
        <div className='flex flex-1 justify-between sm:justify-end space-x-4'>
          <Button
            title='Previous'
            type='button'
            status='cancel'
            size='lg'
            customClassName={['text-sm'].join(' ')}
            onClick={() => handlePaginationSelect(paginationInfo?.currentPage - 1)}
            disabled={paginationInfo?.currentPage === 1}
          />
          <Button
            title='Next'
            type='button'
            status='cancel'
            size='lg'
            customClassName={['text-sm'].join(' ')}
            onClick={() => handlePaginationSelect(paginationInfo?.currentPage + 1)}
            disabled={paginationInfo?.currentPage === paginationInfo?.lastPage}
          />
        </div>
      </nav>
    </>
  )
}

export default Pagination
