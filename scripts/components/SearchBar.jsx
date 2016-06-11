/* container for the search bar */
class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchContent: '',
        };
    }

    /* handle search location change */
    handleSearchLocationChange(event) {
        this.setState({ searchContent: event.target.value });
    }

    /* functoin to perform when search button is clicked */
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.searchContent) {
            this.props.onSearchSubmit(this.state.searchContent);
        }
    }

    render() {
        // unfocus the search button after mouse click
        // $(".btn").mouseup(function(){
        //     $(".btn").blur();
        // });
        return (
            <div className="searchbox-wrapper">
                <form className="input-group" onSubmit={(this.handleSubmit).bind(this) }>
                    <div className="input-group-btn">
                        <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                    </div>
                    <input type="text" className="form-control" placeholder="Search for location" onChange={(this.handleSearchLocationChange).bind(this) } name="srch-term" id="srch-term"></input>
                </form>
            </div>
        );
    }
}