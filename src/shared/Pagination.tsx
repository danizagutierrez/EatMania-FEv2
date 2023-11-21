import Pagination from 'react-bootstrap/Pagination';
import { FC, useEffect, useState } from 'react';

interface IPaginationEleProps {
    items: Array<any>;
    currentPage: number;
    pageSize?: number;
    setPageActive: (page: number) => void;
}

const PaginationEle: FC<IPaginationEleProps> = ({
    items,
    currentPage,
    pageSize = 4,
    setPageActive
}) => {
    const [pageItems, setPageItems] = useState<JSX.Element[]>([]);
    const [totalPageNum, setTotalPageNum] = useState<number>(0);

    useEffect(() => {
        const tempPageitems = [];
        if (items) {
            const totalPage = Math.ceil(items.length / pageSize);
            setTotalPageNum(totalPage);
            if (currentPage === 1 || totalPage <= 5) {
                for (let number = 1; number <= totalPage; number++) {
                    tempPageitems.push(
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => {
                                setPageActive(number);
                            }}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
            } else if (currentPage === totalPage) {
                tempPageitems.push(
                    <Pagination.Item
                        key={1}
                        active={1 === currentPage}
                        onClick={() => {
                            setPageActive(1);
                        }}
                    >
                        {1}
                    </Pagination.Item>
                );
                tempPageitems.push(<Pagination.Ellipsis />);

                for (let number = totalPage - 3; number <= totalPage; number++) {
                    tempPageitems.push(
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => {
                                setPageActive(number);
                            }}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
            } else {
                tempPageitems.push(
                    <Pagination.Item
                        key={1}
                        active={1 === currentPage}
                        onClick={() => {
                            setPageActive(1);
                        }}
                    >
                        {1}
                    </Pagination.Item>
                );
                tempPageitems.push(<Pagination.Ellipsis />);

                for (let number = currentPage - 1; number <= currentPage + 1; number++) {
                    tempPageitems.push(
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => {
                                setPageActive(number);
                            }}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
                tempPageitems.push(
                    <Pagination.Item
                        key={totalPage}
                        onClick={() => {
                            setPageActive(totalPage);
                        }}
                    >
                        {totalPage}
                    </Pagination.Item>
                );
            }
            setPageItems(tempPageitems);
        } else {
            for (let number = 1; number <= 5; number++) {
                tempPageitems.push(
                    <Pagination.Item key={number} disabled>
                        {number}
                    </Pagination.Item>
                );
            }
            setPageItems(tempPageitems);
            setTotalPageNum(0);
        }
    }, [currentPage, items]);
    return (
        <Pagination>
            <Pagination.First
                onClick={() => {
                    setPageActive(1);
                }}
                disabled={currentPage === 1}
            />
            <Pagination.Prev
                onClick={() => {
                    setPageActive(currentPage - 1);
                }}
                disabled={currentPage === 1}
            />
            {pageItems}
            <Pagination.Next
                onClick={() => {
                    setPageActive(currentPage + 1);
                }}
                disabled={totalPageNum === currentPage || items.length === 0}
            />
            <Pagination.Last
                onClick={() => {
                    setPageActive(totalPageNum);
                }}
                disabled={totalPageNum === currentPage || items.length === 0}
            />
        </Pagination>
    );
};

export default PaginationEle;
