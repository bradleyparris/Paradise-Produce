import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';

export default function Sidebar (props) {
    // Destructures props
    const {
        categories = [],
        currentCategory,
        setCurrentCategory
    } = props;

    // sets title
    useEffect(() => {
        document.title = `Paradise - ${capitalizeFirstLetter(currentCategory.name)}`;
    }, [currentCategory]);

    return (
        <article>
            <ul>
                {categories.map((category) => (
                    <li
                        className={`${currentCategory.name === category.name}-shop-category`}
                        key={category.name}
                    >
                        <span className='shop-category' onClick={() => {
                            setCurrentCategory(category);
                            }}
                        >
                            {capitalizeFirstLetter(category.name)}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
};