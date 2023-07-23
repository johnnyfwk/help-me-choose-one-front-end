export default function LoadMoreButton({numberOfItemsToDisplayAndIncrement, setNumberOfItemsToDisplay, posts, numberOfItemsToDisplay}) {
    function onClickLoadMoreButton() {
        setNumberOfItemsToDisplay((currentNumberOfItemsTodisplay) => {
            return currentNumberOfItemsTodisplay + numberOfItemsToDisplayAndIncrement;
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