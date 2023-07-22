export default function ShowNavButton({setIsNavVisible}) {
    function onClickShowNavButton() {
        setIsNavVisible(true);
    }

    return (
        <span id="show-nav-button" onClick={onClickShowNavButton}>+</span>
    )
}