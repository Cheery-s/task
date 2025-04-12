
// Desc: Analytics Dashboard component to display insights and productivity insights
// Task: Modify the code as per the above instructions.
// path: src/components/Analytics/AnalyticsDashBoard.jsx
import React,{useState,useEffect} from "react";
import { generateProductivityInsights } from "../../services/openaiService";
import { BarChart, Bar,PieChart,Pie, XAxis, YAxis,CartesianGrid, Tooltip, Legend,Cell,ResponsiveContainer } from "recharts";
import LoadingSpinner from "../commonComponents/LoadingSpinner";

const AnalyticsDashboard = ({ tasks }) => {
    const [insights, setInsights] = useState("");
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try{const insights = await generateProductivityInsights(tasks);
        setInsights(insights);
      }catch(error){
        console.error("Failed to generate insights",error);
        setInsights("Could not generate productivity insights at this time.");
      }finally{
        setLoading(false);
      }   
    };
    if (tasks && tasks.length > 0) {
      fetchInsights();
    } else {
      setInsights("Add some tasks to see productivity insights.");
      setLoading(false);
    }
  }, [tasks]);
  // Data for completion status
  const completionData = [
    { name: "Completed", value: tasks.filter((task) => task.completed).length },
    { name: "Pending", value: tasks.filter((task) => !task.completed).length },
  ];
  // Data for category distribution
  const categoryData = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryData).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: categoryData[key]
  }));

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  return (
    <div className="analytics-dashboard">
      <h2>Task Analytics</h2>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="analytics-content">
          <div className="analytics-charts">
            <div className="chart-container">
              <h3>Task Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container">
              <h3>Category Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={categoryChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="insights-container">
            <h3>AI-Generated Productivity Insights</h3>
            <div className="insights-content">
              {insights}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
/* <div className="analytics-dashboard">
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    <p>{insights}</p>
    </div> */