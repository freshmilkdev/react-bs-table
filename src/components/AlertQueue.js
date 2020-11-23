import PropTypes from 'prop-types'
import React from 'react'
import {useTable, usePagination, useSortBy, useRowSelect} from 'react-table'
import {Pagination, Table as BTable} from 'react-bootstrap';


export const columns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Task Name',
        accessor: 'taskName'
    },
    {
        Header: 'Start',
        accessor: 'start'
    },
    {
        Header: 'Finish',
        accessor: 'finish'
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    }

]


const AlertQueue = (props) => {
    const data = props.results

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},


        rows,

        prepareRow //?
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 10}
        },
        useSortBy,
        usePagination,
        useRowSelect
    )

    return (

        <div style={{overflow: 'auto'}}>

            {/* Pagination widget */}
            <select
                style={{margin: '10px 0'}}
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            {data.length > pageSize &&
            <div style={{marginRight: '20px', flexFlow: 'row-reverse', display: 'flex'}}>

                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <button onClick={nextPage} disabled={!canNextPage}>
                    {'>'}
                </button>
                <span>


               {
                   `Items ${pageIndex * pageSize + 1} - ${(pageIndex + 1) * pageSize <= data.length ? (pageIndex + 1) * pageSize : data.length} of ${data.length}`
                   /* (((data.length % pageSize) === 0) && ((pageIndex + 1) !== pageOptions.length))
                        ?

                        `Items ${pageIndex * pageSize + 1} - ${(pageIndex + 1) * pageSize} of ${data.length}`
                        :
                        `Items ${pageIndex * pageSize + 1} of ${data.length}`*/

               }


                </span>
                <button onClick={previousPage} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
            </div>
            }

            <div style={{overflowY: 'scroll', height: 'calc(85vh - 320px)'}}>
                <BTable striped bordered hover size="sm" {
                    ...getTableProps()} showPagination={false} defaultPageSize={pageSize}>
                    <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, j) => (
                                <th
                                    key={j}
                                    className={'column_headers'}
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr key={i}
                                {...row.getRowProps()}
                                onClick={e => props.handleClick(row, e)}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <td className={'row_data_columns'}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </BTable>
            </div>
        </div>

    )
}

AlertQueue.propTypes = {
    handleClick: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired
}

export default AlertQueue
