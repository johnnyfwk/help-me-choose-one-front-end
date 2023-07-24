export default function LoadMoreButton({numberOfItemsToDisplayAndIncrement, setNumberOfItemsToDisplay, posts, numberOfItemsToDisplay, itemsToDisplay}) {
    function onClickLoadMoreButton() {
        setNumberOfItemsToDisplay((currentNumberOfItemsToDisplay) => {
            return currentNumberOfItemsToDisplay + numberOfItemsToDisplayAndIncrement;
        })
    }

    const styleLoadMoreButton = {
        display: numberOfItemsToDisplay < posts.length ? "grid" : "none"
    }

    return (
        <div
            className="load-more-button"
            onClick={onClickLoadMoreButton}
            style={styleLoadMoreButton}
        >Load More</div>
    )
}