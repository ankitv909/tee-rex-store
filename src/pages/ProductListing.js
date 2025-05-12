import React, {useEffect, useState} from 'react';
import {useCart} from '../context/CartContext';
import {FiFilter, FiSearch} from 'react-icons/fi';

const FILTERS = {
    Color: ['Red', 'Blue', 'Green'],
    gender: ['Men', 'Women'],
    price: ['0-250', '251-450', '450+'],
    type: ['Polo', 'Hoodie', 'Basic']
};

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const {cart, addToCart, updateQuantity} = useCart();
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
            .then((res) => res.json())
            .then(setProducts);
    }, []);

    const getQuantity = (id) => cart.find(item => item.id === id)?.quantity || 0;

    const handleCheckbox = (category, value) => {
        setFilters((prev) => {
            const prevSet = new Set(prev[category] || []);
            if (prevSet.has(value)) {
                prevSet.delete(value);
            } else {
                prevSet.add(value);
            }
            return {...prev, [category]: [...prevSet]};
        });
    };

    const applyFilters = (product) => {
        if (filters.Color?.length && !filters.Color.includes(product.Color)) return false;
        if (filters.gender?.length && !filters.gender.includes(product.gender)) return false;
        if (filters.price?.length) {
            const priceMatch = filters.price.some((range) => {
                if (range === '0-250') return product.price <= 250;
                if (range === '251-450') return product.price > 250 && product.price <= 450;
                if (range === '450+') return product.price > 450;
                return false;
            });
            if (!priceMatch) return false;
        }
        if (filters.type?.length && !filters.type.includes(product.type)) return false;
        return true;
    };

    const filtered = products
        .filter((p) => (p.name + p.Color + p.type).toLowerCase().includes(search.toLowerCase()))
        .filter(applyFilters);

    return (<div className="store-layout">
        <aside className={`filters ${showMobileFilters ? 'filters-visible' : ''}`}>
            {Object.entries(FILTERS).map(([category, options]) => (<div key={category}>
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    {options.map((val) => (<label key={val}>
                            <input type="checkbox" onChange={() => handleCheckbox(category, val)}/> {val}
                        </label>))}
                </div>))}
        </aside>
        <main className="product-list">
            <div className="search-bar">
                <input
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setSearch(e.target.value)}
                    className="search-input"
                />
                <button className="search-button-container" onClick={() => setSearch(search)}>
                    <FiSearch size={18}/>
                </button>
                <button
                    className="search-button-container filter-toggle-btn"
                    onClick={() => setShowMobileFilters((prev) => !prev)}
                >
                    <FiFilter size={18}/>
                </button>
            </div>

            <div className="products">
                {filtered.map((p) => {
                    const currentQty = getQuantity(p.id);
                    return (<div key={p.id} className="product-card">
                        <strong className="product-title">{p.name}</strong>
                        <img src={p.imageURL} alt={p.name}/>
                        <div className="card-bottom">
                            <p>Rs {p.price}</p>
                            {currentQty > 0 ? (<div className="quantity-control">
                                <button
                                    onClick={() => {
                                        if (currentQty === 1) {
                                            updateQuantity(p.id, 0);
                                        } else {
                                            updateQuantity(p.id, currentQty - 1);
                                        }
                                    }}
                                >-
                                </button>
                                <span>{currentQty}</span>
                                <button
                                    onClick={() => updateQuantity(p.id, currentQty + 1)}
                                    disabled={currentQty >= p.quantity}
                                >+
                                </button>
                            </div>) : (<button onClick={() => addToCart(p)}>Add to cart</button>)}
                        </div>
                    </div>);
                })}
            </div>

        </main>
    </div>);
};

export default ProductListing;
