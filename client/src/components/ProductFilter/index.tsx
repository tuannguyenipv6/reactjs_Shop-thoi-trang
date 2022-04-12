import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ITrademarkSize, PRICE_RANGE } from '../../constants';
import { IProductFilterCatelogy } from '../../pages/category';
import styles from './ProductFilter.module.css';

enum key {
    "priceRange" = "Khoảng giá",
    "brand" = "Thương hiệu",
    "size" = "Size"
}

interface IProductFilterProps {
    trademarkSize: ITrademarkSize;
    productFilter: IProductFilterCatelogy;
    setProductFilter: Dispatch<SetStateAction<IProductFilterCatelogy>>
}

function ProductFilter({trademarkSize, productFilter, setProductFilter}: IProductFilterProps) {
    
    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setProductFilter({
            ...productFilter,
            priceRange: e.target.value
        });
    }
    
    const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        
        if(productFilter[e.target.name === 'trademarks' ? 'trademarks' : 'sizes'].some(val => val === value)) {
            setProductFilter({
                ...productFilter,
                [name]: productFilter[e.target.name === 'trademarks' ? 'trademarks' : 'sizes'].filter(val => val !== value)
            })
        }else {
            setProductFilter({
                ...productFilter,
                [name]: [...productFilter[e.target.name === 'trademarks' ? 'trademarks' : 'sizes'], value]
            })
        }
    }
   
    return (<div className={styles.wrapperProductFilter}>
        <div>
            <b>{key["priceRange"]}</b>
            <div className={styles.wrapperFilter}>
                {
                    PRICE_RANGE.map(value => (
                        <label className={styles.wrapperInputFilter} key={value.title}>
                            <input 
                                onChange={handleRadio}
                                value={value.title} 
                                checked={
                                    productFilter.priceRange === value.title ? true : false
                                } 
                                className={styles.inputFilter} 
                                type='radio'
                            />
                            {value.title}
                        </label>
                    ))
                }
            </div>
        </div>
        
        <div>
            <b>{key["brand"]}</b>
            <div className={styles.wrapperFilter}>
                {
                    trademarkSize.trademarks.map(value => (
                        <label className={styles.wrapperInputFilter} key={value}>
                            <input 
                                onChange={handleChecked}
                                value={value} 
                                checked={
                                    productFilter.trademarks.some(valueBrand => value === valueBrand)
                                } 
                                className={styles.inputFilter} 
                                type='checkbox' 
                                name='trademarks'
                            />
                            {value}
                        </label>
                    ))
                }
            </div>
        </div>

        <div>
            <b>{key["size"]}</b>
            <div className={styles.wrapperFilter}>
                {
                    trademarkSize.sizes.map(value => (
                        <label className={styles.wrapperInputFilter} key={value}>
                            <input 
                                onChange={handleChecked}
                                value={value} 
                                checked={
                                    productFilter.sizes.some(valueBrand => value === valueBrand)
                                } 
                                className={styles.inputFilter} 
                                type='checkbox' 
                                name='sizes'
                            />
                            {value}
                        </label>
                    ))
                }
            </div>
        </div>
  </div>)
}

export default ProductFilter;