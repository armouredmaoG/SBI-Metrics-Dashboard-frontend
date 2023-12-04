import React , { useState } from 'react';
import './tilesContainer.css';
import Tile from '../Tile/Tile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function TilesContainer(){
    const [metrics, setMetrics] = useState({
        revenue: '716.57 B',
        netIncome: '154.77 B',
        netProfit: '21.60%',
        operatingIncome: '213.55 B'
    });

    function toggleActive(){
        const optionMenu = document.querySelector(".select-menu"),
            options = optionMenu.querySelectorAll(".option"),
            sBtn_text = optionMenu.querySelector(".sBtn-text");

        optionMenu.classList.toggle("active");
        options.forEach(option =>{
            option.addEventListener("click", ()=>{
                let selectedOption = option.innerText;
                sBtn_text.innerText = selectedOption;
                console.log(selectedOption);

                optionMenu.classList.remove("active");
            });
        });
    }

    function fetchMetrics(currentOption){
        fetch(`https://armouredmaog.github.io/metrics/metrics.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setMetrics(data[currentOption]);
                console.log(data[currentOption]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
        });
    }

    function fetchData(event){
        console.log(event.target);
        let currentSelectedOption = event.target.id;
        console.log(currentSelectedOption);
        fetchMetrics(currentSelectedOption);
    }

    return(
        <div className='tilesContainer'>
            <div className="tile-header">
                <span className='dashboard-icon'>
                    <DashboardIcon/>
                    <p>Dashboard</p>
                </span>
                <div className="select-menu">
                    <div className="select-btn" onClick={toggleActive}>
                        <span className="sBtn-text">Quarter 1 (Dec 22)</span>
                        <ExpandMoreIcon/>
                    </div>

                    <ul className="options">
                        <li className="option" id="Q1" onClick={fetchData}>
                            Quarter 1 (Dec 22)
                        </li>
                        <li className="option option-text" id="Q2" onClick={fetchData}>
                            Quarter 2 (March 23)        
                        </li>
                        <li className="option " id="Q3" onClick={fetchData}>
                            Quarter 3 (June 23)
                        </li>
                        <li className="option" id="Q4" onClick={fetchData}>
                            Quarter 4 (Sep 23)
                        </li>
                    </ul>
                </div>

            </div>

            <div className="card-container">
                <Tile cardTitle='Revenue (INR)' info={metrics.revenue}/>
                <Tile cardTitle='Net Income (INR)' info={metrics.netIncome}/>
                <Tile cardTitle='Net Profit' info={metrics.netProfit}/>
                <Tile cardTitle='Operating Income (INR)' info={metrics.operatingIncome}/>
            </div> 
        </div>
    )
}

export default TilesContainer;