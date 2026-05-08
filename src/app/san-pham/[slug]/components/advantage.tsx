import React from 'react';
import styles from '@/assets/styles/pages/product/slugProduct.module.css'
type Props = {
    product: any[]
}
const ProductAdvantageComponent = (props: Props) => {
    const { product } = props;
    return (
        <div className={styles.tableResponsive}>
            <table className={styles.specificationTable}>
                <tbody>
                    {product.length > 0 ? (
                        product.map((item, index) => (
                            <tr key={index}>
                                <td><h3>{item.key}</h3></td>
                                <td><h3>{item.value}</h3></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Không có thông số kỹ thuật
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdvantageComponent;
