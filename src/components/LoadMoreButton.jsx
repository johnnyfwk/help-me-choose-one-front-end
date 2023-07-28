export default function LoadMoreButton({
    numberOfItemsToDisplayAndIncrement,
    numberOfItemsToDisplay,
    setNumberOfItemsToDisplay,
    items,
}) {
    function onClickLoadMoreButton() {
        setNumberOfItemsToDisplay((currentNumberOfItemsToDisplay) => {
            return currentNumberOfItemsToDisplay + numberOfItemsToDisplayAndIncrement;
        })
    }

    const styleLoadMoreButton = {
        display: numberOfItemsToDisplay < items.length ? "grid" : "none"
    }

    return (
        <div
            className="load-more-button"
            onClick={onClickLoadMoreButton}
            style={styleLoadMoreButton}
        >Load More</div>
    )
}