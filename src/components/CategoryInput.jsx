export default function CategoryInput({categoryInput, setCategoryInput}) {
    function handleCategoryInput(event) {
        setCategoryInput(event.target.value);
    }

    return (
        <div id="categories-input">
            <label htmlFor="categories">Categories</label>
            <select id="categories" value={categoryInput} onChange={handleCategoryInput}>
                <option defaultValue>Select a Category</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Arts & Draft">Arts & Draft</option>
                <option value="Bags & Luggage">Bags & Luggage</option>
                <option value="Bars & Nightclubs">Bars & Nightclubs</option>
                <option value="Beauty">Beauty</option>
                <option value="Business">Business</option>
                <option value="Charities">Charities</option>
                <option value="Clothing & Accessories">Clothing & Accessories</option>
                <option value="Computers & Accessories">Computers & Accessories</option>
                <option value="Dating & Relationships">Dating & Relationships</option>
                <option value="DIY & Tools">DIY & Tools</option>
                <option value="Education">Education</option>
                <option value="Electronics">Electronics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Environment">Environment</option>
                <option value="Family & Friends">Family & Friends</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Fitness">Fitness</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Gaming">Gaming</option>
                <option value="Getting Around">Getting Around</option>
                <option value="Health">Health</option>
                <option value="Jobs & Careers">Jobs & Careers</option>
                <option value="Life">Life</option>
                <option value="Music">Music</option>
                <option value="Office & Stationery">Office & Stationery</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Pets">Pets</option>
                <option value="Property & Land">Property & Land</option>
                <option value="Restaurants, Takeaways & Cafes">Restaurants & Coffee Shops</option>
                <option value="Shopping">Shopping</option>
                <option value="Sports & Activities">Sports & Activities</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Travel">Travel</option>
                <option value="TV & Movies">TV & Movies</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )
}