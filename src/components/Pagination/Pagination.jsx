import React, { useEffect, useMemo, useState } from 'react'
import styles from './pagination.module.css'
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = () => {
    const [products, setProducts] = useState([]);  // Initialize as empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 6;  // Made constant since it doesn't change

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const paginatedProducts = useMemo(() => {
        if (!products.length) return [];
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return products.slice(start, end);
    }, [products, currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
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

                {products.length > 0 && (
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
                                    className={`${styles.paginationTab} ${
                                        currentPage === index + 1 ? styles.active : ''
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