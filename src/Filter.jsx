
const Filter = ({value, onChange}) => {
	return (
			<label className="filter-container">
				<input type="text" value={value} onChange={onChange} className="filter-input" placeholder="Filter Users..." />
				<i className="filter icon filter-icon"></i>
			</label>
	);
}

export default Filter