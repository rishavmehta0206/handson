import React, { useMemo, useState } from 'react';
import styles from './pagination.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGetAllProductsQuery } from './services/productApiSlice';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data, isLoading, isError, error } = useGetAllProductsQuery();

    // Calculate total pages based on data length
    const totalPages = useMemo(() => {
        return data ? Math.ceil(data.length / itemsPerPage) : 0;
    }, [data]);

    // Get current page's products
    const paginatedProducts = useMemo(() => {
        if (!data) return [];
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, currentPage]);

    const paginationButtonControls = () => {
        let numberOfButtonsToBeVisible = 2;
        let startPage = Math.max(1, currentPage - Math.floor(numberOfButtonsToBeVisible / 2));
        let endPage = startPage + numberOfButtonsToBeVisible - 1;
        if(endPage > totalPages){
            endPage = totalPages;
            startPage = Math.max(1, endPage - numberOfButtonsToBeVisible + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.productsContainer}>
                    {paginatedProducts.map(product => (
                        <div key={product.id} className={styles.productContainer}>
                            <img
                                className={styles.productImg}
                                src={product.image}
                                alt={product.title}
                            />
                            <div className={styles.descriptionContainer}>
                                <span className={styles.productCategory}>
                                    {product.category}
                                </span>
                                <span className={styles.productTitle}>
                                    {product.title}
                                </span>
                                <p className={styles.productDescription}>
                                    {product.description}
                                </p>
                                <div className={styles.productInfoContainer}>
                                    <div className={styles.rating}>
                                        ★ {product.rating.rate} ({product.rating.count})
                                    </div>
                                    <div className={styles.price}>
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {data && data.length > 0 && (
                    <div className={styles.paginationContainer}>
                        <div className={styles.paginationBtns}>
                            <span
                                className={styles.paginationBtn}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ArrowLeft />
                            </span>

                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.paginationTab} ${currentPage === index + 1 ? styles.active : ''
                                        }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </span>
                            ))}

                            <span
                                className={styles.paginationBtn}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ArrowRight />
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;