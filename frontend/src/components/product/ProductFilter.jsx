const ProductFilter = ({
    categories,
    setCategory,
    setSort
}) => {

    return (

        <div className="
            flex
            gap-4
            mb-6
        ">

            <select
                onChange={(e) =>
                    setCategory(
                        e.target.value
                    )
                }
                className="
                    border
                    px-4
                    py-2
                    rounded-lg
                "
            >

                <option value="">
                    All Categories
                </option>

                {categories.map((item) => (

                    <option
                        key={item._id}
                        value={item._id}
                    >
                        {item.name}
                    </option>

                ))}

            </select>

            <select
                onChange={(e) =>
                    setSort(
                        e.target.value
                    )
                }
                className="
                    border
                    px-4
                    py-2
                    rounded-lg
                "
            >

                <option value="">
                    Newest
                </option>

                <option value="price_asc">
                    Price ASC
                </option>

                <option value="price_desc">
                    Price DESC
                </option>

                <option value="sold">
                    Best Selling
                </option>

                <option value="views">
                    Most Viewed
                </option>

            </select>

        </div>
    );
};

export default ProductFilter;