import './tile.css';

function Tile(props){
    return(
        <div className='tile-card'>
            <div className="card-title">
                {props.cardTitle}
            </div>
            <div className="card-body">
                {props.info}
            </div>
        </div>
    )
}

export default Tile;