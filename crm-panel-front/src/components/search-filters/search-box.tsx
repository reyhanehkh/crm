function SearchBox() {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search within results ..."
      />
      <div className="input-group-append">
        <button className="btn btn-blue px-3 btn-sm" type="button">
          Find
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
