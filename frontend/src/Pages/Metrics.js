import React from "react";
import "../Styles/Metrics.css";
import { getMetrics } from "../Services/MetricsServices";

class Metrics extends React.Component {
    state = {
        metrics: []
    };

    async getMetrics() {
        await getMetrics().then((res) => {
            const metrics = res.data;
            this.setState({
                metrics
            });
        });
    }

    async componentDidMount() {
       this.getMetrics();
    }
    
    render() {
        return (
            <>
                <div>
                    <h2>Żądania</h2>
                    <table className="MetricTable">
                        <thead>
                            <tr>
                                <th className="TableHeader">
                                    <div>
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th className="TableHeader">
                                    <div>
                                        <span>Liczba</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.state.metrics).map((key, i) => (
                                    <tr key={i}>
                                        <td>{key}</td>
                                        <td>{this.state.metrics[key]}</td>
                                    </tr>
                                )) 
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
};

export default Metrics;