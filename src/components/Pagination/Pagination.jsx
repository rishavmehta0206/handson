import React, { useEffect, useState } from 'react'
import styles from './pagination.module.css'
const Pagination = () => {
    const [data, setData] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(30);

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch("https://jsonplaceholder.typicode.com/photos");
                let jsonData = await response.json();
                setData(jsonData)
                setTotalSteps(Math.ceil(jsonData.length / itemsPerPage))
            } catch (error) {
            }
        })()
    }, [])




    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {data ?<Items data={data} currentStep={currentStep} itemsPerPage={itemsPerPage}/>:"Loading..."}
                <PaginationControls currentPage={currentStep} totalPages={totalSteps} onPageChange={(index)=>setCurrentStep(index)}/>
            </div>
        </div>
    )
}

export default Pagination


const Items = ({ data, currentStep, itemsPerPage }) => {
    const startIndex = (currentStep - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return (
        <div className={styles.list}>
            {currentItems.map(photo => (
                <div key={photo.id} className={styles.item}>
                    {photo.title}
                </div>
            ))}
        </div>
    );
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={styles.controls}>
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={currentPage === index + 1 ? styles.active : ''}
                >
                    {index + 1}
                </button>
            ))}
            
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};